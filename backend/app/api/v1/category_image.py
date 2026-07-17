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
    CategoryResponse,
)

from app.services.category_image_service import (
    category_image_service,
)

router = APIRouter(
    prefix="/category-images",
    tags=["Category Images"],
)

# ==========================================================
# Upload Category Image
# ==========================================================

@router.post(
    "/{category_id}",
    response_model=CategoryResponse,
    status_code=status.HTTP_200_OK,
)
async def upload_category_image(
    category_id: int,
    image: UploadFile = File(...),
    db: Session = Depends(get_db),
    admin: User = Depends(
        get_current_admin,
    ),
):
    return await category_image_service.upload_image(
        db,
        category_id,
        image,
    )


# ==========================================================
# Delete Category Image
# ==========================================================

@router.delete(
    "/{category_id}",
    response_model=CategoryResponse,
)
def delete_category_image(
    category_id: int,
    db: Session = Depends(get_db),
    admin: User = Depends(
        get_current_admin,
    ),
):
    return category_image_service.delete_image(
        db,
        category_id,
    )