from __future__ import annotations

from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel, ConfigDict, Field

from app.db.models.address import AddressType


# ==========================================================
# Base Schema
# ==========================================================

class AddressBase(BaseModel):
    full_name: str = Field(
        ...,
        min_length=2,
        max_length=100,
    )

    phone: str = Field(
        ...,
        min_length=10,
        max_length=20,
    )

    address_line_1: str = Field(
        ...,
        min_length=5,
        max_length=255,
    )

    address_line_2: str | None = Field(
        default=None,
        max_length=255,
    )

    landmark: str | None = Field(
        default=None,
        max_length=255,
    )

    city: str = Field(
        ...,
        min_length=2,
        max_length=100,
    )

    state: str = Field(
        ...,
        min_length=2,
        max_length=100,
    )

    postal_code: str = Field(
        ...,
        min_length=4,
        max_length=20,
    )

    latitude: Decimal | None = None

    longitude: Decimal | None = None

    address_type: AddressType = AddressType.HOME

    is_default: bool = False


# ==========================================================
# Create Address
# ==========================================================

class AddressCreate(AddressBase):
    pass


# ==========================================================
# Update Address
# ==========================================================

class AddressUpdate(BaseModel):
    full_name: str | None = Field(
        default=None,
        min_length=2,
        max_length=100,
    )

    phone: str | None = Field(
        default=None,
        min_length=10,
        max_length=20,
    )

    address_line_1: str | None = Field(
        default=None,
        min_length=5,
        max_length=255,
    )

    address_line_2: str | None = Field(
        default=None,
        max_length=255,
    )

    landmark: str | None = Field(
        default=None,
        max_length=255,
    )

    city: str | None = Field(
        default=None,
        min_length=2,
        max_length=100,
    )

    state: str | None = Field(
        default=None,
        min_length=2,
        max_length=100,
    )

    postal_code: str | None = Field(
        default=None,
        min_length=4,
        max_length=20,
    )

    latitude: Decimal | None = None

    longitude: Decimal | None = None

    address_type: AddressType | None = None

    is_default: bool | None = None


# ==========================================================
# Address Response
# ==========================================================

class AddressResponse(AddressBase):
    model_config = ConfigDict(
        from_attributes=True,
    )

    id: int

    user_id: int

    created_at: datetime

    updated_at: datetime


# ==========================================================
# Address Summary
# ==========================================================

class AddressSummary(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
    )

    id: int

    full_name: str

    phone: str

    address_line_1: str

    city: str

    state: str

    postal_code: str

    address_type: AddressType

    is_default: bool