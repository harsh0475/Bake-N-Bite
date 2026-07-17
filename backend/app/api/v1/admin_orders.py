from fastapi import (
    APIRouter,
    Depends,
)

from sqlalchemy.orm import Session

from typing import List

from app.core.dependencies import (
    get_current_admin,
)

from app.db.models.user import User

from app.db.session import get_db

from app.schemas.order import (
    OrderResponse,
    OrderSummary,
    UpdateOrderStatus,
    UpdatePaymentStatus,
)

from app.services.admin_order_service import (
    admin_order_service,
)


router = APIRouter(
    prefix="/admin/orders",
    tags=["Admin Orders"],
)


# ==========================================================
# Get All Orders
# ==========================================================

@router.get(
    "/",
    response_model=List[OrderSummary],
)
def get_orders(
    db: Session = Depends(get_db),
    admin: User = Depends(
        get_current_admin
    ),
):
    return (
        admin_order_service.get_orders(
            db,
        )
    )


# ==========================================================
# Get Single Order
# ==========================================================

@router.get(
    "/{order_id}",
    response_model=OrderResponse,
)
def get_order(
    order_id: int,
    db: Session = Depends(get_db),
    admin: User = Depends(
        get_current_admin
    ),
):
    return (
        admin_order_service.get_order_details(
            db,
            order_id,
        )
    )
    
# ==========================================================
# Update Order Status
# ==========================================================

@router.patch(
    "/{order_id}/status",
    response_model=OrderResponse,
)
def update_order_status(
    order_id: int,
    data: UpdateOrderStatus,
    db: Session = Depends(get_db),
    admin: User = Depends(
        get_current_admin
    ),
):
    return (
        admin_order_service.update_order_status(
            db,
            order_id,
            data,
        )
    )
    
# ==========================================================
# Update Payment Status (Cash On Delivery)
# ==========================================================

@router.patch(
    "/{order_id}/payment-status",
    response_model=OrderResponse,
)
def update_payment_status(
    order_id: int,
    data: UpdatePaymentStatus,
    db: Session = Depends(get_db),
    admin: User = Depends(
        get_current_admin,
    ),
):
    return (
        admin_order_service.update_payment_status(
            db,
            order_id,
            data,
        )
    )