from typing import List

from fastapi import (
    APIRouter,
    Depends,
)

from sqlalchemy.orm import Session

from app.core.dependencies import (
    get_current_admin,
)

from app.db.models.user import User

from app.db.session import get_db

from app.schemas.review import (
    AdminReplyUpdate,
    ReviewResponse,
)

from app.services.admin_review_service import (
    admin_review_service,
)


router = APIRouter(
    prefix="/admin/reviews",
    tags=["Admin Reviews"],
)


# ==========================================================
# Get All Reviews
# ==========================================================

@router.get(
    "/",
    response_model=List[ReviewResponse],
)
def get_reviews(
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin),
):
    return admin_review_service.get_reviews(
        db,
    )


# ==========================================================
# Get Review
# ==========================================================

@router.get(
    "/{review_id}",
    response_model=ReviewResponse,
)
def get_review(
    review_id: int,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin),
):
    review = admin_review_service.get_review(
        db,
        review_id,
    )

    return ReviewResponse.model_validate(
        review,
    )


# ==========================================================
# Reply Review
# ==========================================================

@router.patch(
    "/{review_id}/reply",
    response_model=ReviewResponse,
)
def reply_review(
    review_id: int,
    data: AdminReplyUpdate,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin),
):
    return admin_review_service.reply_review(
        db,
        review_id,
        data,
    )
    
# ==========================================================
# Hide Review
# ==========================================================

@router.patch(
    "/{review_id}/hide",
    response_model=ReviewResponse,
)
def hide_review(
    review_id: int,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin),
):
    return admin_review_service.hide_review(
        db,
        review_id,
    )


# ==========================================================
# Show Review
# ==========================================================

@router.patch(
    "/{review_id}/show",
    response_model=ReviewResponse,
)
def show_review(
    review_id: int,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin),
):
    return admin_review_service.show_review(
        db,
        review_id,
    )


# ==========================================================
# Delete Review
# ==========================================================

@router.delete(
    "/{review_id}",
)
def delete_review(
    review_id: int,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin),
):
    admin_review_service.delete_review(
        db,
        review_id,
    )

    return {
        "message": "Review deleted successfully.",
    }