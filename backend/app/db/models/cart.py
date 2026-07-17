from __future__ import annotations

from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base_model import BaseModel

if TYPE_CHECKING:
    from app.db.models.cart_item import CartItem
    from app.db.models.user import User


class Cart(BaseModel):
    __tablename__ = "cart"

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
        unique=True,
        nullable=False,
        index=True,
        comment="Owner of the shopping cart",
    )

    # ==========================================================
    # Relationships
    # ==========================================================

    user: Mapped["User"] = relationship(
        back_populates="cart",
        lazy="selectin",
    )

    items: Mapped[list["CartItem"]] = relationship(
        back_populates="cart",
        cascade="all, delete-orphan",
        lazy="selectin",
        order_by="CartItem.id",
    )

    def __repr__(self) -> str:
        return (
            f"Cart("
            f"id={self.id}, "
            f"user_id={self.user_id}"
            f")"
        )