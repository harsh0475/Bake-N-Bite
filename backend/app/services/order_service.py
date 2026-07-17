from __future__ import annotations

from datetime import datetime
from decimal import Decimal

from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from app.core.exceptions import (
    BadRequestError,
    NotFoundError,
)
from app.db.models.order import (
    DeliveryMethod,
    Order,
    OrderStatus,
    PaymentStatus,
)
from app.db.models.order_item import OrderItem
from app.db.models.payment import (
    PaymentMethod,
    PaymentStatus as PaymentRecordStatus,
)
from app.db.models.user import User
from app.repositories.address_repository import (
    address_repository,
)
from app.repositories.cart_repository import (
    cart_repository,
)
from app.repositories.order_item_repository import (
    order_item_repository,
)
from app.repositories.order_repository import (
    order_repository,
)
from app.repositories.payment_repository import (
    payment_repository,
)
from app.schemas.order import (
    CheckoutRequest,
    OrderResponse,
    OrderSummary,
    UpdateOrderStatus,
)
from app.services.base_service import BaseService


class OrderService(BaseService):
    """
    Business logic for customer orders.
    """

    DELIVERY_CHARGE = Decimal("40.00")

    PACKAGING_CHARGE = Decimal("20.00")

    # ==========================================================
    # Generate Order Number
    # ==========================================================

    def generate_order_number(
        self,
    ) -> str:
        """
        Example:
        BNB20260701091545123
        """

        return (
            "BNB"
            + datetime.now().strftime(
                "%Y%m%d%H%M%S%f"
            )[:-3]
        )

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
    # Get User Order
    # ==========================================================

    def get_user_order(
        self,
        db: Session,
        current_user: User,
        order_id: int,
    ) -> Order:

        order = self.get_order(
            db,
            order_id,
        )

        if order.user_id != current_user.id:
            raise NotFoundError(
                "Order not found."
            )

        return order

    # ==========================================================
    # Get User Orders
    # ==========================================================

    def get_user_orders(
        self,
        db: Session,
        current_user: User,
    ) -> list[OrderSummary]:

        orders = order_repository.get_user_orders(
            db,
            current_user.id,
        )

        return [
            OrderSummary.model_validate(order)
            for order in orders
        ]
    
    # ==========================================================
    # Calculate Cart Total
    # ==========================================================

    def calculate_cart_total(
        self,
        cart,
    ) -> Decimal:

        subtotal = Decimal("0")

        for item in cart.items:

            subtotal += (
                item.unit_price
                * item.quantity
            )

        return subtotal

    # ==========================================================
    # Calculate Grand Total
    # ==========================================================

    def calculate_grand_total(
        self,
        subtotal: Decimal,
    ) -> Decimal:

        return (
            subtotal
            + self.DELIVERY_CHARGE
            + self.PACKAGING_CHARGE
        )

    # ==========================================================
    # Validate Cart
    # ==========================================================

    def validate_cart(
        self,
        db: Session,
        current_user: User,
    ):

        cart = cart_repository.get_by_user(
            db,
            current_user.id,
        )

        if cart is None:
            raise NotFoundError(
                "Cart not found."
            )

        if not cart.items:
            raise BadRequestError(
                "Your cart is empty."
            )

        return cart
    
    # ==========================================================
    # Checkout
    # ==========================================================

    def checkout(
        self,
        db: Session,
        current_user: User,
        data: CheckoutRequest,
    ) -> OrderResponse:

        cart = self.validate_cart(
            db,
            current_user,
        )

        address = address_repository.get_user_address(
            db,
            current_user.id,
            data.address_id,
        )

        if address is None:
            raise NotFoundError(
                "Delivery address not found."
            )

        subtotal = self.calculate_cart_total(
            cart,
        )

        delivery_charge = (
            Decimal("0")
            if data.delivery_method
            == DeliveryMethod.PICKUP
            else self.DELIVERY_CHARGE
        )

        packaging_charge = (
            self.PACKAGING_CHARGE
        )

        discount = Decimal("0")

        grand_total = (
            subtotal
            + delivery_charge
            + packaging_charge
            - discount
        )

        try:

            order = order_repository.create(
                db,
                obj_in={
                    "order_number": self.generate_order_number(),
                    "user_id": current_user.id,

                    # Delivery Snapshot

                    "delivery_name": address.full_name,
                    "delivery_phone": address.phone,
                    "delivery_address_line_1": address.address_line_1,
                    "delivery_address_line_2": address.address_line_2,
                    "delivery_landmark": address.landmark,
                    "delivery_city": address.city,
                    "delivery_state": address.state,
                    "delivery_postal_code": address.postal_code,

                    # Status

                    "status": OrderStatus.PENDING,
                    "payment_status": PaymentStatus.PENDING,
                    "delivery_method": data.delivery_method,

                    # Pricing

                    "subtotal": subtotal,
                    "delivery_charge": delivery_charge,
                    "packaging_charge": packaging_charge,
                    "discount": discount,
                    "grand_total": grand_total,

                    # Notes

                    "customer_note": data.customer_note,
                    "admin_note": None,
                    "estimated_delivery_time": None,
                },
            )
            
            self.flush(
                db,
            )

            # Continue creating Order Items

            for cart_item in cart.items:

                order_item = OrderItem(
                    order_id=order.id,
                    product_id=cart_item.product_id,
                    product_name=cart_item.product.name,
                    unit_price=cart_item.unit_price,
                    quantity=cart_item.quantity,
                    subtotal=(
                        cart_item.unit_price
                        * cart_item.quantity
                    ),
                )

                order_item_repository.create_item(
                    db,
                    order_item=order_item,
                )
                
            # ==================================================
            # Create Payment Record
            # ==================================================

            gateway_name = None

            if data.payment_method == PaymentMethod.RAZORPAY:
                gateway_name = "Razorpay"

            elif data.payment_method == PaymentMethod.UPI:
                gateway_name = "UPI"

            payment_repository.create(
                db,
                obj_in={
                    "order_id": order.id,
                    "amount": grand_total,

                    "payment_method": data.payment_method,

                    "payment_status": PaymentRecordStatus.PENDING,

                    "gateway_name": gateway_name,

                    # Filled later after Razorpay order creation
                    "gateway_order_id": None,

                    # Filled after payment success
                    "gateway_payment_id": None,
                    "gateway_transaction_id": None,

                    "failure_reason": None,

                    "paid_at": None,
                },
            )

            # ==================================================
            # Clear Cart
            # ==================================================

            cart_repository.clear_cart(
                db,
                cart=cart,
            )

            # ==================================================
            # Commit Transaction
            # ==================================================

            self.commit(
                db,
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
        
order_service = OrderService()