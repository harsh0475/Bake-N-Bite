from __future__ import annotations

from datetime import (
    date,
    datetime,
    time,
    timedelta,
)

from sqlalchemy import (
    desc,
    select,
)
from sqlalchemy.orm import (
    Session,
    selectinload,
)

from app.db.models.order import (
    Order,
    OrderStatus,
)

from app.repositories.base_repository import (
    BaseRepository,
)


class OrderRepository(
    BaseRepository[Order]
):
    """
    Repository for Order database operations.
    """

    def __init__(self) -> None:
        super().__init__(Order)

    # ==========================================================
    # Get Order By Number
    # ==========================================================

    def get_by_order_number(
        self,
        db: Session,
        order_number: str,
    ) -> Order | None:

        return self.get_one_by(
            db,
            Order.order_number == order_number,
        )

    # ==========================================================
    # Get All Orders (Admin)
    # ==========================================================

    def get_all_orders(
        self,
        db: Session,
    ) -> list[Order]:

        statement = (
            select(Order)
            .options(
                selectinload(Order.user),
                selectinload(Order.order_items),
                selectinload(Order.payment),
            )
            .order_by(
                desc(Order.created_at)
            )
        )

        return list(
            db.scalars(statement)
        )

    # ==========================================================
    # Get User Orders
    # ==========================================================

    def get_user_orders(
        self,
        db: Session,
        user_id: int,
    ) -> list[Order]:

        statement = (
            select(Order)
            .options(
                selectinload(Order.order_items),
                selectinload(Order.payment),
            )
            .where(
                Order.user_id == user_id
            )
            .order_by(
                desc(Order.created_at)
            )
        )

        return list(
            db.scalars(statement)
        )

    # ==========================================================
    # Get Orders By Status
    # ==========================================================

    def get_by_status(
        self,
        db: Session,
        status: OrderStatus,
    ) -> list[Order]:

        statement = (
            select(Order)
            .options(
                selectinload(Order.order_items),
                selectinload(Order.payment),
            )
            .where(
                Order.status == status
            )
            .order_by(
                desc(Order.created_at)
            )
        )

        return list(
            db.scalars(statement)
        )
        
    # ==========================================================
    # Get Latest Orders
    # ==========================================================

    def get_latest_orders(
        self,
        db: Session,
        limit: int = 10,
    ) -> list[Order]:

        statement = (
            select(Order)
            .options(
                selectinload(Order.order_items),
                selectinload(Order.payment),
            )
            .order_by(
                desc(Order.created_at)
            )
            .limit(limit)
        )

        return list(
            db.scalars(statement)
        )

    # ==========================================================
    # Get Today's Orders
    # ==========================================================

    def get_today_orders(
        self,
        db: Session,
        today: date,
    ) -> list[Order]:

        start = datetime.combine(
            today,
            time.min,
        )

        end = start + timedelta(days=1)

        statement = (
            select(Order)
            .options(
                selectinload(Order.order_items),
                selectinload(Order.payment),
            )
            .where(
                Order.created_at >= start,
                Order.created_at < end,
            )
            .order_by(
                desc(Order.created_at)
            )
        )

        return list(
            db.scalars(statement)
        )

    # ==========================================================
    # Order Number Exists
    # ==========================================================

    def order_number_exists(
        self,
        db: Session,
        order_number: str,
    ) -> bool:

        return (
            self.get_by_order_number(
                db,
                order_number,
            )
            is not None
        )
        
    # ==========================================================
    # Get Order By ID
    # ==========================================================

    def get_by_id(
        self,
        db: Session,
        object_id: int,
    ) -> Order | None:

        statement = (
            select(Order)
            .options(
                selectinload(Order.order_items),
                selectinload(Order.payment),
                selectinload(Order.user),
            )
            .where(
                Order.id == object_id
            )
        )

        return db.scalar(statement)


order_repository = OrderRepository()