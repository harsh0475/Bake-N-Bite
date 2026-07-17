from __future__ import annotations

from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from app.core.exceptions import (
    ConflictError,
    NotFoundError,
)
from app.db.models.review import Review
from app.db.models.user import User
from app.repositories.product_repository import product_repository
from app.repositories.review_repository import review_repository
from app.schemas.review import (
    AdminReplyUpdate,
    ReviewCreate,
    ReviewResponse,
    ReviewSummary,
    ReviewUpdate,
)
from app.services.base_service import BaseService


class ReviewService(BaseService):
    """
    Business logic for product reviews.
    """

    # ==========================================================
    # Get Review
    # ==========================================================

    def get_review(
        self,
        db: Session,
        review_id: int,
    ) -> Review:

        review = review_repository.get_by_id(
            db,
            review_id,
        )

        if review is None:
            raise NotFoundError(
                "Review not found."
            )

        return review

    # ==========================================================
    # Create Review
    # ==========================================================

    def create_review(
        self,
        db: Session,
        current_user: User,
        data: ReviewCreate,
    ) -> ReviewResponse:

        product = product_repository.get_by_id(
            db,
            data.product_id,
        )

        if product is None:
            raise NotFoundError(
                "Product not found."
            )

        if review_repository.has_user_reviewed(
            db,
            current_user.id,
            data.product_id,
        ):
            raise ConflictError(
                "You have already reviewed this product."
            )

        try:

            review = review_repository.create(
                db,
                obj_in={
                    "user_id": current_user.id,
                    "product_id": data.product_id,
                    "rating": data.rating,
                    "title": data.title,
                    "comment": data.comment,
                    "is_verified_purchase": False,
                    "is_visible": True,
                },
            )

            review_repository.sync_product_rating(
                db,
                data.product_id,
            )

            self.commit(
                db,
            )

            self.refresh(
                db,
                review,
            )

            review = self.get_review(
                db,
                review.id,
            )

            return ReviewResponse.model_validate(
                review,
            )

        except SQLAlchemyError:

            self.rollback(db)

            raise

    # ==========================================================
    # Update Review
    # ==========================================================

    def update_review(
        self,
        db: Session,
        current_user: User,
        review_id: int,
        data: ReviewUpdate,
    ) -> ReviewResponse:

        review = self.get_review(
            db,
            review_id,
        )

        if review.user_id != current_user.id:
            raise ConflictError(
                "You can update only your own review."
            )

        try:

            updated = review_repository.update(
                db,
                db_obj=review,
                obj_in=data.model_dump(
                    exclude_unset=True,
                ),
            )

            review_repository.sync_product_rating(
                db,
                review.product_id,
            )

            self.commit(
                db,
            )

            self.refresh(
                db,
                updated,
            )

            return ReviewResponse.model_validate(
                updated,
            )

        except SQLAlchemyError:

            self.rollback(db)

            raise

    # ==========================================================
    # Delete Review
    # ==========================================================

    def delete_review(
        self,
        db: Session,
        current_user: User,
        review_id: int,
    ) -> None:

        review = self.get_review(
            db,
            review_id,
        )

        if review.user_id != current_user.id:
            raise ConflictError(
                "You can delete only your own review."
            )

        try:

            product_id = review.product_id

            review_repository.delete(
                db,
                db_obj=review,
            )

            review_repository.sync_product_rating(
                db,
                product_id,
            )

            self.commit(
                db,
            )

        except SQLAlchemyError:

            self.rollback(db)

            raise

    # ==========================================================
    # Product Reviews
    # ==========================================================

    def get_product_reviews(
        self,
        db: Session,
        product_id: int,
    ) -> list[ReviewSummary]:

        product = product_repository.get_by_id(
            db,
            product_id,
        )

        if product is None:
            raise NotFoundError(
                "Product not found."
            )

        reviews = review_repository.get_product_reviews(
            db,
            product_id,
        )

        return [
            ReviewSummary.model_validate(review)
            for review in reviews
        ]

    # ==========================================================
    # User Reviews
    # ==========================================================

    def get_user_reviews(
        self,
        db: Session,
        current_user: User,
    ) -> list[ReviewResponse]:

        reviews = review_repository.get_user_reviews(
            db,
            current_user.id,
        )

        return [
            ReviewResponse.model_validate(review)
            for review in reviews
        ]

    # ==========================================================
    # Average Rating
    # ==========================================================

    def get_average_rating(
        self,
        db: Session,
        product_id: int,
    ) -> float:

        product = product_repository.get_by_id(
            db,
            product_id,
        )

        if product is None:
            raise NotFoundError(
                "Product not found."
            )

        return review_repository.get_average_rating(
            db,
            product_id,
        )

    # ==========================================================
    # Review Count
    # ==========================================================

    def get_review_count(
        self,
        db: Session,
        product_id: int,
    ) -> int:

        product = product_repository.get_by_id(
            db,
            product_id,
        )

        if product is None:
            raise NotFoundError(
                "Product not found."
            )

        return review_repository.get_review_count(
            db,
            product_id,
        )

    # ==========================================================
    # Admin Reply
    # ==========================================================

    def reply_review(
        self,
        db: Session,
        review_id: int,
        data: AdminReplyUpdate,
    ) -> ReviewResponse:

        review = self.get_review(
            db,
            review_id,
        )

        try:

            updated = review_repository.update(
                db,
                db_obj=review,
                obj_in={
                    "admin_reply": data.admin_reply,
                },
            )

            self.commit(
                db,
            )

            self.refresh(
                db,
                updated,
            )

            return ReviewResponse.model_validate(
                updated,
            )

        except SQLAlchemyError:

            self.rollback(db)

            raise

    # ==========================================================
    # Hide Review
    # ==========================================================

    def hide_review(
        self,
        db: Session,
        review_id: int,
    ) -> ReviewResponse:

        review = self.get_review(
            db,
            review_id,
        )

        review.is_visible = False

        self.commit_and_refresh(
            db,
            review,
        )

        return ReviewResponse.model_validate(
            review,
        )

    # ==========================================================
    # Show Review
    # ==========================================================

    def show_review(
        self,
        db: Session,
        review_id: int,
    ) -> ReviewResponse:

        review = self.get_review(
            db,
            review_id,
        )

        review.is_visible = True

        self.commit_and_refresh(
            db,
            review,
        )

        return ReviewResponse.model_validate(
            review,
        )


review_service = ReviewService()