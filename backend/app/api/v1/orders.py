from typing import List

from fastapi import (
    APIRouter,
    Depends,
    status,
)
from sqlalchemy.orm import Session

from app.core.dependencies import (
    get_current_user,
)
from app.db.models.user import User
from app.db.session import get_db

from app.schemas.order import (
    CheckoutRequest,
    OrderResponse,
    OrderSummary,
)

from app.services.order_service import (
    order_service,
)


router = APIRouter(
    prefix="/orders",
    tags=["Orders"],
)


# ==========================================================
# Checkout
# ==========================================================

@router.post(
    "/checkout",
    response_model=OrderResponse,
    status_code=status.HTTP_201_CREATED,
)
def checkout(
    order: CheckoutRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user,
    ),
):
    return order_service.checkout(
        db,
        current_user,
        order,
    )


# ==========================================================
# Get My Orders
# ==========================================================

@router.get(
    "/",
    response_model=List[OrderSummary],
)
def get_orders(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user,
    ),
):
    return order_service.get_user_orders(
        db,
        current_user,
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
    current_user: User = Depends(
        get_current_user,
    ),
):
    order = order_service.get_user_order(
        db,
        current_user,
        order_id,
    )

    return OrderResponse.model_validate(
        order,
    )