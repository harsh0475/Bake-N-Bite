from __future__ import annotations

from typing import TYPE_CHECKING

from sqlalchemy import (
    Boolean,
    CheckConstraint,
    ForeignKey,
    Integer,
    String,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base_model import BaseModel

if TYPE_CHECKING:
    from app.db.models.product import Product


class ProductImage(BaseModel):
    __tablename__ = "product_images"

    __table_args__ = (
        CheckConstraint(
            "display_order >= 0",
            name="ck_product_image_display_order_positive",
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
    # Foreign Key
    # ==========================================================

    product_id: Mapped[int] = mapped_column(
        ForeignKey("products.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
        comment="Associated product",
    )

    # ==========================================================
    # Image Information
    # ==========================================================

    image_url: Mapped[str] = mapped_column(
        String(500),
        nullable=False,
        comment="Cloudinary image URL",
    )

    public_id: Mapped[str] = mapped_column(
        String(255),
        nullable=True,
        comment="Cloudinary public id",
    )

    alt_text: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,
        comment="Alternative text for accessibility",
    )

    display_order: Mapped[int] = mapped_column(
        Integer,
        default=0,
        nullable=False,
        comment="Display order of the image",
    )

    is_primary: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False,
        comment="Marks the primary image for the product",
    )

    # ==========================================================
    # Relationships
    # ==========================================================

    product: Mapped["Product"] = relationship(
        back_populates="images",
        lazy="selectin",
    )

    def __repr__(self) -> str:
        return (
            f"ProductImage("
            f"id={self.id}, "
            f"product_id={self.product_id}, "
            f"is_primary={self.is_primary}"
            f")"
        )