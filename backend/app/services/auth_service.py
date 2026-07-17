from __future__ import annotations

import secrets
from datetime import datetime, timedelta, timezone

from google.auth.transport import requests as google_requests
from google.oauth2 import id_token as google_id_token
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.email import send_password_reset_email
from app.core.exceptions import (
    AuthenticationError,
    BadRequestError,
    ConflictError,
)
from app.core.security import (
    create_access_token,
    hash_password,
    verify_password,
)
from app.db.models.cart import Cart
from app.db.models.user import User
from app.repositories.user_repository import user_repository
from app.schemas.auth import (
    AuthResponse,
    RegisterRequest,
)
from app.services.base_service import BaseService
from fastapi.security import OAuth2PasswordRequestForm


class AuthService(BaseService):
    """
    Authentication Service.
    Handles:

    - Registration
    - Login
    - JWT creation
    - Password hashing
    - Google Sign-In
    - Forgot / Reset password
    """

    # ==========================================================
    # Helper: build AuthResponse from a User
    # ==========================================================

    def _build_auth_response(self, user: User) -> AuthResponse:
        token = create_access_token(user.id)

        return AuthResponse(
            access_token=token,
            user_id=user.id,
            full_name=user.full_name,
            email=user.email,
            role=user.role,
            is_verified=user.is_verified,
        )

    # ==========================================================
    # Register User
    # ==========================================================

    def register(
        self,
        db: Session,
        data: RegisterRequest,
    ) -> AuthResponse:

        if user_repository.email_exists(
            db,
            data.email,
        ):
            raise ConflictError(
                "Email already registered."
            )

        if user_repository.phone_exists(
            db,
            data.phone,
        ):
            raise ConflictError(
                "Phone number already registered."
            )

        try:

            user = User(
                full_name=data.full_name,
                email=data.email,
                phone=data.phone,
                hashed_password=hash_password(
                    data.password
                ),
            )

            db.add(user)

            db.flush()

            cart = Cart(
                user_id=user.id,
            )

            db.add(cart)

            self.commit(
                db,
            )

            self.refresh(
                db,
                user,
            )

            return self._build_auth_response(user)

        except SQLAlchemyError:

            self.rollback(
                db,
            )

            raise

    # ==========================================================
    # Authenticate User
    # ==========================================================

    def authenticate(
        self,
        db: Session,
        credentials: OAuth2PasswordRequestForm,
    ) -> User:

        user = user_repository.get_by_email(
            db,
            credentials.username
        )

        if user is None or not user.hashed_password:
            raise AuthenticationError(
                "Invalid email or password."
            )

        if not verify_password(
            credentials.password,
            user.hashed_password,
        ):
            raise AuthenticationError(
                "Invalid email or password."
            )

        if not user.is_active:
            raise AuthenticationError(
                "Your account has been disabled."
            )

        return user

    # ==========================================================
    # Login User
    # ==========================================================

    def login(
        self,
        db: Session,
        credentials: OAuth2PasswordRequestForm,
    ) -> AuthResponse:

        user = self.authenticate(
            db,
            credentials,
        )

        return self._build_auth_response(user)

    # ==========================================================
    # Google Login
    # ==========================================================

    def google_login(
        self,
        db: Session,
        credential: str,
    ) -> AuthResponse:
        """
        Verifies the Google ID token and logs the user in,
        linking to or creating an account as needed.
        """

        if not settings.GOOGLE_CLIENT_ID:
            raise BadRequestError(
                "Google Sign-In is not configured on the server."
            )

        try:
            payload = google_id_token.verify_oauth2_token(
                credential,
                google_requests.Request(),
                settings.GOOGLE_CLIENT_ID,
            )
        except ValueError:
            raise AuthenticationError(
                "Invalid Google credential."
            )

        google_sub = payload.get("sub")
        email = payload.get("email")
        full_name = payload.get("name") or (email.split("@")[0] if email else "User")
        email_verified = payload.get("email_verified", False)

        if not google_sub or not email:
            raise AuthenticationError(
                "Google account did not return the required information."
            )

        try:
            # 1. Already linked to a Google account
            user = user_repository.get_by_google_id(db, google_sub)

            if user is None:
                # 2. Existing local account with the same email -> link it
                user = user_repository.get_by_email(db, email)

                if user is not None:
                    user.google_id = google_sub

                    if not user.is_verified and email_verified:
                        user.is_verified = True

                    self.commit(db)
                    self.refresh(db, user)

                else:
                    # 3. Brand new account created via Google
                    user = User(
                        full_name=full_name,
                        email=email,
                        phone=None,
                        hashed_password=None,
                        google_id=google_sub,
                        is_verified=bool(email_verified),
                    )

                    db.add(user)
                    db.flush()

                    cart = Cart(user_id=user.id)
                    db.add(cart)

                    self.commit(db)
                    self.refresh(db, user)

            if not user.is_active:
                raise AuthenticationError(
                    "Your account has been disabled."
                )

            return self._build_auth_response(user)

        except SQLAlchemyError:
            self.rollback(db)
            raise

    # ==========================================================
    # Forgot Password
    # ==========================================================

    def forgot_password(
        self,
        db: Session,
        email: str,
    ) -> None:
        """
        Generates a reset token and emails a reset link to the user,
        if an account with that email exists. Always succeeds silently
        for unknown emails, to avoid leaking which emails are registered.
        """

        user = user_repository.get_by_email(db, email)

        if user is None or not user.is_active:
            return

        token = secrets.token_urlsafe(32)

        user.reset_token = token
        user.reset_token_expires = datetime.now(timezone.utc) + timedelta(
            minutes=settings.PASSWORD_RESET_TOKEN_EXPIRE_MINUTES,
        )

        try:
            self.commit(db)
            self.refresh(db, user)
        except SQLAlchemyError:
            self.rollback(db)
            raise

        reset_link = f"{settings.FRONTEND_URL}/reset-password/{token}"

        send_password_reset_email(
            user.email,
            user.full_name,
            reset_link,
        )

    # ==========================================================
    # Reset Password
    # ==========================================================

    def reset_password(
        self,
        db: Session,
        token: str,
        new_password: str,
    ) -> None:

        user = user_repository.get_by_reset_token(db, token)

        if user is None or user.reset_token_expires is None:
            raise BadRequestError(
                "Invalid or expired reset link."
            )

        expires_at = user.reset_token_expires

        if expires_at.tzinfo is None:
            expires_at = expires_at.replace(tzinfo=timezone.utc)

        if expires_at < datetime.now(timezone.utc):
            raise BadRequestError(
                "This reset link has expired. Please request a new one."
            )

        try:
            user.hashed_password = hash_password(new_password)
            user.reset_token = None
            user.reset_token_expires = None

            self.commit(db)
            self.refresh(db, user)

        except SQLAlchemyError:
            self.rollback(db)
            raise

    # ==========================================================
    # Send OTP (Future)
    # ==========================================================

    def send_otp(
        self,
        phone: str,
    ) -> None:
        raise NotImplementedError(
            "OTP service is not implemented yet."
        )

    # ==========================================================
    # Verify OTP (Future)
    # ==========================================================

    def verify_otp(
        self,
        db: Session,
        phone: str,
        otp: str,
    ) -> AuthResponse:
        raise NotImplementedError(
            "OTP verification is not implemented yet."
        )

    # ==========================================================
    # Refresh Token (Future)
    # ==========================================================

    def refresh_access_token(
        self,
        refresh_token: str,
    ) -> str:
        raise NotImplementedError(
            "Refresh token is not implemented yet."
        )


auth_service = AuthService()