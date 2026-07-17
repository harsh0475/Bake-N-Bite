from __future__ import annotations

from decimal import Decimal
from enum import Enum
from typing import TYPE_CHECKING

from sqlalchemy import (
    Boolean,
    CheckConstraint,
    Enum as SqlEnum,
    ForeignKey,
    Integer,
    Numeric,
    String,
    Text,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base_model import BaseModel

if TYPE_CHECKING:
    from app.db.models.cart_item import CartItem
    from app.db.models.category import Category
    from app.db.models.order_item import OrderItem
    from app.db.models.product_image import ProductImage
    from app.db.models.review import Review


class SpiceLevel(str, Enum):
    NONE = "None"
    MILD = "Mild"
    MEDIUM = "Medium"
    HOT = "Hot"


class Product(BaseModel):
    __tablename__ = "products"

    __table_args__ = (
        CheckConstraint(
            "price >= 0",
            name="ck_product_price_positive",
        ),
        CheckConstraint(
            "discount_price IS NULL OR discount_price >= 0",
            name="ck_product_discount_price_positive",
        ),
    )

    # ==========================================================
    # Primary Key
    # ==========================================================

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True,
    )

    # ==========================================================
    # Category
    # ==========================================================

    category_id: Mapped[int] = mapped_column(
        ForeignKey("categories.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    category: Mapped["Category"] = relationship(
        back_populates="products",
        lazy="selectin",
    )

    # ==========================================================
    # Product Information
    # ==========================================================

    name: Mapped[str] = mapped_column(
        String(150),
        nullable=False,
        index=True,
    )

    slug: Mapped[str] = mapped_column(
        String(170),
        unique=True,
        nullable=False,
        index=True,
    )

    sku: Mapped[str | None] = mapped_column(
        String(50),
        unique=True,
        nullable=True,
        index=True,
    )

    description: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    # ==========================================================
    # Pricing
    # ==========================================================

    price: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        nullable=False,
    )

    discount_price: Mapped[Decimal | None] = mapped_column(
        Numeric(10, 2),
        nullable=True,
    )

    # ==========================================================
    # Product Details
    # ==========================================================

    is_veg: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
        nullable=False,
    )

    spice_level: Mapped[SpiceLevel] = mapped_column(
        SqlEnum(
            SpiceLevel,
            name="spice_level_enum",
        ),
        default=SpiceLevel.NONE,
        nullable=False,
    )

    prep_time: Mapped[int] = mapped_column(
        Integer,
        default=20,
        nullable=False,
    )

    # ==========================================================
    # Visibility
    # ==========================================================

    is_available: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
        nullable=False,
    )

    is_featured: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False,
    )

    is_best_seller: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False,
    )

    # ==========================================================
    # Cached Rating
    # ==========================================================

    average_rating: Mapped[Decimal] = mapped_column(
        Numeric(3, 2),
        default=0,
        nullable=False,
    )

    total_reviews: Mapped[int] = mapped_column(
        Integer,
        default=0,
        nullable=False,
    )

    # ==========================================================
    # Display
    # ==========================================================

    display_order: Mapped[int] = mapped_column(
        Integer,
        default=0,
        nullable=False,
    )

    # ==========================================================
    # Relationships
    # ==========================================================

    images: Mapped[list["ProductImage"]] = relationship(
        back_populates="product",
        cascade="all, delete-orphan",
        lazy="selectin",
    )

    cart_items: Mapped[list["CartItem"]] = relationship(
        back_populates="product",
        lazy="selectin",
    )

    order_items: Mapped[list["OrderItem"]] = relationship(
        back_populates="product",
        lazy="selectin",
    )

    reviews: Mapped[list["Review"]] = relationship(
        back_populates="product",
        lazy="selectin",
    )

    # ==========================================================
    # Computed Properties
    # ==========================================================

    @property
    def effective_price(self) -> Decimal:
        """
        Returns the actual selling price of the product.
        If a discount price exists, it is returned;
        otherwise the regular price is returned.
        """
        return (
            self.discount_price
            if self.discount_price is not None
            else self.price
        )

    # ==========================================================
    # Representation
    # ==========================================================

    def __repr__(self) -> str:
        return (
            f"<Product("
            f"id={self.id}, "
            f"name='{self.name}', "
            f"price={self.price})>"
        )