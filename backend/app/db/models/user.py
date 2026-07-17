from __future__ import annotations

from datetime import datetime
from enum import Enum
from typing import TYPE_CHECKING

from sqlalchemy import Boolean, DateTime, Enum as SqlEnum, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base_model import BaseModel

if TYPE_CHECKING:
    from app.db.models.address import Address
    from app.db.models.cart import Cart
    from app.db.models.order import Order
    from app.db.models.review import Review


class UserRole(str, Enum):
    CUSTOMER = "customer"
    ADMIN = "admin"


class User(BaseModel):
    __tablename__ = "users"

    # ==========================================
    # Primary Key
    # ==========================================

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True,
    )

    # ==========================================
    # Personal Information
    # ==========================================

    full_name: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    email: Mapped[str] = mapped_column(
        String(320),
        unique=True,
        nullable=False,
        index=True,
        comment="User email address",
    )

    phone: Mapped[str | None] = mapped_column(
        String(15),
        unique=True,
        nullable=True,
    )

    # ==========================================
    # Authentication
    # ==========================================

    hashed_password: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,
    )

    role: Mapped[UserRole] = mapped_column(
        SqlEnum(UserRole),
        default=UserRole.CUSTOMER,
        nullable=False,
    )

    # ==========================================
    # Google Sign-In
    # ==========================================

    google_id: Mapped[str | None] = mapped_column(
        String(255),
        unique=True,
        nullable=True,
        index=True,
    )

    # ==========================================
    # Password Reset
    # ==========================================

    reset_token: Mapped[str | None] = mapped_column(
        String(255),
        unique=True,
        nullable=True,
        index=True,
    )

    reset_token_expires: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )

    # ==========================================
    # Account Status
    # ==========================================

    is_active: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
        nullable=False,
    )

    is_verified: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False,
    )

    # ==========================================
    # Relationships
    # ==========================================

    addresses: Mapped[list["Address"]] = relationship(
        back_populates="user",
        cascade="all, delete-orphan",
        lazy="selectin",
    )

    cart: Mapped["Cart"] = relationship(
        back_populates="user",
        uselist=False,
        cascade="all, delete-orphan",
    )

    orders: Mapped[list["Order"]] = relationship(
        back_populates="user",
        cascade="all, delete-orphan",
    )

    reviews: Mapped[list["Review"]] = relationship(
        back_populates="user",
        cascade="all, delete-orphan",
    )

    def __repr__(self) -> str:
        return (
            f"User("
            f"id={self.id}, "
            f"email='{self.email}', "
            f"role='{self.role.value}'"
            f")"
        )