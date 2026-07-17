from __future__ import annotations

from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field

from app.schemas.user import UserPublic


# ==========================================================
# Create Review
# ==========================================================

class ReviewCreate(BaseModel):
    product_id: int

    rating: int = Field(
        ...,
        ge=1,
        le=5,
    )

    title: str | None = Field(
        default=None,
        max_length=150,
    )

    comment: str | None = Field(
        default=None,
        max_length=2000,
    )


# ==========================================================
# Update Review
# ==========================================================

class ReviewUpdate(BaseModel):
    rating: int | None = Field(
        default=None,
        ge=1,
        le=5,
    )

    title: str | None = Field(
        default=None,
        max_length=150,
    )

    comment: str | None = Field(
        default=None,
        max_length=2000,
    )


# ==========================================================
# Admin Reply
# ==========================================================

class AdminReplyUpdate(BaseModel):
    admin_reply: str = Field(
        ...,
        max_length=2000,
    )


# ==========================================================
# Review Summary
# ==========================================================

class ReviewSummary(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
    )

    id: int

    rating: int

    title: str | None

    comment: str | None

    full_name: str

    is_verified_purchase: bool

    created_at: datetime


# ==========================================================
# Review Response
# ==========================================================

class ReviewResponse(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
    )

    id: int

    product_id: int

    product_name: str

    rating: int

    title: str | None

    comment: str | None

    admin_reply: str | None

    is_verified_purchase: bool

    is_visible: bool

    created_at: datetime

    updated_at: datetime

    user: UserPublic