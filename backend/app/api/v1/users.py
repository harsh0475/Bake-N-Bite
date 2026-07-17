from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.core.dependencies import get_current_user
from app.db.models.user import User
from app.db.session import get_db
from app.schemas.user import (
    UserUpdate,
    UserProfile,
    UserResponse,
    ChangePassword
)
from app.services.user_service import user_service

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)

# -----------------------------------
# Profile
# -----------------------------------

@router.get(
    "/profile",
    response_model=UserProfile
)
def get_profile(
    current_user: User = Depends(get_current_user)
):
    return user_service.get_profile(
        current_user,
    )

@router.put(
    "/profile",
    response_model=UserResponse
)
def update_profile(
    data: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return user_service.update_profile(
        db,
        current_user,
        data,
    )

# -----------------------------------
# Password
# -----------------------------------

@router.put(
    "/change-password",
    status_code=status.HTTP_200_OK
)
def change_password(
    password_data: ChangePassword,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    user_service.change_password(
        db,
        current_user,
        password_data,
    )

    return {
        "message": "Password changed successfully."
    }