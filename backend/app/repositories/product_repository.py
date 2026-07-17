from __future__ import annotations

from decimal import Decimal

from sqlalchemy import and_, func, or_, select
from sqlalchemy.orm import Session, selectinload

from app.db.models.product import Product
from app.repositories.base_repository import BaseRepository


class ProductRepository(BaseRepository[Product]):
    """
    Repository for Product database operations.
    """

    def __init__(self) -> None:
        super().__init__(Product)
    
    # ==========================================================
    # Get Product By ID (Override BaseRepository)
    # ==========================================================

    def get_by_id(
        self,
        db: Session,
        object_id: int,
    ) -> Product | None:

        statement = (
            select(Product)
            .options(
                selectinload(Product.category),
                selectinload(Product.images),
                selectinload(Product.reviews),
            )
            .where(Product.id == object_id)
        )

        return db.scalar(statement)
    
    # ==========================================================
    # Get Product By Slug
    # ==========================================================

    def get_by_slug(
        self,
        db: Session,
        slug: str,
    ) -> Product | None:

        statement = (
            select(Product)
            .options(
                selectinload(Product.category),
                selectinload(Product.images),
                selectinload(Product.reviews),
            )
            .where(
                Product.slug == slug,
            )
        )

        return db.scalar(statement)

    # ==========================================================
    # Get Product By SKU
    # ==========================================================

    def get_by_sku(
        self,
        db: Session,
        sku: str,
    ) -> Product | None:

        return self.get_one_by(
            db,
            Product.sku == sku,
        )

    # ==========================================================
    # Get Available Products
    # ==========================================================

    def get_available_products(
        self,
        db: Session,
    ) -> list[Product]:

        statement = (
            select(Product)
            .options(
                selectinload(Product.category),
                selectinload(Product.images),
            )
            .where(
                Product.is_available.is_(True),
            )
            .order_by(
                Product.display_order,
                Product.name,
            )
        )

        return list(db.scalars(statement))

    # ==========================================================
    # Filter Products
    # ==========================================================

    def get_products(
        self,
        db: Session,
        *,
        category_id: int | None = None,
        search: str | None = None,
        is_featured: bool | None = None,
        is_best_seller: bool | None = None,
        is_veg: bool | None = None,
        sort: str | None = None,
        is_available: bool = True,
        min_price: Decimal | None = None,
        max_price: Decimal | None = None,
    ) -> list[Product]:

        statement = (
            select(Product)
            .options(
                selectinload(Product.category),
                selectinload(Product.images),
            )
        )

        filters = []

        filters.append(
            Product.is_available.is_(is_available)
        )

        if category_id is not None:
            filters.append(
                Product.category_id == category_id
            )

        if search:

            keyword = f"%{search}%"

            filters.append(
                or_(
                    Product.name.ilike(keyword),
                    Product.description.ilike(keyword),
                )
            )

        if is_featured is not None:

            filters.append(
                Product.is_featured.is_(is_featured)
            )

        if is_best_seller is not None:

            filters.append(
                Product.is_best_seller.is_(is_best_seller)
            )
            
        if is_veg is not None:

            filters.append(
                Product.is_veg.is_(is_veg)
            )

        if min_price is not None:

            filters.append(
                Product.price >= min_price
            )

        if max_price is not None:

            filters.append(
                Product.price <= max_price
            )

        statement = statement.where(and_(*filters))

        if sort == "newest":

            statement = statement.order_by(
                Product.created_at.desc()
            )

        elif sort == "oldest":

            statement = statement.order_by(
                Product.created_at.asc()
            )

        elif sort == "price_low":

            statement = statement.order_by(
                Product.price.asc()
            )

        elif sort == "price_high":

            statement = statement.order_by(
                Product.price.desc()
            )

        elif sort == "name":

            statement = statement.order_by(
                Product.name.asc()
            )

        else:

            statement = statement.order_by(
                Product.display_order.asc(),
                Product.name.asc(),
            )

        return list(
            db.scalars(statement)
        )

        print("=" * 70 + "\n")

        return products

    # ==========================================================
    # Get Featured Products
    # ==========================================================

    def get_featured_products(
        self,
        db: Session,
        limit: int | None = None,
    ) -> list[Product]:

        statement = (
            select(Product)
            .options(
                selectinload(Product.images),
            )
            .where(
                Product.is_available.is_(True),
                Product.is_featured.is_(True),
            )
            .order_by(
                Product.display_order,
            )
        )

        if limit:
            statement = statement.limit(limit)

        return list(db.scalars(statement))

    # ==========================================================
    # Get Best Sellers
    # ==========================================================

    def get_best_sellers(
        self,
        db: Session,
        limit: int | None = None,
    ) -> list[Product]:

        statement = (
            select(Product)
            .options(
                selectinload(Product.images),
            )
            .where(
                Product.is_available.is_(True),
                Product.is_best_seller.is_(True),
            )
            .order_by(
                Product.display_order,
            )
        )

        if limit:
            statement = statement.limit(limit)

        return list(db.scalars(statement))

    # ==========================================================
    # Get Products By Category
    # ==========================================================

    def get_by_category(
        self,
        db: Session,
        category_id: int,
    ) -> list[Product]:

        statement = (
            select(Product)
            .options(
                selectinload(Product.images),
            )
            .where(
                Product.category_id == category_id,
                Product.is_available.is_(True),
            )
            .order_by(
                Product.display_order,
                Product.name,
            )
        )

        return list(db.scalars(statement))

    # ==========================================================
    # Search Products
    # ==========================================================

    def search(
        self,
        db: Session,
        keyword: str,
    ) -> list[Product]:

        keyword = f"%{keyword}%"

        statement = (
            select(Product)
            .options(
                selectinload(Product.images),
            )
            .where(
                and_(
                    Product.is_available.is_(True),
                    or_(
                        Product.name.ilike(keyword),
                        Product.description.ilike(keyword),
                    ),
                )
            )
            .order_by(
                Product.display_order,
                Product.name,
            )
        )

        return list(db.scalars(statement))

    # ==========================================================
    # Products In Price Range
    # ==========================================================

    def get_by_price_range(
        self,
        db: Session,
        minimum: Decimal,
        maximum: Decimal,
    ) -> list[Product]:

        statement = (
            select(Product)
            .options(
                selectinload(Product.images),
            )
            .where(
                Product.price.between(
                    minimum,
                    maximum,
                ),
                Product.is_available.is_(True),
            )
            .order_by(
                Product.price,
            )
        )

        return list(db.scalars(statement))

    # ==========================================================
    # Admin Product Listing
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
        
    ) -> tuple[list[Product], int]:

        statement = (
            select(Product)
            .options(
                selectinload(Product.category),
                selectinload(Product.images),
                selectinload(Product.reviews)
            )
        )

        count_statement = select(
            func.count(Product.id)
        )

        filters = []

        if search:
            keyword = f"%{search}%"

            filters.append(
                or_(
                    Product.name.ilike(keyword),
                    Product.description.ilike(keyword),
                    Product.slug.ilike(keyword),
                )
            )

        if category_id is not None:
            filters.append(
                Product.category_id == category_id
            )
            
        if is_veg is not None:

            filters.append(
                Product.is_veg.is_(is_veg)
            )

        if is_available is not None:
            filters.append(
                Product.is_available.is_(
                    is_available
                )
            )

        if is_featured is not None:
            filters.append(
                Product.is_featured.is_(
                    is_featured
                )
            )

        if is_best_seller is not None:
            filters.append(
                Product.is_best_seller.is_(
                    is_best_seller
                )
            )

        if filters:
            statement = statement.where(
                and_(*filters)
            )

            count_statement = (
                count_statement.where(
                    and_(*filters)
                )
            )

        if sort == "newest":

            statement = statement.order_by(
                Product.created_at.desc()
            )

        elif sort == "oldest":

            statement = statement.order_by(
                Product.created_at.asc()
            )

        elif sort == "price_low":

            statement = statement.order_by(
                Product.price.asc()
            )

        elif sort == "price_high":

            statement = statement.order_by(
                Product.price.desc()
            )

        elif sort == "name":

            statement = statement.order_by(
                Product.name.asc()
            )

        else:

            statement = statement.order_by(
                Product.display_order.asc(),
                Product.name.asc(),
            )

        statement = (
            statement
            .offset(
                (page - 1) * page_size
            )
            .limit(page_size)
        )

        products = list(
            db.scalars(statement)
        )

        total = db.scalar(
            count_statement
        ) or 0

        # ======================================================
        # DEBUG
        # ======================================================

        print("\n" + "=" * 70)
        print("ADMIN PRODUCTS QUERY")
        print(f"Products Found: {len(products)}")
        print(f"Total Count: {total}")

        for product in products:
            print(
                f"ID={product.id} | "
                f"Name={product.name} | "
                f"Available={product.is_available}"
            )

        print("=" * 70 + "\n")

        return products, total
    
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

    # ==========================================================
    # SKU Exists
    # ==========================================================

    def sku_exists(
        self,
        db: Session,
        sku: str,
    ) -> bool:

        return (
            self.get_by_sku(
                db,
                sku,
            )
            is not None
        )


product_repository = ProductRepository()