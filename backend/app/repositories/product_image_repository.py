from __future__ import annotations

from sqlalchemy import select

from sqlalchemy.orm import Session

from app.db.models.product_image import (
    ProductImage,
)

from app.repositories.base_repository import (
    BaseRepository,
)


class ProductImageRepository(
    BaseRepository[ProductImage]
):
    """
    Repository for product images.
    """

    def __init__(self):
        super().__init__(
            ProductImage
        )

    # ==========================================================
    # Product Images
    # ==========================================================

    def get_product_images(
        self,
        db: Session,
        product_id: int,
    ) -> list[ProductImage]:

        statement = (
            select(ProductImage)
            .where(
                ProductImage.product_id
                == product_id
            )
            .order_by(
                ProductImage.display_order
            )
        )

        return list(
            db.scalars(statement)
        )
        
    # ==========================================================
    # Primary Image
    # ==========================================================

    def get_primary_image(
        self,
        db: Session,
        product_id: int,
    ) -> ProductImage | None:

        return self.get_one_by(
            db,
            ProductImage.product_id
            == product_id,
            ProductImage.is_primary.is_(True),
        )


product_image_repository = (
    ProductImageRepository()
)