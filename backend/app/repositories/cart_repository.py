from __future__ import annotations

from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from app.db.models.cart import Cart
from app.db.models.cart_item import CartItem
from app.repositories.base_repository import BaseRepository


class CartRepository(BaseRepository[Cart]):
    """
    Repository for Cart database operations.
    Transaction management is handled by the service layer.
    """

    def __init__(self) -> None:
        super().__init__(Cart)

    # ==========================================================
    # Get Cart By User
    # ==========================================================

    def get_by_user(
        self,
        db: Session,
        user_id: int,
    ) -> Cart | None:

        statement = (
            select(Cart)
            .options(
                selectinload(Cart.items).selectinload(CartItem.product)
            )
            .where(Cart.user_id == user_id)
        )

        return db.scalar(statement)

    # ==========================================================
    # Get Cart Item
    # ==========================================================

    def get_cart_item(
        self,
        db: Session,
        cart_id: int,
        product_id: int,
    ) -> CartItem | None:

        statement = (
            select(CartItem)
            .where(
                CartItem.cart_id == cart_id,
                CartItem.product_id == product_id,
            )
        )

        return db.scalar(statement)

    # ==========================================================
    # Get All Cart Items
    # ==========================================================

    def get_cart_items(
        self,
        db: Session,
        cart_id: int,
    ) -> list[CartItem]:

        statement = (
            select(CartItem)
            .options(
                selectinload(CartItem.product)
            )
            .where(CartItem.cart_id == cart_id)
        )

        return list(db.scalars(statement))

    # ==========================================================
    # Add Item To Cart
    # ==========================================================

    def add_item(
        self,
        db: Session,
        *,
        cart_item: CartItem,
    ) -> CartItem:

        db.add(cart_item)

        return cart_item

    # ==========================================================
    # Update Cart Item
    # ==========================================================

    def update_item(
        self,
        db: Session,
        *,
        cart_item: CartItem,
    ) -> CartItem:

        db.add(cart_item)

        return cart_item

    # ==========================================================
    # Remove Cart Item
    # ==========================================================

    def remove_item(
        self,
        db: Session,
        *,
        cart_item: CartItem,
    ) -> None:

        db.delete(cart_item)

    # ==========================================================
    # Clear Cart
    # ==========================================================

    def clear_cart(
        self,
        db: Session,
        *,
        cart: Cart,
    ) -> None:

        for item in cart.items:
            db.delete(item)

    # ==========================================================
    # Cart Has Items
    # ==========================================================

    def has_items(
        self,
        db: Session,
        cart_id: int,
    ) -> bool:

        statement = (
            select(CartItem)
            .where(CartItem.cart_id == cart_id)
            .limit(1)
        )

        return db.scalar(statement) is not None


cart_repository = CartRepository()