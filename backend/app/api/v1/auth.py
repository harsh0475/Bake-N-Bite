from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user
from app.db.models.user import User
from app.db.session import get_db

from app.schemas.auth import (
    AuthResponse,
    RegisterRequest,
    GoogleLoginRequest,
    ForgotPasswordRequest,
    ResetPasswordRequest,
    MessageResponse,
)

from app.schemas.user import UserProfile

from app.services.auth_service import auth_service
from app.services.user_service import user_service
from fastapi.security import OAuth2PasswordRequestForm

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.post(
    "/register",
    response_model=AuthResponse,
    status_code=status.HTTP_201_CREATED,
)
def register(
    user: RegisterRequest,
    db: Session = Depends(get_db),
):
    return auth_service.register(
        db,
        user,
    )


@router.post(
    "/login",
    response_model=AuthResponse,
)
def login(
    credentials: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    return auth_service.login(
        db,
        credentials,
    )


@router.post(
    "/google",
    response_model=AuthResponse,
)
def google_login(
    payload: GoogleLoginRequest,
    db: Session = Depends(get_db),
):
    return auth_service.google_login(
        db,
        payload.credential,
    )


@router.post(
    "/forgot-password",
    response_model=MessageResponse,
)
def forgot_password(
    payload: ForgotPasswordRequest,
    db: Session = Depends(get_db),
):
    auth_service.forgot_password(
        db,
        payload.email,
    )

    return MessageResponse(
        message="If an account exists with that email, a reset link has been sent.",
    )


@router.post(
    "/reset-password",
    response_model=MessageResponse,
)
def reset_password(
    payload: ResetPasswordRequest,
    db: Session = Depends(get_db),
):
    auth_service.reset_password(
        db,
        payload.token,
        payload.new_password,
    )

    return MessageResponse(
        message="Password reset successful. You can now log in.",
    )


@router.get(
    "/me",
    response_model=UserProfile,
)
def me(
    current_user: User = Depends(get_current_user),
):
    return user_service.get_profile(
        current_user,
    )