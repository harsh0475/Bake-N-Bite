from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.dependencies import (
    get_current_admin,
)

from app.db.session import get_db

from app.schemas.admin import DashboardStats

from app.services.admin_service import (
    admin_service,
)

router = APIRouter(
    prefix="/admin",
    tags=["Admin"],
)


@router.get(
    "/dashboard",
    response_model=DashboardStats,
)
def dashboard(
    db: Session = Depends(get_db),
    current_admin=Depends(
        get_current_admin
    ),
):
    return admin_service.get_dashboard_stats(
        db
    )