from __future__ import annotations

from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.exceptions import (
    ConflictError,
    NotFoundError,
)
from app.db.models.order import (
    PaymentStatus as OrderPaymentStatus,
)
from app.db.models.payment import (
    Payment,
    PaymentMethod,
    PaymentStatus,
)
from app.repositories.order_repository import (
    order_repository,
)
from app.repositories.payment_repository import (
    payment_repository,
)
from app.schemas.payment import (
    ChangePaymentMethod,
    PaymentResponse,
    PaymentStatusUpdate,
    RazorpayVerification,
)
from app.services.base_service import BaseService
from datetime import datetime, timezone


class PaymentService(BaseService):
    """
    Business logic for payment processing.
    """

    # ==========================================================
    # Get Payment
    # ==========================================================

    def get_payment(
        self,
        db: Session,
        payment_id: int,
    ) -> Payment:

        payment = payment_repository.get_by_id(
            db,
            payment_id,
        )

        if payment is None:
            raise NotFoundError(
                "Payment not found."
            )

        return payment

    # ==========================================================
    # Get Payment By Order
    # ==========================================================

    def get_order_payment(
        self,
        db: Session,
        order_id: int,
    ) -> Payment:

        payment = payment_repository.get_by_order(
            db,
            order_id,
        )

        if payment is None:
            raise NotFoundError(
                "Payment not found."
            )

        return payment

    # ==========================================================
    # Get Payments By Status
    # ==========================================================

    def get_payments_by_status(
        self,
        db: Session,
        status: PaymentStatus,
    ) -> list[PaymentResponse]:

        payments = payment_repository.get_by_status(
            db,
            status,
        )

        return [
            PaymentResponse.model_validate(
                payment,
            )
            for payment in payments
        ]

    # ==========================================================
    # Get Payments By Method
    # ==========================================================

    def get_payments_by_method(
        self,
        db: Session,
        method: PaymentMethod,
    ) -> list[PaymentResponse]:

        payments = payment_repository.get_by_method(
            db,
            method,
        )

        return [
            PaymentResponse.model_validate(
                payment,
            )
            for payment in payments
        ]
        
    # ==========================================================
    # Process Payment
    # ==========================================================

    def process_payment(
        self,
        db: Session,
        order_id: int,
    ) -> PaymentResponse:

        payment = self.get_order_payment(
            db,
            order_id,
        )

        order = order_repository.get_by_id(
            db,
            order_id,
        )

        if order is None:
            raise NotFoundError(
                "Order not found."
            )

        if payment.payment_status != PaymentStatus.PENDING:
            raise ConflictError(
                "Payment has already been processed."
            )

        if payment.payment_method == PaymentMethod.COD:

            payment.payment_status = PaymentStatus.PENDING

            order.payment_status = (
                OrderPaymentStatus.PENDING
            )

        # elif payment.payment_method == PaymentMethod.UPI:

        #     payment.gateway_name = "UPI"

        #     payment.payment_status = PaymentStatus.PENDING

        #     order.payment_status = (
        #         OrderPaymentStatus.PENDING
        #     )

        elif payment.payment_method == PaymentMethod.RAZORPAY:

            payment.gateway_name = "Razorpay"

            payment.payment_status = PaymentStatus.PENDING

            order.payment_status = (
                OrderPaymentStatus.PENDING
            )

        self.commit_and_refresh(
            db,
            payment,
        )

        return PaymentResponse.model_validate(
            payment,
        )
        
    # ==========================================================
    # Mark Payment Successful
    # ==========================================================

    def mark_payment_success(
        self,
        db: Session,
        payment_id: int,
    ) -> PaymentResponse:

        payment = self.get_payment(
            db,
            payment_id,
        )

        order = order_repository.get_by_id(
            db,
            payment.order_id,
        )

        if order is None:
            raise NotFoundError(
                "Order not found."
            )

        if payment.payment_status == PaymentStatus.PAID:
            raise ConflictError(
                "Payment is already marked as successful."
            )

        try:

            payment.payment_status = PaymentStatus.PAID

            payment.paid_at = datetime.now(timezone.utc)

            order.payment_status = (
                OrderPaymentStatus.PAID
            )

            self.commit(
                db,
            )

            self.refresh(
                db,
                payment,
            )

            return PaymentResponse.model_validate(
                payment,
            )

        except SQLAlchemyError:

            self.rollback(
                db,
            )

            raise

    # ==========================================================
    # Mark Payment Failed
    # ==========================================================

    def mark_payment_failed(
        self,
        db: Session,
        payment_id: int,
        reason: str | None = None,
    ) -> PaymentResponse:

        payment = self.get_payment(
            db,
            payment_id,
        )

        order = order_repository.get_by_id(
            db,
            payment.order_id,
        )

        if order is None:
            raise NotFoundError(
                "Order not found."
            )

        try:

            payment.payment_status = PaymentStatus.FAILED

            payment.failure_reason = reason

            order.payment_status = (
                OrderPaymentStatus.FAILED
            )

            self.commit(
                db,
            )

            self.refresh(
                db,
                payment,
            )

            return PaymentResponse.model_validate(
                payment,
            )

        except SQLAlchemyError:

            self.rollback(
                db,
            )

            raise

    # ==========================================================
    # Update Payment Status (Admin)
    # ==========================================================

    def update_payment_status(
        self,
        db: Session,
        payment_id: int,
        data: PaymentStatusUpdate,
    ) -> PaymentResponse:

        payment = self.get_payment(
            db,
            payment_id,
        )

        payment.payment_status = data.payment_status

        if data.failure_reason:
            payment.failure_reason = (
                data.failure_reason
            )

        order = order_repository.get_by_id(
            db,
            payment.order_id,
        )

        if order:

            if (
                data.payment_status
                == PaymentStatus.PAID
            ):
                order.payment_status = (
                    OrderPaymentStatus.PAID
                )

                payment.paid_at = datetime.now(timezone.utc)

            elif (
                data.payment_status
                == PaymentStatus.FAILED
            ):
                order.payment_status = (
                    OrderPaymentStatus.FAILED
                )

        self.commit_and_refresh(
            db,
            payment,
        )

        return PaymentResponse.model_validate(
            payment,
        )
        
    # ==========================================================
    # Change Payment Method
    # ==========================================================

    def change_payment_method(
        self,
        db: Session,
        order_id: int,
        data: ChangePaymentMethod,
    ) -> PaymentResponse:

        payment = self.get_order_payment(
            db,
            order_id,
        )

        if payment.payment_status != PaymentStatus.PENDING:
            raise ConflictError(
                "Payment method can only be changed while payment is pending."
            )

        payment.payment_method = data.payment_method
        payment.gateway_order_id = None
        payment.gateway_payment_id = None
        payment.gateway_transaction_id = None

        if data.payment_method == PaymentMethod.RAZORPAY:

            payment.gateway_name = "Razorpay"

        else:

            payment.gateway_name = None

        payment.payment_status = PaymentStatus.PENDING

        payment.failure_reason = None

        payment.paid_at = None

        self.commit_and_refresh(
            db,
            payment,
        )

        return PaymentResponse.model_validate(
            payment,
        )
        
    # ==========================================================
    # Create Razorpay Order
    # ==========================================================

    def create_razorpay_order(
        self,
        db: Session,
        order_id: int,
    ) -> dict:
        
        import razorpay

        payment = self.get_order_payment(
            db,
            order_id,
        )
        
        if payment.payment_status == PaymentStatus.PAID:
            raise ConflictError(
                "Payment has already been completed."
            )

        if payment.payment_method != PaymentMethod.RAZORPAY:
            raise ConflictError(
                "This order is not using Razorpay."
            )

        order = order_repository.get_by_id(
            db,
            order_id,
        )

        if (
            payment.gateway_order_id
            and payment.payment_status == PaymentStatus.PENDING
        ):
            return {
                "key": settings.RAZORPAY_KEY_ID,
                "order_id": payment.gateway_order_id,
                "amount": int(payment.amount * 100),
                "currency": settings.CURRENCY,
                "customer": {
                    "name": order.delivery_name,
                    "phone": order.delivery_phone,
                },
            }
    
        client = razorpay.Client(
            auth=(
                settings.RAZORPAY_KEY_ID,
                settings.RAZORPAY_KEY_SECRET,
            )
        )

        razorpay_order = client.order.create(
            {
                "amount": int(payment.amount * 100),
                "currency": settings.CURRENCY,
                "payment_capture": 1,
                "notes": {
                    "order_id": str(order.id),
                    "order_number": order.order_number,
                },
            }
        )

        payment.gateway_name = "Razorpay"

        payment.gateway_order_id = razorpay_order["id"]

        self.commit_and_refresh(
            db,
            payment,
        )

        order = order_repository.get_by_id(
            db,
            order_id,
        )

        return {
            "key": settings.RAZORPAY_KEY_ID,
            "order_id": razorpay_order["id"],
            "amount": razorpay_order["amount"],
            "currency": razorpay_order["currency"],
            "customer": {
                "name": order.delivery_name,
                "phone": order.delivery_phone,
            },
        }

    # ==========================================================
    # Verify Razorpay Payment
    # ==========================================================

    def verify_razorpay_signature(
        self,
        db: Session,
        data: RazorpayVerification,
    ) -> PaymentResponse:
        
        import razorpay

        payment = payment_repository.get_by_gateway_order_id(
            db,
            data.razorpay_order_id,
        )

        if payment is None:
            raise NotFoundError(
                "Payment not found."
            )

        client = razorpay.Client(
            auth=(
                settings.RAZORPAY_KEY_ID,
                settings.RAZORPAY_KEY_SECRET,
            )
        )

        try:
            client.utility.verify_payment_signature(
                {
                    "razorpay_order_id": data.razorpay_order_id,
                    "razorpay_payment_id": data.razorpay_payment_id,
                    "razorpay_signature": data.razorpay_signature,
                }
            )
        except razorpay.errors.SignatureVerificationError:
            raise ConflictError(
                "Invalid Razorpay signature."
            )

        payment.gateway_payment_id = data.razorpay_payment_id

        payment.gateway_transaction_id = data.razorpay_payment_id

        payment.payment_status = PaymentStatus.PAID

        payment.paid_at = datetime.now(timezone.utc)

        payment.failure_reason = None
        
        order = order_repository.get_by_id(
            db,
            payment.order_id,
        )

        if order is None:
            raise NotFoundError(
                "Order not found."
            )
        
        if order:
            order.payment_status = (
                OrderPaymentStatus.PAID
            )

        self.commit_and_refresh(
            db,
            payment,
        )

        return PaymentResponse.model_validate(
            payment,
        )
        
    # ==========================================================
    # Refund Payment
    # ==========================================================

    def refund_payment(
        self,
        db: Session,
        payment_id: int,
    ) -> PaymentResponse:

        payment = self.get_payment(
            db,
            payment_id,
        )

        if payment.payment_status != PaymentStatus.PAID:
            raise ConflictError(
                "Only successful payments can be refunded."
            )

        payment.payment_status = (
            PaymentStatus.REFUNDED
        )
        payment.failure_reason = None

        order = order_repository.get_by_id(
            db,
            payment.order_id,
        )

        if order:
            order.payment_status = (
                OrderPaymentStatus.REFUNDED
            )

        self.commit_and_refresh(
            db,
            payment,
        )

        return PaymentResponse.model_validate(
            payment,
        )
        
payment_service = PaymentService()