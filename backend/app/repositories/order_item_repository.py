from __future__ import annotations

from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from app.db.models.order_item import OrderItem
from app.repositories.base_repository import BaseRepository


class OrderItemRepository(BaseRepository[OrderItem]):
    """
    Repository for OrderItem database operations.
    """

    def __init__(self) -> None:
        super().__init__(OrderItem)

    # ==========================================================
    # Get Order Items
    # ==========================================================

    def get_order_items(
        self,
        db: Session,
        order_id: int,
    ) -> list[OrderItem]:

        statement = (
            select(OrderItem)
            .options(
                selectinload(OrderItem.product),
            )
            .where(
                OrderItem.order_id == order_id,
            )
        )

        return list(
            db.scalars(statement)
        )

    # ==========================================================
    # Get Product Orders
    # ==========================================================

    def get_product_orders(
        self,
        db: Session,
        product_id: int,
    ) -> list[OrderItem]:

        statement = (
            select(OrderItem)
            .options(
                selectinload(OrderItem.order),
            )
            .where(
                OrderItem.product_id == product_id,
            )
        )

        return list(
            db.scalars(statement)
        )

    # ==========================================================
    # Create Order Item
    # ==========================================================

    def create_item(
        self,
        db: Session,
        *,
        order_item: OrderItem,
    ) -> OrderItem:

        db.add(order_item)

        return order_item

    # ==========================================================
    # Delete Order Item
    # ==========================================================

    def delete_item(
        self,
        db: Session,
        *,
        order_item: OrderItem,
    ) -> None:

        db.delete(order_item)

    # ==========================================================
    # Count Items In Order
    # ==========================================================

    def count_items(
        self,
        db: Session,
        order_id: int,
    ) -> int:

        return len(
            self.get_order_items(
                db,
                order_id,
            )
        )


order_item_repository = OrderItemRepository()