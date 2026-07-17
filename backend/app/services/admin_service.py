from sqlalchemy.orm import Session

from app.repositories.admin_repository import (
    admin_repository,
)

from app.schemas.admin import DashboardStats


class AdminService:

    def get_dashboard_stats(
        self,
        db: Session,
    ):

        stats = admin_repository.get_dashboard_stats(
            db
        )

        return DashboardStats(
            **stats
        )


admin_service = AdminService()