from __future__ import annotations

from sqlalchemy import desc, func, select
from sqlalchemy.orm import Session, selectinload

from app.db.models.product import Product
from app.db.models.review import Review
from app.repositories.base_repository import BaseRepository


class ReviewRepository(BaseRepository[Review]):
    """
    Repository for Review database operations.
    """

    def __init__(self) -> None:
        super().__init__(Review)

    # ==========================================================
    # Get Review By User And Product
    # ==========================================================

    def get_by_user_and_product(
        self,
        db: Session,
        user_id: int,
        product_id: int,
    ) -> Review | None:

        return self.get_one_by(
            db,
            Review.user_id == user_id,
            Review.product_id == product_id,
        )

    # ==========================================================
    # Get Product Reviews
    # ==========================================================

    def get_product_reviews(
        self,
        db: Session,
        product_id: int,
        limit: int | None = None,
    ) -> list[Review]:

        statement = (
            select(Review)
            .options(
                selectinload(Review.user),
            )
            .where(
                Review.product_id == product_id,
                Review.is_visible.is_(True),
            )
            .order_by(
                desc(Review.created_at),
            )
        )

        if limit:
            statement = statement.limit(limit)

        return list(
            db.scalars(statement)
        )

    # ==========================================================
    # Get Reviews By User
    # ==========================================================

    def get_user_reviews(
        self,
        db: Session,
        user_id: int,
    ) -> list[Review]:

        statement = (
            select(Review)
            .options(
                selectinload(Review.product),
            )
            .where(
                Review.user_id == user_id,
            )
            .order_by(
                desc(Review.created_at),
            )
        )

        return list(
            db.scalars(statement)
        )

    # ==========================================================
    # Average Rating
    # ==========================================================

    def get_average_rating(
        self,
        db: Session,
        product_id: int,
    ) -> float:

        statement = (
            select(
                func.avg(Review.rating),
            )
            .where(
                Review.product_id == product_id,
                Review.is_visible.is_(True),
            )
        )

        result = db.scalar(statement)

        return float(result or 0)

    # ==========================================================
    # Review Count
    # ==========================================================

    def get_review_count(
        self,
        db: Session,
        product_id: int,
    ) -> int:

        statement = (
            select(
                func.count(),
            )
            .where(
                Review.product_id == product_id,
                Review.is_visible.is_(True),
            )
        )

        return db.scalar(statement) or 0
    
    # ==========================================================
    # Sync Product Rating
    # ==========================================================

    def sync_product_rating(
        self,
        db: Session,
        product_id: int,
    ) -> None:
        """
        Recalculates a product's average_rating and total_reviews
        from its currently visible reviews, and writes the result
        back onto the Product row. Call this any time a review is
        created, updated, deleted, hidden, or shown.
        """

        average = self.get_average_rating(
            db,
            product_id,
        )

        count = self.get_review_count(
            db,
            product_id,
        )

        product = db.get(
            Product,
            product_id,
        )

        if product is None:
            return

        product.average_rating = round(average, 2)
        product.total_reviews = count

        db.add(product)

    # ==========================================================
    # Verified Purchase Reviews
    # ==========================================================

    def get_verified_reviews(
        self,
        db: Session,
        product_id: int,
    ) -> list[Review]:

        statement = (
            select(Review)
            .options(
                selectinload(Review.user),
            )
            .where(
                Review.product_id == product_id,
                Review.is_verified_purchase.is_(True),
                Review.is_visible.is_(True),
            )
            .order_by(
                desc(Review.created_at),
            )
        )

        return list(
            db.scalars(statement)
        )

    # ==========================================================
    # User Already Reviewed
    # ==========================================================

    def has_user_reviewed(
        self,
        db: Session,
        user_id: int,
        product_id: int,
    ) -> bool:

        return (
            self.get_by_user_and_product(
                db,
                user_id,
                product_id,
            )
            is not None
        )


review_repository = ReviewRepository()