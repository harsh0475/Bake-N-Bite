from __future__ import annotations

from decimal import Decimal

from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from app.core.exceptions import (
    ConflictError,
    NotFoundError,
)
from app.db.models.product import Product
from app.repositories.category_repository import category_repository
from app.repositories.product_repository import product_repository
from app.schemas.product import (
    AdminProductListResponse,
    ProductCard,
    ProductCreate,
    ProductDeleteResponse,
    ProductDetail,
    ProductResponse,
    ProductUpdate,
)
from app.services.base_service import BaseService


class ProductService(BaseService):
    """
    Business logic for products.
    """

    # ==========================================================
    # Create Product
    # ==========================================================

    def create_product(
        self,
        db: Session,
        data: ProductCreate,
    ) -> ProductResponse:

        category = category_repository.get_by_id(
            db,
            data.category_id,
        )

        if category is None:
            raise NotFoundError(
                "Category not found."
            )

        if product_repository.slug_exists(
            db,
            data.slug,
        ):
            raise ConflictError(
                "Product slug already exists."
            )

        try:

            product = product_repository.create(
                db,
                obj_in=data.model_dump(),
            )

            self.commit(db)

            self.refresh(
                db,
                product,
            )

            return ProductResponse.model_validate(
                product,
            )

        except SQLAlchemyError:

            self.rollback(db)

            raise

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
    # Get Product By Slug
    # ==========================================================

    def get_product_by_slug(
        self,
        db: Session,
        slug: str,
    ) -> ProductDetail:

        product = product_repository.get_by_slug(
            db,
            slug,
        )

        if product is None:
            raise NotFoundError(
                "Product not found."
            )

        return ProductDetail.model_validate(
            product,
        )

    # ==========================================================
    # Get Products
    # ==========================================================

    def get_all_products(
        self,
        db: Session,
        *,
        category_id: int | None = None,
        search: str | None = None,
        featured: bool | None = None,
        best_seller: bool | None = None,
        is_veg: bool | None = None,
        sort: str | None = None,
        available: bool = True,
        min_price: Decimal | None = None,
        max_price: Decimal | None = None,
    ) -> list[ProductResponse]:

        products = product_repository.get_products(
            db,
            category_id=category_id,
            search=search,
            is_featured=featured,
            is_best_seller=best_seller,
            is_veg=is_veg,
            sort=sort,
            is_available=available,
            min_price=min_price,
            max_price=max_price,
        )

        return [
            ProductResponse.model_validate(
                product,
            )
            for product in products
        ]

    # ==========================================================
    # Admin Products
    # ==========================================================

    def get_admin_products(
        self,
        db: Session,
        *,
        page: int = 1,
        page_size: int = 10,
        search: str | None = None,
        category_id: int | None = None,
        is_veg: bool | None = None,
        sort: str | None = None,
        is_available: bool | None = None,
        is_featured: bool | None = None,
        is_best_seller: bool | None = None,
    ) -> AdminProductListResponse:

        products, total = (
            product_repository.get_admin_products(
                db=db,
                page=page,
                page_size=page_size,
                search=search,
                category_id=category_id,
                is_veg=is_veg,
                sort=sort,
                is_available=is_available,
                is_featured=is_featured,
                is_best_seller=is_best_seller,
            )
        )

        return AdminProductListResponse(
            items=[
                ProductResponse.model_validate(
                    product,
                )
                for product in products
            ],
            page=page,
            page_size=page_size,
            total=total,
            total_pages=(
                total + page_size - 1
            ) // page_size,
        )

    # ==========================================================
    # Available Products
    # ==========================================================

    def get_available_products(
        self,
        db: Session,
    ) -> list[ProductCard]:

        products = (
            product_repository.get_available_products(
                db,
            )
        )

        return [
            ProductCard.model_validate(
                product,
            )
            for product in products
        ]
        
    # ==========================================================
    # Featured Products
    # ==========================================================

    def get_featured_products(
        self,
        db: Session,
    ) -> list[ProductCard]:

        products = (
            product_repository.get_featured_products(
                db,
            )
        )

        return [
            ProductCard.model_validate(
                product,
            )
            for product in products
        ]

    # ==========================================================
    # Best Sellers
    # ==========================================================

    def get_best_sellers(
        self,
        db: Session,
    ) -> list[ProductCard]:

        products = (
            product_repository.get_best_sellers(
                db,
            )
        )

        return [
            ProductCard.model_validate(
                product,
            )
            for product in products
        ]

    # ==========================================================
    # Products By Category
    # ==========================================================

    def get_products_by_category(
        self,
        db: Session,
        category_id: int,
    ) -> list[ProductCard]:

        category = category_repository.get_by_id(
            db,
            category_id,
        )

        if category is None:
            raise NotFoundError(
                "Category not found."
            )

        products = product_repository.get_by_category(
            db,
            category_id,
        )

        return [
            ProductCard.model_validate(
                product,
            )
            for product in products
        ]

    # ==========================================================
    # Search Products
    # ==========================================================

    def search_products(
        self,
        db: Session,
        keyword: str,
    ) -> list[ProductCard]:

        products = product_repository.search(
            db,
            keyword,
        )

        return [
            ProductCard.model_validate(
                product,
            )
            for product in products
        ]

    # ==========================================================
    # Products By Price Range
    # ==========================================================

    def get_products_by_price_range(
        self,
        db: Session,
        minimum: Decimal,
        maximum: Decimal,
    ) -> list[ProductCard]:

        products = (
            product_repository.get_by_price_range(
                db,
                minimum,
                maximum,
            )
        )

        return [
            ProductCard.model_validate(
                product,
            )
            for product in products
        ]

    # ==========================================================
    # Update Product
    # ==========================================================

    def update_product(
        self,
        db: Session,
        product_id: int,
        data: ProductUpdate,
    ) -> ProductResponse:

        product = self.get_product(
            db,
            product_id,
        )

        if (
            data.slug
            and data.slug != product.slug
        ):
            if product_repository.slug_exists(
                db,
                data.slug,
            ):
                raise ConflictError(
                    "Product slug already exists."
                )

        if data.category_id is not None:

            category = category_repository.get_by_id(
                db,
                data.category_id,
            )

            if category is None:
                raise NotFoundError(
                    "Category not found."
                )

        try:

            updated = product_repository.update(
                db,
                db_obj=product,
                obj_in=data.model_dump(
                    exclude_unset=True,
                ),
            )

            self.commit(
                db,
            )

            self.refresh(
                db,
                updated,
            )

            return ProductResponse.model_validate(
                updated,
            )

        except SQLAlchemyError:

            self.rollback(
                db,
            )

            raise

    # ==========================================================
    # Delete Product
    # ==========================================================

    def delete_product(
        self,
        db: Session,
        product_id: int,
    ) -> None:

        product = self.get_product(
            db,
            product_id,
        )

        product_repository.delete(
            db,
            db_obj=product,
        )

        self.commit(
            db,
        )


product_service = ProductService()