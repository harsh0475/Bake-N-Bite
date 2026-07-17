from __future__ import annotations

from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


# ==========================================================
# Base Schema
# ==========================================================

class CategoryBase(BaseModel):
    name: str = Field(
        ...,
        min_length=2,
        max_length=100,
    )

    slug: str = Field(
        ...,
        min_length=2,
        max_length=120,
    )

    description: str | None = Field(
        default=None,
        max_length=500,
    )

    image: str | None = None

    display_order: int = Field(
        default=0,
        ge=0,
    )

    is_active: bool = True

    show_on_homepage: bool = True


# ==========================================================
# Create Category
# ==========================================================

class CategoryCreate(CategoryBase):
    pass


# ==========================================================
# Update Category
# ==========================================================

class CategoryUpdate(BaseModel):
    name: str | None = Field(
        default=None,
        min_length=2,
        max_length=100,
    )

    slug: str | None = Field(
        default=None,
        min_length=2,
        max_length=120,
    )

    description: str | None = Field(
        default=None,
        max_length=500,
    )

    image: str | None = None

    display_order: int | None = Field(
        default=None,
        ge=0,
    )

    is_active: bool | None = None

    show_on_homepage: bool | None = None


# ==========================================================
# Category Response
# ==========================================================

class CategoryResponse(CategoryBase):
    model_config = ConfigDict(
        from_attributes=True,
    )

    id: int

    created_at: datetime

    updated_at: datetime


# ==========================================================
# Category Summary
# ==========================================================

class CategorySummary(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
    )

    id: int

    name: str

    slug: str

    image: str | None