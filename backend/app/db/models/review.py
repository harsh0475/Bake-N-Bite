from __future__ import annotations

from typing import TYPE_CHECKING

from sqlalchemy import (
    Boolean,
    CheckConstraint,
    ForeignKey,
    Integer,
    String,
    Text,
    UniqueConstraint,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base_model import BaseModel

if TYPE_CHECKING:
    from app.db.models.product import Product
    from app.db.models.user import User


class Review(BaseModel):
    __tablename__ = "reviews"

    __table_args__ = (
        CheckConstraint(
            "rating BETWEEN 1 AND 5",
            name="ck_review_rating",
        ),
        UniqueConstraint(
            "user_id",
            "product_id",
            name="uq_user_product_review",
        ),
    )

    # ==========================================================
    # Primary Key
    # ==========================================================

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True,
    )

    # ==========================================================
    # Foreign Keys
    # ==========================================================

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
        comment="User who submitted the review",
    )

    product_id: Mapped[int] = mapped_column(
        ForeignKey("products.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
        comment="Reviewed product",
    )

    # ==========================================================
    # Review Details
    # ==========================================================

    rating: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        comment="Rating from 1 to 5",
    )

    title: Mapped[str | None] = mapped_column(
        String(150),
        nullable=True,
    )

    comment: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    # ==========================================================
    # Review Status
    # ==========================================================

    is_verified_purchase: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False,
        comment="True if the review belongs to a completed order",
    )

    is_visible: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
        nullable=False,
        comment="Controls whether the review is visible to customers",
    )

    admin_reply: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    # ==========================================================
    # Relationships
    # ==========================================================

    user: Mapped["User"] = relationship(
        back_populates="reviews",
        lazy="selectin",
    )

    product: Mapped["Product"] = relationship(
        back_populates="reviews",
        lazy="selectin",
    )

    # ==========================================================
    # Computed Properties
    # ==========================================================

    @property
    def product_name(self) -> str:
        return self.product.name

    @property
    def full_name(self) -> str:
        return self.user.full_name

    # ==========================================================
    # Representation
    # ==========================================================

    def __repr__(self) -> str:
        return (
            f"<Review("
            f"id={self.id}, "
            f"rating={self.rating}, "
            f"user_id={self.user_id}, "
            f"product_id={self.product_id})>"
        )