from __future__ import annotations

from decimal import Decimal
from typing import TYPE_CHECKING

from sqlalchemy import (
    CheckConstraint,
    ForeignKey,
    Integer,
    Numeric,
    UniqueConstraint,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base_model import BaseModel

if TYPE_CHECKING:
    from app.db.models.cart import Cart
    from app.db.models.product import Product


class CartItem(BaseModel):
    __tablename__ = "cart_items"

    __table_args__ = (
        UniqueConstraint(
            "cart_id",
            "product_id",
            name="uq_cart_product",
        ),
        CheckConstraint(
            "quantity > 0",
            name="ck_cart_item_quantity_positive",
        ),
        CheckConstraint(
            "unit_price >= 0",
            name="ck_cart_item_price_positive",
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
    # Foreign Keys
    # ==========================================================

    cart_id: Mapped[int] = mapped_column(
        ForeignKey("cart.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
        comment="Associated shopping cart",
    )

    product_id: Mapped[int] = mapped_column(
        ForeignKey("products.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
        comment="Product added to the cart",
    )

    # ==========================================================
    # Cart Item Details
    # ==========================================================

    quantity: Mapped[int] = mapped_column(
        Integer,
        default=1,
        nullable=False,
        comment="Quantity of the product",
    )

    unit_price: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        nullable=False,
        comment="Product price when added to the cart",
    )

    # ==========================================================
    # Relationships
    # ==========================================================

    cart: Mapped["Cart"] = relationship(
        back_populates="items",
        lazy="selectin",
    )

    product: Mapped["Product"] = relationship(
        back_populates="cart_items",
        lazy="selectin",
    )

    def __repr__(self) -> str:
        return (
            f"CartItem("
            f"id={self.id}, "
            f"cart_id={self.cart_id}, "
            f"product_id={self.product_id}, "
            f"quantity={self.quantity}"
            f")"
        )