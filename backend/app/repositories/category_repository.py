from __future__ import annotations

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.db.models.category import Category
from app.repositories.base_repository import BaseRepository


class CategoryRepository(BaseRepository[Category]):
    """
    Repository for Category database operations.
    """

    def __init__(self) -> None:
        super().__init__(Category)

    # ==========================================================
    # Get Category By Name
    # ==========================================================

    def get_by_name(
        self,
        db: Session,
        name: str,
    ) -> Category | None:

        return self.get_one_by(
            db,
            Category.name == name,
        )

    # ==========================================================
    # Get Category By Slug
    # ==========================================================

    def get_by_slug(
        self,
        db: Session,
        slug: str,
    ) -> Category | None:

        return self.get_one_by(
            db,
            Category.slug == slug,
        )

    # ==========================================================
    # Get Active Categories
    # ==========================================================

    def get_active_categories(
        self,
        db: Session,
    ) -> list[Category]:

        statement = (
            select(Category)
            .where(
                Category.is_active.is_(True)
            )
            .order_by(
                Category.display_order
            )
        )

        return list(
            db.scalars(statement)
        )

    # ==========================================================
    # Get Homepage Categories
    # ==========================================================

    def get_homepage_categories(
        self,
        db: Session,
    ) -> list[Category]:

        statement = (
            select(Category)
            .where(
                Category.is_active.is_(True),
                Category.show_on_homepage.is_(True),
            )
            .order_by(
                Category.display_order
            )
        )

        return list(
            db.scalars(statement)
        )

    # ==========================================================
    # Name Exists
    # ==========================================================

    def name_exists(
        self,
        db: Session,
        name: str,
    ) -> bool:

        return (
            self.get_by_name(
                db,
                name,
            )
            is not None
        )

    # ==========================================================
    # Slug Exists
    # ==========================================================

    def slug_exists(
        self,
        db: Session,
        slug: str,
    ) -> bool:

        return (
            self.get_by_slug(
                db,
                slug,
            )
            is not None
        )


category_repository = CategoryRepository()