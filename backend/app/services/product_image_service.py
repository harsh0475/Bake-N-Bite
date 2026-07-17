from __future__ import annotations

from fastapi import UploadFile
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from app.core.exceptions import NotFoundError
from app.services.cloudinary_service import (
    cloudinary_service,
)

from app.db.models.product import Product

from app.repositories.product_image_repository import (
    product_image_repository,
)
from app.repositories.product_repository import (
    product_repository,
)

from app.schemas.product_image import (
    ProductImageResponse,
)

from app.services.base_service import BaseService


class ProductImageService(BaseService):
    """
    Business logic for product image management.
    """

    # ==========================================================
    # Get Product
    # ==========================================================

    def get_product(
        self,
        db: Session,
        product_id: int,
    ) -> Product:

        product = product_repository.get_by_id(
            db,
            product_id,
        )

        if product is None:
            raise NotFoundError(
                "Product not found."
            )

        return product

    # ==========================================================
    # Upload Single Image
    # ==========================================================

    async def upload_image(
        self,
        db: Session,
        product_id: int,
        image: UploadFile,
    ) -> ProductImageResponse:

        self.get_product(
            db,
            product_id,
        )

        result = await cloudinary_service.upload_image(
            image=image,
            folder="Bake-N-Bite/products",
        )

        existing_images = (
            product_image_repository.get_product_images(
                db,
                product_id,
            )
        )

        image_record = (
            product_image_repository.create(
                db,
                obj_in={
                    "product_id": product_id,
                    "image_url": result["url"],
                    "public_id": result["public_id"],
                    "display_order": len(existing_images),
                    "is_primary": len(existing_images) == 0,
                },
            )
        )

        try:

            self.commit(db)

            self.refresh(
                db,
                image_record,
            )

            return ProductImageResponse.model_validate(
                image_record,
            )

        except SQLAlchemyError:

            self.rollback(db)

            cloudinary_service.delete_image(
                result["public_id"],
            )

            raise

    # ==========================================================
    # Upload Multiple Images
    # ==========================================================

    async def upload_images(
        self,
        db: Session,
        product_id: int,
        images: list[UploadFile],
    ) -> list[ProductImageResponse]:

        uploaded = []

        for image in images:

            uploaded.append(
                await self.upload_image(
                    db,
                    product_id,
                    image,
                )
            )

        return uploaded

    # ==========================================================
    # Get Product Images
    # ==========================================================

    def get_images(
        self,
        db: Session,
        product_id: int,
    ) -> list[ProductImageResponse]:

        self.get_product(
            db,
            product_id,
        )

        images = (
            product_image_repository.get_product_images(
                db,
                product_id,
            )
        )

        return [
            ProductImageResponse.model_validate(image)
            for image in images
        ]

    # ==========================================================
    # Delete Image
    # ==========================================================

    def delete_image(
        self,
        db: Session,
        image_id: int,
    ) -> None:

        image = product_image_repository.get_by_id(
            db,
            image_id,
        )

        if image is None:
            raise NotFoundError(
                "Image not found."
            )

        try:

            product_image_repository.delete(
                db,
                db_obj=image,
            )

            self.commit(
                db,
            )

            if image.public_id:
                cloudinary_service.delete_image(
                    image.public_id,
                )

        except SQLAlchemyError:

            self.rollback(
                db,
            )

            raise

    # ==========================================================
    # Set Primary Image
    # ==========================================================

    def set_primary(
        self,
        db: Session,
        image_id: int,
    ) -> ProductImageResponse:

        image = product_image_repository.get_by_id(
            db,
            image_id,
        )

        if image is None:
            raise NotFoundError(
                "Image not found."
            )

        images = (
            product_image_repository.get_product_images(
                db,
                image.product_id,
            )
        )

        for item in images:
            item.is_primary = False

        image.is_primary = True

        self.commit(
            db,
        )

        self.refresh(
            db,
            image,
        )

        return ProductImageResponse.model_validate(
            image,
        )


product_image_service = ProductImageService()