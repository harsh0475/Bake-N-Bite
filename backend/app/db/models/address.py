from __future__ import annotations

from enum import Enum
from typing import TYPE_CHECKING

from sqlalchemy import Boolean, Enum as SqlEnum, ForeignKey, Numeric, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base_model import BaseModel

if TYPE_CHECKING:
    from app.db.models.user import User


class AddressType(str, Enum):
    HOME = "home"
    WORK = "work"
    OTHER = "other"


class Address(BaseModel):
    __tablename__ = "addresses"

    # ==========================================================
    # Primary Key
    # ==========================================================

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True,
    )

    # ==========================================================
    # Foreign Key
    # ==========================================================

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
        comment="Owner of the address",
    )

    # ==========================================================
    # Contact Information
    # ==========================================================

    full_name: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    phone: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
    )

    # ==========================================================
    # Address Details
    # ==========================================================

    address_line_1: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    address_line_2: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,
    )

    landmark: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,
    )

    city: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    state: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    postal_code: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
    )

    # ==========================================================
    # Location (Optional)
    # ==========================================================

    latitude: Mapped[float | None] = mapped_column(
        Numeric(10, 7),
        nullable=True,
    )

    longitude: Mapped[float | None] = mapped_column(
        Numeric(10, 7),
        nullable=True,
    )

    # ==========================================================
    # Address Settings
    # ==========================================================

    address_type: Mapped[AddressType] = mapped_column(
        SqlEnum(
            AddressType,
            name="address_type_enum",
        ),
        default=AddressType.HOME,
        nullable=False,
    )

    is_default: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False,
    )

    # ==========================================================
    # Relationships
    # ==========================================================

    user: Mapped["User"] = relationship(
        back_populates="addresses",
        lazy="selectin",
    )

    def __repr__(self) -> str:
        return (
            f"Address("
            f"id={self.id}, "
            f"city='{self.city}', "
            f"user_id={self.user_id}"
            f")"
        )