from fastapi import (
    APIRouter,
    Depends,
)

from sqlalchemy.orm import Session

from typing import List

from app.core.dependencies import (
    get_current_admin,
)

from app.db.models.user import User

from app.db.session import get_db

from app.schemas.user import (
    AdminUserUpdate,
    UserResponse,
)

from app.services.admin_user_service import (
    admin_user_service,
)


router = APIRouter(
    prefix="/admin/users",
    tags=["Admin Users"],
)


# ==========================================================
# Get All Users
# ==========================================================

@router.get(
    "/",
    response_model=List[UserResponse],
)
def get_users(
    db: Session = Depends(get_db),
    admin: User = Depends(
        get_current_admin,
    ),
):
    return admin_user_service.get_users(
        db,
    )


# ==========================================================
# Get User
# ==========================================================

@router.get(
    "/{user_id}",
    response_model=UserResponse,
)
def get_user(
    user_id: int,
    db: Session = Depends(get_db),
    admin: User = Depends(
        get_current_admin,
    ),
):
    user = admin_user_service.get_user(
        db,
        user_id,
    )

    return UserResponse.model_validate(
        user,
    )


# ==========================================================
# Update User
# ==========================================================

@router.patch(
    "/{user_id}",
    response_model=UserResponse,
)
def update_user(
    user_id: int,
    data: AdminUserUpdate,
    db: Session = Depends(get_db),
    admin: User = Depends(
        get_current_admin,
    ),
):
    return admin_user_service.update_user(
        db,
        user_id,
        data,
    )
    
    
# ==========================================================
# Activate User
# ==========================================================

@router.patch(
    "/{user_id}/activate",
    response_model=UserResponse,
)
def activate_user(
    user_id: int,
    db: Session = Depends(get_db),
    admin: User = Depends(
        get_current_admin,
    ),
):
    return admin_user_service.activate_user(
        db,
        user_id,
    )


# ==========================================================
# Deactivate User
# ==========================================================

@router.patch(
    "/{user_id}/deactivate",
    response_model=UserResponse,
)
def deactivate_user(
    user_id: int,
    db: Session = Depends(get_db),
    admin: User = Depends(
        get_current_admin,
    ),
):
    return admin_user_service.deactivate_user(
        db,
        user_id,
    )


# ==========================================================
# Verify User
# ==========================================================

@router.patch(
    "/{user_id}/verify",
    response_model=UserResponse,
)
def verify_user(
    user_id: int,
    db: Session = Depends(get_db),
    admin: User = Depends(
        get_current_admin,
    ),
):
    return admin_user_service.verify_user(
        db,
        user_id,
    )