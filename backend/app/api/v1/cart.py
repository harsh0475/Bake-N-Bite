from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user
from app.db.models.user import User
from app.db.session import get_db

from app.schemas.cart import (
    CartResponse,
    CartItemCreate,
    CartItemUpdate,
)

from app.services.cart_service import cart_service


router = APIRouter(
    prefix="/cart",
    tags=["Cart"],
)


# --------------------------------------------------
# Get Cart
# --------------------------------------------------

@router.get(
    "/",
    response_model=CartResponse,
)
def get_cart(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return cart_service.get_cart(
        db,
        current_user,
    )


# --------------------------------------------------
# Add Item
# --------------------------------------------------

@router.post(
    "/items",
    response_model=CartResponse,
    status_code=status.HTTP_201_CREATED,
)
def add_item(
    item: CartItemCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return cart_service.add_item(
        db,
        current_user,
        item,
    )


# --------------------------------------------------
# Update Item
# --------------------------------------------------

@router.put(
    "/items/{cart_item_id}",
    response_model=CartResponse,
)
def update_item(
    cart_item_id: int,
    item: CartItemUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return cart_service.update_item(
        db,
        current_user,
        cart_item_id,
        item,
    )


# --------------------------------------------------
# Remove Item
# --------------------------------------------------

@router.delete(
    "/items/{cart_item_id}",
    response_model=CartResponse,
)
def remove_item(
    cart_item_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return cart_service.remove_item(
        db,
        current_user,
        cart_item_id,
    )


# --------------------------------------------------
# Clear Cart
# --------------------------------------------------

@router.delete(
    "/clear",
    status_code=status.HTTP_200_OK,
)
def clear_cart(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    cart_service.clear_cart(
        db,
        current_user,
    )

    return {
        "message": "Cart cleared successfully."
    }