from __future__ import annotations

from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel, ConfigDict, Field

from app.db.models.order import (
    DeliveryMethod,
    OrderStatus,
    PaymentStatus,
)
from app.db.models.payment import PaymentMethod


# ==========================================================
# Checkout Request
# ==========================================================

class CheckoutRequest(BaseModel):
    address_id: int

    delivery_method: DeliveryMethod = (
        DeliveryMethod.HOME_DELIVERY
    )

    payment_method: PaymentMethod

    customer_note: str | None = Field(
        default=None,
        max_length=1000,
    )


# ==========================================================
# Update Order Status
# ==========================================================

class UpdateOrderStatus(BaseModel):
    status: OrderStatus


# ==========================================================
# Update Payment Status
# ==========================================================

class UpdatePaymentStatus(BaseModel):
    payment_status: PaymentStatus


# ==========================================================
# Order Item
# ==========================================================

class OrderItemResponse(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
    )

    id: int

    product_id: int | None

    product_name: str

    unit_price: Decimal

    quantity: int

    subtotal: Decimal


# ==========================================================
# Payment Summary
# ==========================================================

class PaymentSummary(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
    )

    payment_method: PaymentMethod

    payment_status: PaymentStatus

    gateway_name: str | None

    gateway_order_id: str | None

    gateway_payment_id: str | None

    gateway_transaction_id: str | None

    paid_at: datetime | None


# ==========================================================
# Order Summary
# ==========================================================

class OrderSummary(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
    )

    id: int

    user_id: int

    order_number: str
    
    delivery_name: str 

    status: OrderStatus

    payment_status: PaymentStatus

    grand_total: Decimal

    created_at: datetime


# ==========================================================
# Complete Order Response
# ==========================================================

class OrderResponse(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
    )

    id: int

    user_id: int

    order_number: str

    status: OrderStatus

    payment_status: PaymentStatus

    delivery_method: DeliveryMethod

    # ==========================================================
    # Customer
    # ==========================================================

    delivery_name: str

    delivery_phone: str

    delivery_address_line_1: str

    delivery_address_line_2: str | None

    delivery_landmark: str | None

    delivery_city: str

    delivery_state: str

    delivery_postal_code: str

    # ==========================================================
    # Pricing
    # ==========================================================

    subtotal: Decimal

    delivery_charge: Decimal

    packaging_charge: Decimal

    discount: Decimal

    grand_total: Decimal

    # ==========================================================
    # Notes
    # ==========================================================

    customer_note: str | None

    admin_note: str | None

    estimated_delivery_time: datetime | None

    # ==========================================================
    # Payment
    # ==========================================================

    payment: PaymentSummary | None = None

    # ==========================================================
    # Items
    # ==========================================================

    order_items: list[
        OrderItemResponse
    ] = Field(
        default_factory=list,
    )

    created_at: datetime

    updated_at: datetime