from __future__ import annotations

from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from app.core.exceptions import (
    NotFoundError,
)

from app.db.models.user import User

from app.repositories.user_repository import (
    user_repository,
)

from app.schemas.user import (
    AdminUserUpdate,
    UserResponse,
)

from app.services.base_service import (
    BaseService,
)


class AdminUserService(BaseService):
    """
    Business logic for admin user management.
    """

    # ==========================================================
    # Get User
    # ==========================================================

    def get_user(
        self,
        db: Session,
        user_id: int,
    ) -> User:

        user = user_repository.get_by_id(
            db,
            user_id,
        )

        if user is None:
            raise NotFoundError(
                "User not found."
            )

        return user

    # ==========================================================
    # Get All Users
    # ==========================================================

    def get_users(
        self,
        db: Session,
    ) -> list[UserResponse]:

        users = user_repository.get_all(
            db,
            User.created_at.desc(),
        )

        return [
            UserResponse.model_validate(
                user
            )
            for user in users
        ]
        
    # ==========================================================
    # Update User
    # ==========================================================

    def update_user(
        self,
        db: Session,
        user_id: int,
        data: AdminUserUpdate,
    ) -> UserResponse:

        user = self.get_user(
            db,
            user_id,
        )

        try:

            updated = user_repository.update(
                db,
                db_obj=user,
                obj_in=data.model_dump(
                    exclude_unset=True,
                ),
            )

            self.commit(db)

            self.refresh(
                db,
                updated,
            )

            return UserResponse.model_validate(
                updated,
            )

        except SQLAlchemyError:

            self.rollback(db)

            raise

    # ==========================================================
    # Activate User
    # ==========================================================

    def activate_user(
        self,
        db: Session,
        user_id: int,
    ) -> UserResponse:

        user = self.get_user(
            db,
            user_id,
        )

        user.is_active = True

        self.commit(db)

        self.refresh(
            db,
            user,
        )

        return UserResponse.model_validate(
            user,
        )

    # ==========================================================
    # Deactivate User
    # ==========================================================

    def deactivate_user(
        self,
        db: Session,
        user_id: int,
    ) -> UserResponse:

        user = self.get_user(
            db,
            user_id,
        )

        user.is_active = False

        self.commit(db)

        self.refresh(
            db,
            user,
        )

        return UserResponse.model_validate(
            user,
        )

    # ==========================================================
    # Verify User
    # ==========================================================

    def verify_user(
        self,
        db: Session,
        user_id: int,
    ) -> UserResponse:

        user = self.get_user(
            db,
            user_id,
        )

        user.is_verified = True

        self.commit(db)

        self.refresh(
            db,
            user,
        )

        return UserResponse.model_validate(
            user,
        )


admin_user_service = AdminUserService()