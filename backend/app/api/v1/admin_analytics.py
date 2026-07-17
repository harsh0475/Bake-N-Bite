from fastapi import (
    APIRouter,
    Depends,
)

from sqlalchemy.orm import Session

from app.core.dependencies import (
    get_current_admin,
)

from app.db.models.user import User

from app.db.session import get_db

from app.services.admin_analytics_service import (
    admin_analytics_service,
)

router = APIRouter(
    prefix="/admin/analytics",
    tags=["Admin Analytics"],
)


# ==========================================================
# Dashboard Analytics
# ==========================================================

@router.get(
    "/dashboard",
)
def dashboard(
    db: Session = Depends(get_db),
    admin: User = Depends(
        get_current_admin,
    ),
):
    return admin_analytics_service.get_dashboard(
        db,
    )