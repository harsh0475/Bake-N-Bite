from __future__ import annotations

from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from fastapi import UploadFile

from app.core.exceptions import (
    NotFoundError,
)

from app.services.cloudinary_service import (
    cloudinary_service,
)

from app.repositories.category_repository import (
    category_repository,
)

from app.schemas.category import (
    CategoryResponse,
)

from app.services.base_service import (
    BaseService,
)


class CategoryImageService(BaseService):
    """
    Handles category image upload,
    replacement and deletion.
    """

    # ==========================================================
    # Get Category
    # ==========================================================

    def get_category(
        self,
        db: Session,
        category_id: int,
    ):
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
    # Upload Image
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

        category.image = result["url"]
        category.image_public_id = result["public_id"]

        try:

            self.commit(
                db,
            )

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

            self.rollback(
                db,
            )

            cloudinary_service.delete_image(
                result["public_id"],
            )

            raise

    # ==========================================================
    # Delete Image
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

        category.image = None
        category.image_public_id = None

        try:

            self.commit(
                db,
            )

            self.refresh(
                db,
                category,
            )

            return CategoryResponse.model_validate(
                category,
            )

        except SQLAlchemyError:

            self.rollback(
                db,
            )

            raise


category_image_service = (
    CategoryImageService()
)