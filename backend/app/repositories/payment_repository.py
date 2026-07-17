from __future__ import annotations

from sqlalchemy import desc, select
from sqlalchemy.orm import Session, selectinload

from app.db.models.payment import (
    Payment,
    PaymentMethod,
    PaymentStatus,
)
from app.repositories.base_repository import BaseRepository


class PaymentRepository(BaseRepository[Payment]):
    """
    Repository for Payment database operations.
    """

    def __init__(self) -> None:
        super().__init__(Payment)

    # ==========================================================
    # Get Payment By Order
    # ==========================================================

    def get_by_order(
        self,
        db: Session,
        order_id: int,
    ) -> Payment | None:

        statement = (
            select(Payment)
            .options(
                selectinload(Payment.order),
            )
            .where(
                Payment.order_id == order_id,
            )
        )

        return db.scalar(statement)

    # ==========================================================
    # Get Payments By Status
    # ==========================================================

    def get_by_status(
        self,
        db: Session,
        status: PaymentStatus,
    ) -> list[Payment]:

        statement = (
            select(Payment)
            .options(
                selectinload(Payment.order),
            )
            .where(
                Payment.payment_status == status,
            )
            .order_by(
                desc(Payment.created_at),
            )
        )

        return list(db.scalars(statement))

    # ==========================================================
    # Get Payments By Method
    # ==========================================================

    def get_by_method(
        self,
        db: Session,
        method: PaymentMethod,
    ) -> list[Payment]:

        statement = (
            select(Payment)
            .options(
                selectinload(Payment.order),
            )
            .where(
                Payment.payment_method == method,
            )
            .order_by(
                desc(Payment.created_at),
            )
        )

        return list(db.scalars(statement))

    # ==========================================================
    # Get By Gateway Order ID
    # ==========================================================

    def get_by_gateway_order_id(
        self,
        db: Session,
        gateway_order_id: str,
    ) -> Payment | None:

        return self.get_one_by(
            db,
            Payment.gateway_order_id == gateway_order_id,
        )

    # ==========================================================
    # Get By Gateway Payment ID
    # ==========================================================

    def get_by_gateway_payment_id(
        self,
        db: Session,
        gateway_payment_id: str,
    ) -> Payment | None:

        return self.get_one_by(
            db,
            Payment.gateway_payment_id == gateway_payment_id,
        )


payment_repository = PaymentRepository()