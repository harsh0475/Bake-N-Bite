from __future__ import annotations

from sqlalchemy.orm import Session

from app.db.models.user import User, UserRole
from app.repositories.base_repository import BaseRepository


class UserRepository(BaseRepository[User]):
    """
    Repository for User database operations.
    """

    def __init__(self) -> None:
        super().__init__(User)

    # ==========================================================
    # Get User By Email
    # ==========================================================

    def get_by_email(
        self,
        db: Session,
        email: str,
    ) -> User | None:

        return self.get_one_by(
            db,
            User.email == email,
        )

    # ==========================================================
    # Get User By Phone
    # ==========================================================

    def get_by_phone(
        self,
        db: Session,
        phone: str,
    ) -> User | None:

        return self.get_one_by(
            db,
            User.phone == phone,
        )

    # ==========================================================
    # Email Exists
    # ==========================================================

    def email_exists(
        self,
        db: Session,
        email: str,
    ) -> bool:

        return (
            self.get_by_email(
                db,
                email,
            )
            is not None
        )

    # ==========================================================
    # Phone Exists
    # ==========================================================

    def phone_exists(
        self,
        db: Session,
        phone: str,
    ) -> bool:

        return (
            self.get_by_phone(
                db,
                phone,
            )
            is not None
        )

    # ==========================================================
    # Get Active User
    # ==========================================================

    def get_active_user(
        self,
        db: Session,
        user_id: int,
    ) -> User | None:

        return self.get_one_by(
            db,
            User.id == user_id,
            User.is_active.is_(True),
        )

    # ==========================================================
    # Get Verified User
    # ==========================================================

    def get_verified_user(
        self,
        db: Session,
        user_id: int,
    ) -> User | None:

        return self.get_one_by(
            db,
            User.id == user_id,
            User.is_verified.is_(True),
        )

    # ==========================================================
    # Get Admin User
    # ==========================================================

    def get_admin_user(
        self,
        db: Session,
        user_id: int,
    ) -> User | None:

        return self.get_one_by(
            db,
            User.id == user_id,
            User.role == UserRole.ADMIN,
        )
        
    # ==========================================================
    # Get User By Google ID
    # ==========================================================

    def get_by_google_id(
        self,
        db: Session,
        google_id: str,
    ) -> User | None:

        return self.get_one_by(
            db,
            User.google_id == google_id,
        )

    # ==========================================================
    # Get User By Reset Token
    # ==========================================================

    def get_by_reset_token(
        self,
        db: Session,
        token: str,
    ) -> User | None:

        return self.get_one_by(
            db,
            User.reset_token == token,
        )


user_repository = UserRepository()