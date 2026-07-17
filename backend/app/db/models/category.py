from typing import TYPE_CHECKING

from sqlalchemy import Boolean, String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Text
from sqlalchemy import Integer

from app.db.base_model import BaseModel

if TYPE_CHECKING:
    from app.db.models.product import Product


class Category(BaseModel):
    __tablename__ = "categories"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True,
    )

    name: Mapped[str] = mapped_column(
        String(100),
        unique=True,
        nullable=False,
        index=True,
        comment="Category name",
    )

    slug: Mapped[str] = mapped_column(
        String(150),
        unique=True,
        nullable=False,
        index=True,
    )

    description: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    image: Mapped[str | None] = mapped_column(
        String(500),
        nullable=True,
        comment="Cloudinary image URL",
    )

    image_public_id: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,
        comment="Cloudinary public ID",
    )

    is_active: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
        nullable=False,
    )

    products: Mapped[list["Product"]] = relationship(
        back_populates="category",
        cascade="all, delete-orphan",
        lazy="selectin",
    )

    display_order: Mapped[int] = mapped_column(
        Integer,
        default=0,
        nullable=False,
    )

    show_on_homepage: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
        nullable=False,
    )
    
    def __repr__(self) -> str:
        return (
        f"Category("
        f"id={self.id}, "
        f"name='{self.name}'"
        f")"
    )