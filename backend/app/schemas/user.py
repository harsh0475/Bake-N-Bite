from __future__ import annotations

from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field

from app.db.models.user import UserRole


# ==========================================================
# Base Schema
# ==========================================================

class UserBase(BaseModel):
    full_name: str = Field(
        ...,
        min_length=2,
        max_length=100,
    )

    email: EmailStr

    phone: str | None = Field(
        default=None,
        min_length=10,
        max_length=15,
    )


# ==========================================================
# Create User
# ==========================================================

class UserCreate(UserBase):
    phone: str = Field(
        ...,
        min_length=10,
        max_length=15,
    )

    password: str = Field(
        ...,
        min_length=8,
        max_length=128,
    )


# ==========================================================
# Update Profile
# ==========================================================

class UserUpdate(BaseModel):
    full_name: str | None = Field(
        default=None,
        min_length=2,
        max_length=100,
    )

    phone: str | None = Field(
        default=None,
        min_length=10,
        max_length=15,
    )


# ==========================================================
# Change Password
# ==========================================================

class ChangePassword(BaseModel):
    current_password: str

    new_password: str = Field(
        min_length=8,
        max_length=128,
    )


# ==========================================================
# Admin Update User
# ==========================================================

class AdminUserUpdate(BaseModel):
    role: UserRole | None = None

    is_active: bool | None = None

    is_verified: bool | None = None


# ==========================================================
# User Response
# ==========================================================

class UserResponse(UserBase):
    model_config = ConfigDict(
        from_attributes=True,
    )

    id: int

    role: UserRole

    is_active: bool

    is_verified: bool

    created_at: datetime

    updated_at: datetime


# ==========================================================
# User Profile
# ==========================================================

class UserProfile(UserResponse):
    """
    Returned when a user views their own profile.
    """

    pass


# ==========================================================
# Public User
# ==========================================================

class UserPublic(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
    )

    id: int

    full_name: str


# ==========================================================
# Login
# ==========================================================

class UserLogin(BaseModel):
    email: EmailStr

    password: str