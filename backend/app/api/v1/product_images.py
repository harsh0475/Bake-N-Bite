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

from app.schemas.product_image import (
    ProductImageResponse,
)

from app.services.product_image_service import (
    product_image_service,
)

router = APIRouter(
    prefix="/product-images",
    tags=["Product Images"],
)


# ==========================================================
# Upload Product Image
# ==========================================================

@router.post(
    "/{product_id}",
    response_model=ProductImageResponse,
    status_code=status.HTTP_201_CREATED,
)
async def upload_product_image(
    product_id: int,
    image: UploadFile = File(...),
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin),
):
    return await product_image_service.upload_image(
        db,
        product_id,
        image,
    )
    
# ==========================================================
# Upload Multiple Images
# ==========================================================

@router.post(
    "/{product_id}/multiple",
    response_model=List[ProductImageResponse],
    status_code=status.HTTP_201_CREATED,
)
async def upload_multiple_images(
    product_id: int,
    images: List[UploadFile] = File(...),
    db: Session = Depends(get_db),
    admin: User = Depends(
        get_current_admin,
    ),
):
    return await product_image_service.upload_images(
        db,
        product_id,
        images,
    )


# ==========================================================
# Get Product Images
# ==========================================================

@router.get(
    "/{product_id}",
    response_model=List[ProductImageResponse],
)
def get_product_images(
    product_id: int,
    db: Session = Depends(get_db),
):
    return product_image_service.get_images(
        db,
        product_id,
    )
    
from fastapi import HTTPException


# ==========================================================
# Delete Image
# ==========================================================

@router.delete(
    "/image/{image_id}",
)
def delete_product_image(
    image_id: int,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin),
):
    product_image_service.delete_image(
        db,
        image_id,
    )

    return {
        "message": "Image deleted successfully.",
    }


# ==========================================================
# Set Primary Image
# ==========================================================

@router.patch(
    "/image/{image_id}/primary",
    response_model=ProductImageResponse,
)
def set_primary_image(
    image_id: int,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin),
):
    return product_image_service.set_primary(
        db,
        image_id,
    )