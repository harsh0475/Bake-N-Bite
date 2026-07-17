from fastapi import (
    APIRouter,
    Depends,
    status,
)

from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user
from app.db.models.user import User
from app.db.session import get_db

from app.schemas.payment import (
    ChangePaymentMethod,
    PaymentResponse,
    RazorpayVerification,
)

from app.services.payment_service import (
    payment_service,
)

router = APIRouter(
    prefix="/payments",
    tags=["Payments"],
)


# ==========================================================
# Create Razorpay Order
# ==========================================================

@router.post(
    "/{order_id}/razorpay-order",
    status_code=status.HTTP_200_OK,
)
def create_razorpay_order(
    order_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Creates or returns an existing Razorpay Order.
    """

    return payment_service.create_razorpay_order(
        db=db,
        order_id=order_id,
    )


# ==========================================================
# Verify Razorpay Payment
# ==========================================================

@router.post(
    "/verify",
    response_model=PaymentResponse,
)
def verify_payment(
    data: RazorpayVerification,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Verify Razorpay payment signature.
    """

    return payment_service.verify_razorpay_signature(
        db=db,
        data=data,
    )


# ==========================================================
# Retry Payment
# ==========================================================

@router.post(
    "/{order_id}/retry",
    status_code=status.HTTP_200_OK,
)
def retry_payment(
    order_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Retry payment for an existing pending order.
    Returns the existing Razorpay Order if one already exists.
    """

    return payment_service.create_razorpay_order(
        db=db,
        order_id=order_id,
    )


# ==========================================================
# Get Payment By Order
# ==========================================================

@router.get(
    "/order/{order_id}",
    response_model=PaymentResponse,
)
def get_order_payment(
    order_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Get payment details for an order.
    """

    payment = payment_service.get_order_payment(
        db=db,
        order_id=order_id,
    )

    return PaymentResponse.model_validate(
        payment,
    )
    

# ==========================================================
# Change Payment Method
# ==========================================================

@router.patch(
    "/{order_id}/method",
    response_model=PaymentResponse,
)
def change_payment_method(
    order_id: int,
    data: ChangePaymentMethod,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Change payment method for a pending order.
    """

    return payment_service.change_payment_method(
        db=db,
        order_id=order_id,
        data=data,
    )