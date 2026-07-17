from __future__ import annotations

from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from app.core.exceptions import (
    NotFoundError,
)

from app.db.models.review import Review

from app.repositories.review_repository import (
    review_repository,
)

from app.schemas.review import (
    AdminReplyUpdate,
    ReviewResponse,
)

from app.services.base_service import (
    BaseService,
)


class AdminReviewService(BaseService):
    """
    Business logic for admin review management.
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
    # Get All Reviews
    # ==========================================================

    def get_reviews(
        self,
        db: Session,
    ) -> list[ReviewResponse]:

        reviews = review_repository.get_all(
            db,
            Review.created_at.desc(),
        )

        return [
            ReviewResponse.model_validate(
                review,
            )
            for review in reviews
        ]
        
    # ==========================================================
    # Reply Review
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

            review.admin_reply = (
                data.admin_reply
            )

            self.commit(db)

            self.refresh(
                db,
                review,
            )

            return ReviewResponse.model_validate(
                review,
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

        review_repository.sync_product_rating(
            db,
            review.product_id,
        )

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

        review_repository.sync_product_rating(
            db,
            review.product_id,
        )

        self.commit_and_refresh(
            db,
            review,
        )

        return ReviewResponse.model_validate(
            review,
        )

    # ==========================================================
    # Delete Review
    # ==========================================================

    def delete_review(
        self,
        db: Session,
        review_id: int,
    ) -> None:

        review = self.get_review(
            db,
            review_id,
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

            self.commit(db)

        except SQLAlchemyError:

            self.rollback(db)

            raise


admin_review_service = (
    AdminReviewService()
)