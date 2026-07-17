from __future__ import annotations

from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from app.core.exceptions import (
    AuthenticationError,
    ConflictError,
    NotFoundError,
)
from app.core.security import (
    hash_password,
    verify_password,
)
from app.db.models.user import User
from app.repositories.user_repository import user_repository
from app.schemas.user import (
    AdminUserUpdate,
    ChangePassword,
    UserProfile,
    UserResponse,
    UserUpdate,
)
from app.services.base_service import BaseService


class UserService(BaseService):
    """
    Business logic related to users.
    """
    # ==========================================================
    # Get Profile
    # ==========================================================

    def get_profile(
        self,
        current_user: User,
    ) -> UserProfile:

        return UserProfile.model_validate(
            current_user
        )
        
    # ==========================================================
    # Get User By ID
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

    def get_all_users(
        self,
        db: Session,
    ) -> list[User]:

        return user_repository.get_all(
            db,
        )
        
    # ==========================================================
    # Update Profile
    # ==========================================================

    def update_profile(
        self,
        db: Session,
        current_user: User,
        data: UserUpdate,
    ) -> UserResponse:

        if (
            data.phone
            and data.phone != current_user.phone
        ):
            if user_repository.phone_exists(
                db,
                data.phone,
            ):
                raise ConflictError(
                    "Phone number already exists."
                )

        try:

            update_data = data.model_dump(
                exclude_unset=True,
            )

            updated_user = user_repository.update(
                db,
                db_obj=current_user,
                obj_in=update_data,
            )

            self.commit(
                db,
            )

            self.refresh(
                db,
                updated_user,
            )

            return UserResponse.model_validate(
                updated_user,
            )

        except SQLAlchemyError:

            self.rollback(
                db,
            )

            raise
        
    # ==========================================================
    # Change Password
    # ==========================================================

    def change_password(
        self,
        db: Session,
        current_user: User,
        data: ChangePassword,
    ) -> None:

        if not verify_password(
            data.current_password,
            current_user.hashed_password,
        ):
            raise AuthenticationError(
                "Current password is incorrect."
            )

        current_user.hashed_password = hash_password(
            data.new_password,
        )

        try:

            self.commit(
                db,
            )

        except SQLAlchemyError:

            self.rollback(
                db,
            )

            raise
        
    # ==========================================================
    # Admin Update User
    # ==========================================================

    def admin_update_user(
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

            update_data = data.model_dump(
                exclude_unset=True,
            )

            updated_user = user_repository.update(
                db,
                db_obj=user,
                obj_in=update_data,
            )

            self.commit(
                db,
            )

            self.refresh(
                db,
                updated_user,
            )

            return UserResponse.model_validate(
                updated_user,
            )

        except SQLAlchemyError:

            self.rollback(
                db,
            )

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

        self.commit_and_refresh(
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

        self.commit_and_refresh(
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

        self.commit_and_refresh(
            db,
            user,
        )

        return UserResponse.model_validate(
            user,
        )
    
user_service = UserService()