from __future__ import annotations

from decimal import Decimal
from typing import TYPE_CHECKING

from sqlalchemy import (
    CheckConstraint,
    ForeignKey,
    Integer,
    Numeric,
    String,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base_model import BaseModel

if TYPE_CHECKING:
    from app.db.models.order import Order
    from app.db.models.product import Product


class OrderItem(BaseModel):
    __tablename__ = "order_items"

    __table_args__ = (
        CheckConstraint(
            "quantity > 0",
            name="ck_order_item_quantity_positive",
        ),
        CheckConstraint(
            "unit_price >= 0",
            name="ck_order_item_unit_price_positive",
        ),
        CheckConstraint(
            "subtotal >= 0",
            name="ck_order_item_subtotal_positive",
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

    order_id: Mapped[int] = mapped_column(
        ForeignKey("orders.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
        comment="Associated order",
    )

    product_id: Mapped[int | None] = mapped_column(
        ForeignKey("products.id", ondelete="SET NULL"),
        nullable=True,
        index=True,
        comment="Original product (nullable to preserve order history)",
    )

    # ==========================================================
    # Product Snapshot
    # ==========================================================

    product_name: Mapped[str] = mapped_column(
        String(150),
        nullable=False,
        comment="Product name at the time of purchase",
    )

    unit_price: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        nullable=False,
        comment="Unit price at the time of purchase",
    )

    quantity: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        comment="Purchased quantity",
    )

    subtotal: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        nullable=False,
        comment="Subtotal for this order item",
    )

    # ==========================================================
    # Relationships
    # ==========================================================

    order: Mapped["Order"] = relationship(
        back_populates="order_items",
        lazy="selectin",
    )

    product: Mapped["Product"] = relationship(
        back_populates="order_items",
        lazy="selectin",
    )

    def __repr__(self) -> str:
        return (
            f"OrderItem("
            f"id={self.id}, "
            f"order_id={self.order_id}, "
            f"product='{self.product_name}', "
            f"quantity={self.quantity}"
            f")"
        )