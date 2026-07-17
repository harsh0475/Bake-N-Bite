from __future__ import annotations

from datetime import UTC, datetime

from sqlalchemy.exc import SQLAlchemyError

from sqlalchemy.orm import Session

from app.core.exceptions import (
    BadRequestError,
    NotFoundError,
)

from app.db.models.order import (
    Order,
    OrderStatus,
    PaymentStatus as OrderPaymentStatus,
)

from app.db.models.payment import (
    PaymentMethod,
    PaymentStatus as PaymentRecordStatus,
)

from app.repositories.order_repository import (
    order_repository,
)

from app.repositories.payment_repository import (
    payment_repository,
)

from app.schemas.order import (
    OrderResponse,
    OrderSummary,
    UpdateOrderStatus,
    UpdatePaymentStatus,
)

from app.services.base_service import (
    BaseService,
)


class AdminOrderService(BaseService):
    """
    Business logic for admin order management.
    """

    # ==========================================================
    # Get Order
    # ==========================================================

    def get_order(
        self,
        db: Session,
        order_id: int,
    ) -> Order:

        order = order_repository.get_by_id(
            db,
            order_id,
        )

        if order is None:
            raise NotFoundError(
                "Order not found."
            )

        return order

    # ==========================================================
    # Get All Orders
    # ==========================================================

    def get_orders(
        self,
        db: Session,
    ) -> list[OrderSummary]:

        orders = (
            order_repository.get_all_orders(
                db,
            )
        )

        return [
            OrderSummary.model_validate(
                order
            )
            for order in orders
        ]
        
    # ==========================================================
    # Get Order Details
    # ==========================================================

    def get_order_details(
        self,
        db: Session,
        order_id: int,
    ) -> OrderResponse:

        order = self.get_order(
            db,
            order_id,
        )

        return OrderResponse.model_validate(
            order,
        )

    # ==========================================================
    # Update Order Status
    # ==========================================================

    def update_order_status(
        self,
        db: Session,
        order_id: int,
        data: UpdateOrderStatus,
    ) -> OrderResponse:

        order = self.get_order(
            db,
            order_id,
        )

        try:

            order.status = data.status

            self.commit(db)

            self.refresh(
                db,
                order,
            )

            return OrderResponse.model_validate(
                order,
            )

        except SQLAlchemyError:

            self.rollback(
                db,
            )

            raise
        
    # ==========================================================
    # Update Payment Status (Cash On Delivery Only)
    # ==========================================================

    def update_payment_status(
        self,
        db: Session,
        order_id: int,
        data: UpdatePaymentStatus,
    ) -> OrderResponse:

        order = self.get_order(
            db,
            order_id,
        )

        payment = payment_repository.get_by_order(
            db,
            order.id,
        )

        if payment is None:
            raise NotFoundError(
                "Payment record not found."
            )

        # ======================================================
        # Only Cash On Delivery can be updated manually
        # ======================================================

        if payment.payment_method != PaymentMethod.COD:
            raise BadRequestError(
                "Only Cash On Delivery payments can be updated manually."
            )

        # ======================================================
        # Order must be delivered first
        # ======================================================

        if order.status != OrderStatus.DELIVERED:
            raise BadRequestError(
                "Payment can only be marked as paid after the order is delivered."
            )

        # ======================================================
        # Only Pending -> Paid transition
        # ======================================================

        if payment.payment_status == PaymentRecordStatus.PAID:
            raise BadRequestError(
                "Payment has already been marked as paid."
            )

        if data.payment_status != OrderPaymentStatus.PAID:
            raise BadRequestError(
                "Only Pending to Paid transition is allowed."
            )

        try:

            # ==================================================
            # Update Order Payment Status
            # ==================================================

            order.payment_status = data.payment_status

            # ==================================================
            # Update Payment Record
            # ==================================================

            payment.payment_status = (
                PaymentRecordStatus.PAID
            )

            payment.paid_at = datetime.now(
                UTC
            )

            self.commit(
                db,
            )

            self.refresh(
                db,
                payment,
            )

            self.refresh(
                db,
                order,
            )

            order = self.get_order(
                db,
                order.id,
            )

            return OrderResponse.model_validate(
                order,
            )

        except SQLAlchemyError:

            self.rollback(
                db,
            )

            raise


admin_order_service = (
    AdminOrderService()
)