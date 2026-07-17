from __future__ import annotations

from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel, ConfigDict, Field

from app.db.models.product import SpiceLevel


# ==========================================================
# Product Image Response
# ==========================================================

class ProductImageResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    image_url: str
    alt_text: str | None
    is_primary: bool
    display_order: int


# ==========================================================
# Category Summary
# ==========================================================

class ProductCategory(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    slug: str


# ==========================================================
# Base Schema
# ==========================================================

class ProductBase(BaseModel):
    category_id: int

    name: str = Field(
        ...,
        min_length=2,
        max_length=150,
    )

    slug: str = Field(
        ...,
        min_length=2,
        max_length=170,
    )

    description: str | None = None

    price: Decimal = Field(
        ...,
        ge=0,
    )

    discount_price: Decimal | None = Field(
        default=None,
        ge=0,
    )

    is_veg: bool = True

    spice_level: SpiceLevel = SpiceLevel.NONE

    prep_time: int = Field(
        default=20,
        ge=1,
    )

    is_available: bool = True

    is_featured: bool = False

    is_best_seller: bool = False

    display_order: int = Field(
        default=0,
        ge=0,
    )


# ==========================================================
# Create Product
# ==========================================================

class ProductCreate(ProductBase):
    pass


# ==========================================================
# Update Product
# ==========================================================

class ProductUpdate(BaseModel):
    category_id: int | None = None

    name: str | None = Field(
        default=None,
        min_length=2,
        max_length=150,
    )

    slug: str | None = Field(
        default=None,
        min_length=2,
        max_length=170,
    )

    description: str | None = None

    price: Decimal | None = Field(
        default=None,
        ge=0,
    )

    discount_price: Decimal | None = Field(
        default=None,
        ge=0,
    )

    is_veg: bool | None = None

    spice_level: SpiceLevel | None = None

    prep_time: int | None = Field(
        default=None,
        ge=1,
    )

    is_available: bool | None = None

    is_featured: bool | None = None

    is_best_seller: bool | None = None

    display_order: int | None = Field(
        default=None,
        ge=0,
    )


# ==========================================================
# Product Response
# ==========================================================

class ProductResponse(ProductBase):
    model_config = ConfigDict(from_attributes=True)

    id: int

    average_rating: Decimal

    total_reviews: int

    created_at: datetime

    updated_at: datetime

    category: ProductCategory | None = None

    images: list[ProductImageResponse] = Field(default_factory=list)

# ==========================================================
# Product Card
# ==========================================================

class ProductCard(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int

    name: str

    slug: str

    description: str | None = None

    price: Decimal

    discount_price: Decimal | None

    is_veg: bool

    is_available: bool

    is_featured: bool = False

    is_best_seller: bool = False

    prep_time: int

    average_rating: Decimal

    total_reviews: int

    category: ProductCategory | None = None

    images: list[ProductImageResponse] = Field(default_factory=list)


# ==========================================================
# Product Detail
# ==========================================================

class ProductDetail(ProductResponse):
    category: ProductCategory | None = None
    
    
# ==========================================================
# Admin Product List Response
# ==========================================================

class AdminProductListResponse(BaseModel):
    items: list[ProductResponse]

    page: int

    page_size: int

    total: int

    total_pages: int


# ==========================================================
# Product Delete Response
# ==========================================================

class ProductDeleteResponse(BaseModel):
    message: str