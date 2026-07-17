from __future__ import annotations

from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel, ConfigDict, Field


# ==========================================================
# Add Item To Cart
# ==========================================================

class CartItemCreate(BaseModel):
    product_id: int

    quantity: int = Field(
        default=1,
        ge=1,
    )


# ==========================================================
# Update Cart Item
# ==========================================================

class CartItemUpdate(BaseModel):
    quantity: int = Field(
        ...,
        ge=1,
    )


# ==========================================================
# Cart Item Response
# ==========================================================

class CartItemResponse(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
    )

    id: int

    product_id: int

    product_name: str

    product_slug: str

    product_image: str | None

    unit_price: Decimal

    quantity: int

    subtotal: Decimal


# ==========================================================
# Cart Response
# ==========================================================

class CartResponse(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
    )

    id: int

    user_id: int

    items: list[CartItemResponse] = Field(
        default_factory=list,
    )

    total_items: int

    subtotal: Decimal

    delivery_charge: Decimal

    packaging_charge: Decimal

    discount: Decimal

    grand_total: Decimal

    created_at: datetime

    updated_at: datetime


# ==========================================================
# Cart Summary
# ==========================================================

class CartSummary(BaseModel):
    total_items: int

    grand_total: Decimal