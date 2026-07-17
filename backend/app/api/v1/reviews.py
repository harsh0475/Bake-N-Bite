from typing import List

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user
from app.db.models.user import User
from app.db.session import get_db

from app.schemas.review import (
    AdminReplyUpdate,
    ReviewCreate,
    ReviewResponse,
    ReviewSummary,
    ReviewUpdate,
)

from app.services.review_service import review_service


router = APIRouter(
    prefix="/reviews",
    tags=["Reviews"],
)


# --------------------------------------------------
# Create Review
# --------------------------------------------------

@router.post(
    "/",
    response_model=ReviewResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_review(
    review: ReviewCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return review_service.create_review(
        db,
        current_user,
        review,
    )


# --------------------------------------------------
# Update Review
# --------------------------------------------------

@router.put(
    "/{review_id}",
    response_model=ReviewResponse,
)
def update_review(
    review_id: int,
    review: ReviewUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return review_service.update_review(
        db,
        current_user,
        review_id,
        review,
    )


# --------------------------------------------------
# Delete Review
# --------------------------------------------------

@router.delete(
    "/{review_id}",
    status_code=status.HTTP_200_OK,
)
def delete_review(
    review_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    review_service.delete_review(
        db,
        current_user,
        review_id,
    )

    return {
        "message": "Review deleted successfully."
    }


# --------------------------------------------------
# Product Reviews
# --------------------------------------------------

@router.get(
    "/product/{product_id}",
    response_model=List[ReviewSummary],
)
def get_product_reviews(
    product_id: int,
    db: Session = Depends(get_db),
):
    return review_service.get_product_reviews(
        db,
        product_id,
    )


# --------------------------------------------------
# Current User Reviews
# --------------------------------------------------

@router.get(
    "/my",
    response_model=List[ReviewResponse],
)
def get_my_reviews(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return review_service.get_user_reviews(
        db,
        current_user,
    )


# --------------------------------------------------
# Average Rating
# --------------------------------------------------

@router.get(
    "/product/{product_id}/rating",
)
def get_average_rating(
    product_id: int,
    db: Session = Depends(get_db),
):
    return {
        "average_rating": review_service.get_average_rating(
            db,
            product_id,
        )
    }


# --------------------------------------------------
# Review Count
# --------------------------------------------------

@router.get(
    "/product/{product_id}/count",
)
def get_review_count(
    product_id: int,
    db: Session = Depends(get_db),
):
    return {
        "review_count": review_service.get_review_count(
            db,
            product_id,
        )
    }