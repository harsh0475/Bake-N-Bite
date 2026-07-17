from __future__ import annotations

from datetime import datetime
from decimal import Decimal
from enum import Enum
from typing import TYPE_CHECKING

from sqlalchemy import (
    CheckConstraint,
    DateTime,
    Enum as SqlEnum,
    ForeignKey,
    Numeric,
    String,
    Text,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base_model import BaseModel

if TYPE_CHECKING:
    from app.db.models.order_item import OrderItem
    from app.db.models.payment import Payment
    from app.db.models.user import User


class OrderStatus(str, Enum):
    PENDING = "Pending"
    CONFIRMED = "Confirmed"
    PREPARING = "Preparing"
    READY = "Ready"
    OUT_FOR_DELIVERY = "Out For Delivery"
    DELIVERED = "Delivered"
    CANCELLED = "Cancelled"


class PaymentStatus(str, Enum):
    PENDING = "Pending"
    PAID = "Paid"
    FAILED = "Failed"
    REFUNDED = "Refunded"


class DeliveryMethod(str, Enum):
    HOME_DELIVERY = "Home Delivery"
    PICKUP = "Pickup"


class Order(BaseModel):
    __tablename__ = "orders"

    __table_args__ = (
        CheckConstraint(
            "subtotal >= 0",
            name="ck_order_subtotal_positive",
        ),
        CheckConstraint(
            "delivery_charge >= 0",
            name="ck_order_delivery_charge_positive",
        ),
        CheckConstraint(
            "packaging_charge >= 0",
            name="ck_order_packaging_charge_positive",
        ),
        CheckConstraint(
            "discount >= 0",
            name="ck_order_discount_positive",
        ),
        CheckConstraint(
            "grand_total >= 0",
            name="ck_order_grand_total_positive",
        ),
    )

    # ==========================================================
    # Primary Key
    # ==========================================================

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True,
    )

    order_number: Mapped[str] = mapped_column(
        String(30),
        unique=True,
        nullable=False,
        index=True,
        comment="Unique order number",
    )

    # ==========================================================
    # Customer
    # ==========================================================

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    # ==========================================================
    # Delivery Address Snapshot
    # ==========================================================

    delivery_name: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    delivery_phone: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
    )

    delivery_address_line_1: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    delivery_address_line_2: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,
    )

    delivery_landmark: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,
    )

    delivery_city: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    delivery_state: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    delivery_postal_code: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
    )

    # ==========================================================
    # Order Status
    # ==========================================================

    status: Mapped[OrderStatus] = mapped_column(
        SqlEnum(OrderStatus, name="order_status_enum"),
        default=OrderStatus.PENDING,
        nullable=False,
    )

    payment_status: Mapped[PaymentStatus] = mapped_column(
        SqlEnum(PaymentStatus, name="payment_status_enum"),
        default=PaymentStatus.PENDING,
        nullable=False,
    )

    delivery_method: Mapped[DeliveryMethod] = mapped_column(
        SqlEnum(DeliveryMethod, name="delivery_method_enum"),
        default=DeliveryMethod.HOME_DELIVERY,
        nullable=False,
    )

    # ==========================================================
    # Pricing
    # ==========================================================

    subtotal: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        nullable=False,
    )

    delivery_charge: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        default=0,
        nullable=False,
    )

    packaging_charge: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        default=0,
        nullable=False,
    )

    discount: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        default=0,
        nullable=False,
    )

    grand_total: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        nullable=False,
    )

    # ==========================================================
    # Notes
    # ==========================================================

    customer_note: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    admin_note: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    estimated_delivery_time: Mapped[datetime | None] = mapped_column(
        DateTime,
        nullable=True,
    )

    # ==========================================================
    # Relationships
    # ==========================================================

    user: Mapped["User"] = relationship(
        back_populates="orders",
        lazy="selectin",
    )

    order_items: Mapped[list["OrderItem"]] = relationship(
        back_populates="order",
        cascade="all, delete-orphan",
        lazy="selectin",
    )

    payment: Mapped["Payment"] = relationship(
        back_populates="order",
        uselist=False,
        cascade="all, delete-orphan",
        lazy="selectin",
    )

    def __repr__(self) -> str:
        return (
            f"Order("
            f"id={self.id}, "
            f"order_number='{self.order_number}', "
            f"status='{self.status.value}'"
            f")"
        )