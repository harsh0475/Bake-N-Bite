from __future__ import annotations

from datetime import datetime

from pydantic import BaseModel, ConfigDict


# ==========================================================
# Product Image Response
# ==========================================================

class ProductImageResponse(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
    )

    id: int

    product_id: int

    image_url: str

    alt_text: str | None = None

    display_order: int

    is_primary: bool

    created_at: datetime

    updated_at: datetime


# ==========================================================
# Set Primary Image
# ==========================================================

class SetPrimaryImage(BaseModel):
    image_id: int


# ==========================================================
# Update Display Order
# ==========================================================

class UpdateImageOrder(BaseModel):
    display_order: int


# ==========================================================
# Multiple Upload Response
# ==========================================================

class ProductImagesResponse(BaseModel):
    images: list[ProductImageResponse]