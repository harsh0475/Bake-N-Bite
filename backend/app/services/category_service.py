from __future__ import annotations

from fastapi import UploadFile
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from app.core.exceptions import (
    ConflictError,
    NotFoundError,
)
from app.services.cloudinary_service import (
    cloudinary_service,
)
from app.db.models.category import Category
from app.repositories.category_repository import (
    category_repository,
)
from app.schemas.category import (
    CategoryCreate,
    CategoryResponse,
    CategoryUpdate,
)
from app.services.base_service import BaseService


class CategoryService(BaseService):
    """
    Business logic for category management.
    """

    # ==========================================================
    # Create Category
    # ==========================================================

    def create_category(
        self,
        db: Session,
        data: CategoryCreate,
    ) -> CategoryResponse:

        data.name = data.name.strip()
        data.slug = data.slug.strip()

        if category_repository.name_exists(
            db,
            data.name,
        ):
            raise ConflictError(
                "Category name already exists."
            )

        if category_repository.slug_exists(
            db,
            data.slug,
        ):
            raise ConflictError(
                "Category slug already exists."
            )

        try:

            category = category_repository.create(
                db,
                obj_in=data.model_dump(),
            )

            self.commit(db)

            self.refresh(
                db,
                category,
            )

            return CategoryResponse.model_validate(
                category,
            )

        except SQLAlchemyError:

            self.rollback(db)
            raise

    # ==========================================================
    # Get Category
    # ==========================================================

    def get_category(
        self,
        db: Session,
        category_id: int,
    ) -> Category:

        category = category_repository.get_by_id(
            db,
            category_id,
        )

        if category is None:
            raise NotFoundError(
                "Category not found."
            )

        return category

    # ==========================================================
    # Get All Categories
    # ==========================================================

    def get_all_categories(
        self,
        db: Session,
    ) -> list[Category]:

        return category_repository.get_all(
            db,
            Category.display_order,
            Category.name,
        )

    # ==========================================================
    # Homepage Categories
    # ==========================================================

    def get_homepage_categories(
        self,
        db: Session,
    ) -> list[Category]:

        return category_repository.get_homepage_categories(
            db,
        )

    # ==========================================================
    # Active Categories
    # ==========================================================

    def get_active_categories(
        self,
        db: Session,
    ) -> list[Category]:

        return category_repository.get_active_categories(
            db,
        )

    # ==========================================================
    # Update Category
    # ==========================================================

    def update_category(
        self,
        db: Session,
        category_id: int,
        data: CategoryUpdate,
    ) -> CategoryResponse:

        category = self.get_category(
            db,
            category_id,
        )

        if data.name is not None:
            data.name = data.name.strip()

            if (
                data.name != category.name
                and category_repository.name_exists(
                    db,
                    data.name,
                )
            ):
                raise ConflictError(
                    "Category name already exists."
                )

        if data.slug is not None:
            data.slug = data.slug.strip()

            if (
                data.slug != category.slug
                and category_repository.slug_exists(
                    db,
                    data.slug,
                )
            ):
                raise ConflictError(
                    "Category slug already exists."
                )

        try:

            updated = category_repository.update(
                db,
                db_obj=category,
                obj_in=data.model_dump(
                    exclude_unset=True,
                ),
            )

            self.commit(db)

            self.refresh(
                db,
                updated,
            )

            return CategoryResponse.model_validate(
                updated,
            )

        except SQLAlchemyError:

            self.rollback(db)
            raise

    # ==========================================================
    # Upload Category Image
    # ==========================================================

    async def upload_image(
        self,
        db: Session,
        category_id: int,
        image: UploadFile,
    ) -> CategoryResponse:

        category = self.get_category(
            db,
            category_id,
        )

        result = await cloudinary_service.upload_image(
            image=image,
            folder="Bake-N-Bite/categories",
        )

        old_public_id = category.image_public_id

        try:

            category.image = result["url"]
            category.image_public_id = result["public_id"]

            self.commit(db)

            self.refresh(
                db,
                category,
            )

            if old_public_id:
                cloudinary_service.delete_image(
                    old_public_id,
                )

            return CategoryResponse.model_validate(
                category,
            )

        except SQLAlchemyError:

            self.rollback(db)

            cloudinary_service.delete_image(
                result["public_id"],
            )

            raise

    # ==========================================================
    # Delete Category Image
    # ==========================================================

    def delete_image(
        self,
        db: Session,
        category_id: int,
    ) -> CategoryResponse:

        category = self.get_category(
            db,
            category_id,
        )

        if category.image_public_id:

            cloudinary_service.delete_image(
                category.image_public_id,
            )

        try:

            category.image = None
            category.image_public_id = None

            self.commit(db)

            self.refresh(
                db,
                category,
            )

            return CategoryResponse.model_validate(
                category,
            )

        except SQLAlchemyError:

            self.rollback(db)
            raise

    # ==========================================================
    # Delete Category
    # ==========================================================

    def delete_category(
        self,
        db: Session,
        category_id: int,
    ) -> None:

        category = self.get_category(
            db,
            category_id,
        )

        public_id = category.image_public_id

        try:

            category_repository.delete(
                db,
                db_obj=category,
            )

            self.commit(db)

            if public_id:

                cloudinary_service.delete_image(
                    public_id,
                )

        except SQLAlchemyError:

            self.rollback(db)
            raise


category_service = CategoryService()