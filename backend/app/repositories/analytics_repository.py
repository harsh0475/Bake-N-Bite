from __future__ import annotations

from datetime import date, datetime, time, timedelta

from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.db.models.order import (
    Order,
    OrderStatus,
)

from app.db.models.product import Product
from app.db.models.review import Review
from app.db.models.user import (
    User,
    UserRole,
)


class AnalyticsRepository:
    """
    Repository for admin analytics.
    """

    # ==========================================================
    # Total Revenue
    # ==========================================================

    def get_total_revenue(
        self,
        db: Session,
    ) -> float:

        statement = select(
            func.sum(
                Order.grand_total
            )
        ).where(
            Order.status != OrderStatus.CANCELLED
        )

        return float(
            db.scalar(statement) or 0
        )

    # ==========================================================
    # Orders Count
    # ==========================================================

    def get_total_orders(
        self,
        db: Session,
    ) -> int:

        statement = select(
            func.count()
        ).select_from(Order)

        return db.scalar(statement) or 0

    # ==========================================================
    # Customers Count
    # ==========================================================

    def get_total_customers(
        self,
        db: Session,
    ) -> int:

        statement = (
            select(func.count())
            .where(User.role == UserRole.CUSTOMER)
        )

        return db.scalar(statement) or 0

    # ==========================================================
    # Products Count
    # ==========================================================

    def get_total_products(
        self,
        db: Session,
    ) -> int:

        statement = select(
            func.count()
        ).select_from(Product)

        return db.scalar(statement) or 0
    
    # ==========================================================
    # Reviews Count
    # ==========================================================

    def get_total_reviews(
        self,
        db: Session,
    ) -> int:

        statement = select(
            func.count()
        ).select_from(Review)

        return db.scalar(statement) or 0

    # ==========================================================
    # Today's Orders
    # ==========================================================

    def get_today_orders(
        self,
        db: Session,
    ) -> int:

        today = date.today()

        start = datetime.combine(
            today,
            time.min,
        )

        end = start + timedelta(days=1)

        statement = (
            select(func.count())
            .where(
                Order.created_at >= start,
                Order.created_at < end,
            )
        )

        return db.scalar(statement) or 0

    # ==========================================================
    # Pending Orders
    # ==========================================================

    def get_pending_orders(
        self,
        db: Session,
    ) -> int:

        statement = (
            select(func.count())
            .where(
                Order.status ==
                OrderStatus.PENDING
            )
        )

        return db.scalar(statement) or 0


analytics_repository = (
    AnalyticsRepository()
)