from __future__ import annotations

from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel, ConfigDict, Field

from app.db.models.payment import (
    PaymentMethod,
    PaymentStatus,
)


# ==========================================================
# Create Payment
# ==========================================================

class PaymentCreate(BaseModel):
    order_id: int

    payment_method: PaymentMethod

    gateway_name: str | None = None

    gateway_order_id: str | None = None


# ==========================================================
# Razorpay Verification
# ==========================================================

class RazorpayVerification(BaseModel):
    razorpay_order_id: str

    razorpay_payment_id: str

    razorpay_signature: str


# ==========================================================
# Change Payment Method
# ==========================================================

class ChangePaymentMethod(BaseModel):
    payment_method: PaymentMethod


# ==========================================================
# Update Payment Status
# ==========================================================

class PaymentStatusUpdate(BaseModel):
    payment_status: PaymentStatus

    failure_reason: str | None = Field(
        default=None,
        max_length=1000,
    )


# ==========================================================
# Refund Request (Future)
# ==========================================================

class RefundRequest(BaseModel):
    reason: str | None = Field(
        default=None,
        max_length=500,
    )


# ==========================================================
# Payment Summary
# ==========================================================

class PaymentSummary(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
    )

    id: int

    order_id: int

    amount: Decimal

    payment_method: PaymentMethod

    payment_status: PaymentStatus


# ==========================================================
# Payment Response
# ==========================================================

class PaymentResponse(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
    )

    id: int

    order_id: int

    amount: Decimal

    payment_method: PaymentMethod

    payment_status: PaymentStatus

    gateway_name: str | None

    gateway_order_id: str | None

    gateway_payment_id: str | None

    gateway_transaction_id: str | None

    failure_reason: str | None

    paid_at: datetime | None

    created_at: datetime

    updated_at: datetime