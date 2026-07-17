from typing import List

from fastapi import (
    APIRouter,
    Depends,
    File,
    UploadFile,
    status,
)
from sqlalchemy.orm import Session

from app.core.dependencies import (
    get_current_admin,
)
from app.db.models.user import User
from app.db.session import get_db

from app.schemas.category import (
    CategoryCreate,
    CategoryResponse,
    CategoryUpdate,
)

from app.services.category_service import (
    category_service,
)

router = APIRouter(
    prefix="/categories",
    tags=["Categories"],
)

# --------------------------------------------------
# Public Endpoints
# --------------------------------------------------

@router.get(
    "/",
    response_model=List[CategoryResponse],
)
def get_categories(
    db: Session = Depends(get_db),
):
    return category_service.get_all_categories(
        db,
    )


@router.get(
    "/{category_id}",
    response_model=CategoryResponse,
)
def get_category(
    category_id: int,
    db: Session = Depends(get_db),
):
    category = category_service.get_category(
        db,
        category_id,
    )

    return CategoryResponse.model_validate(
        category,
    )


# --------------------------------------------------
# Admin CRUD
# --------------------------------------------------

@router.post(
    "/",
    response_model=CategoryResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_category(
    category: CategoryCreate,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin),
):
    return category_service.create_category(
        db,
        category,
    )


@router.put(
    "/{category_id}",
    response_model=CategoryResponse,
)
def update_category(
    category_id: int,
    category: CategoryUpdate,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin),
):
    return category_service.update_category(
        db,
        category_id,
        category,
    )


# --------------------------------------------------
# Upload Category Image
# --------------------------------------------------

@router.post(
    "/{category_id}/image",
    response_model=CategoryResponse,
    status_code=status.HTTP_201_CREATED,
)
async def upload_category_image(
    category_id: int,
    image: UploadFile = File(...),
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin),
):
    return await category_service.upload_image(
        db,
        category_id,
        image,
    )


# --------------------------------------------------
# Delete Category Image
# --------------------------------------------------

@router.delete(
    "/{category_id}/image",
    response_model=CategoryResponse,
)
def delete_category_image(
    category_id: int,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin),
):
    return category_service.delete_image(
        db,
        category_id,
    )


# --------------------------------------------------
# Delete Category
# --------------------------------------------------

@router.delete(
    "/{category_id}",
    status_code=status.HTTP_200_OK,
)
def delete_category(
    category_id: int,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin),
):
    category_service.delete_category(
        db,
        category_id,
    )

    return {
        "message": "Category deleted successfully.",
    }