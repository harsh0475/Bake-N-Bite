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
    from app.db.models.order import Order


class PaymentMethod(str, Enum):
    COD = "Cash On Delivery"
    UPI = "UPI"
    RAZORPAY = "Razorpay"


class PaymentStatus(str, Enum):
    PENDING = "Pending"
    PAID = "Paid"
    FAILED = "Failed"
    REFUNDED = "Refunded"


class Payment(BaseModel):
    __tablename__ = "payments"

    __table_args__ = (
        CheckConstraint(
            "amount >= 0",
            name="ck_payment_amount_positive",
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
    # Foreign Key
    # ==========================================================

    order_id: Mapped[int] = mapped_column(
        ForeignKey("orders.id", ondelete="CASCADE"),
        unique=True,
        nullable=False,
        index=True,
        comment="Associated order",
    )

    # ==========================================================
    # Payment Details
    # ==========================================================

    amount: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        nullable=False,
        comment="Amount paid for the order",
    )

    payment_method: Mapped[PaymentMethod] = mapped_column(
        SqlEnum(
            PaymentMethod,
            name="payment_method_enum",
        ),
        nullable=False,
    )

    payment_status: Mapped[PaymentStatus] = mapped_column(
        SqlEnum(
            PaymentStatus,
            name="payment_record_status_enum",
        ),
        default=PaymentStatus.PENDING,
        nullable=False,
    )

    # ==========================================================
    # Gateway Details
    # ==========================================================

    gateway_name: Mapped[str | None] = mapped_column(
        String(50),
        nullable=True,
        comment="Payment gateway name (e.g. Razorpay)",
    )

    gateway_order_id: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,
    )

    gateway_payment_id: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,
    )

    gateway_transaction_id: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,
    )

    failure_reason: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    paid_at: Mapped[datetime | None] = mapped_column(
        DateTime,
        nullable=True,
    )

    # ==========================================================
    # Relationships
    # ==========================================================

    order: Mapped["Order"] = relationship(
        back_populates="payment",
        lazy="selectin",
    )

    def __repr__(self) -> str:
        return (
            f"Payment("
            f"id={self.id}, "
            f"order_id={self.order_id}, "
            f"status='{self.payment_status.value}'"
            f")"
        )