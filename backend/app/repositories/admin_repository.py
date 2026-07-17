from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.db.models.user import User
from app.db.models.product import Product
from app.db.models.category import Category
from app.db.models.order import (
    Order,
    OrderStatus,
)


class AdminRepository:

    def get_dashboard_stats(
        self,
        db: Session,
    ):

        total_users = db.scalar(
            select(func.count(User.id))
        )

        total_products = db.scalar(
            select(func.count(Product.id))
        )

        total_categories = db.scalar(
            select(func.count(Category.id))
        )

        total_orders = db.scalar(
            select(func.count(Order.id))
        )

        pending_orders = db.scalar(
            select(func.count(Order.id))
            .where(
                Order.status == OrderStatus.PENDING
            )
        )

        completed_orders = db.scalar(
            select(func.count(Order.id))
            .where(
                Order.status == OrderStatus.DELIVERED
            )
        )

        revenue = db.scalar(
            select(
                func.coalesce(
                    func.sum(Order.grand_total),
                    0,
                )
            )
            .where(
                Order.status == OrderStatus.DELIVERED
            )
        )

        return {
            "total_users": total_users,
            "total_products": total_products,
            "total_categories": total_categories,
            "total_orders": total_orders,
            "pending_orders": pending_orders,
            "completed_orders": completed_orders,
            "total_revenue": float(revenue),
        }


admin_repository = AdminRepository()