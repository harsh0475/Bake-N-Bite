from __future__ import annotations

from sqlalchemy.orm import Session

from app.repositories.analytics_repository import (
    analytics_repository,
)

from app.services.base_service import (
    BaseService,
)


class AdminAnalyticsService(BaseService):
    """
    Business logic for admin analytics.
    """

    # ==========================================================
    # Dashboard Analytics
    # ==========================================================

    def get_dashboard(
        self,
        db: Session,
    ) -> dict:

        return {
            "total_revenue": analytics_repository.get_total_revenue(
                db,
            ),

            "total_orders": analytics_repository.get_total_orders(
                db,
            ),

            "today_orders": analytics_repository.get_today_orders(
                db,
            ),

            "pending_orders": analytics_repository.get_pending_orders(
                db,
            ),

            "total_customers": analytics_repository.get_total_customers(
                db,
            ),

            "total_products": analytics_repository.get_total_products(
                db,
            ),

            "total_reviews": analytics_repository.get_total_reviews(
                db,
            ),
        }
        
admin_analytics_service = (
    AdminAnalyticsService()
)