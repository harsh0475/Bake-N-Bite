from __future__ import annotations

from pydantic import BaseModel, EmailStr, Field


# ==========================================================
# Contact Message
# ==========================================================

class ContactMessageRequest(BaseModel):
    name: str = Field(
        ...,
        min_length=2,
        max_length=100,
    )

    email: EmailStr

    phone: str | None = Field(
        default=None,
        max_length=15,
    )

    subject: str = Field(
        ...,
        min_length=2,
        max_length=150,
    )

    message: str = Field(
        ...,
        min_length=10,
        max_length=2000,
    )


# ==========================================================
# Generic Message Response
# ==========================================================

class ContactMessageResponse(BaseModel):
    message: str