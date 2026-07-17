from __future__ import annotations

from decimal import Decimal

from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from app.core.exceptions import (
    BadRequestError,
    NotFoundError,
)
from app.db.models.cart import Cart
from app.db.models.cart_item import CartItem
from app.db.models.user import User
from app.repositories.cart_repository import cart_repository
from app.repositories.product_repository import product_repository
from app.schemas.cart import (
    CartItemCreate,
    CartItemResponse,
    CartItemUpdate,
    CartResponse,
    CartSummary,
)
from app.services.base_service import BaseService


class CartService(BaseService):
    """
    Business logic for shopping cart.
    """
        # ==========================================================
    # Calculate Cart Totals
    # ==========================================================

    def _calculate_totals(
        self,
        cart: Cart,
    ) -> tuple[
        int,
        Decimal,
        Decimal,
        Decimal,
        Decimal,
        Decimal,
    ]:

        subtotal = Decimal("0.00")
        total_items = 0

        for item in cart.items:

            subtotal += (
                item.unit_price *
                item.quantity
            )

            total_items += item.quantity

        packaging_charge = Decimal("20.00") if subtotal > 0 else Decimal("0.00")

        delivery_charge = (
            Decimal("40.00")
            if subtotal < Decimal("500.00") and subtotal > 0
            else Decimal("0.00")
        )

        discount = Decimal("0.00")

        grand_total = (
            subtotal
            + delivery_charge
            + packaging_charge
            - discount
        )

        return (
            total_items,
            subtotal,
            delivery_charge,
            packaging_charge,
            discount,
            grand_total,
        )
    
        # ==========================================================
    # Cart Item Response
    # ==========================================================

    def _item_response(
        self,
        item: CartItem,
    ) -> CartItemResponse:

        primary_image = None

        if item.product.images:

            primary = next(
                (
                    image
                    for image in item.product.images
                    if image.is_primary
                ),
                item.product.images[0],
            )

            primary_image = primary.image_url

        return CartItemResponse(
            id=item.id,
            product_id=item.product_id,
            product_name=item.product.name,
            product_slug=item.product.slug,
            product_image=primary_image,
            unit_price=item.unit_price,
            quantity=item.quantity,
            subtotal=item.unit_price * item.quantity,
        )
        
        # ==========================================================
    # Build Cart Response
    # ==========================================================

    def _cart_response(
        self,
        cart: Cart,
    ) -> CartResponse:

        (
            total_items,
            subtotal,
            delivery_charge,
            packaging_charge,
            discount,
            grand_total,
        ) = self._calculate_totals(
            cart,
        )

        return CartResponse(
            id=cart.id,
            user_id=cart.user_id,
            items=[
                self._item_response(item)
                for item in cart.items
            ],
            total_items=total_items,
            subtotal=subtotal,
            delivery_charge=delivery_charge,
            packaging_charge=packaging_charge,
            discount=discount,
            grand_total=grand_total,
            created_at=cart.created_at,
            updated_at=cart.updated_at,
        )
        
        # ==========================================================
    # Get Cart
    # ==========================================================

    def get_cart(
        self,
        db: Session,
        current_user: User,
    ) -> CartResponse:

        cart = cart_repository.get_by_user(
            db,
            current_user.id,
        )

        if cart is None:
            raise NotFoundError(
                "Cart not found."
            )

        return self._cart_response(
            cart,
        )
        
        # ==========================================================
    # Cart Summary
    # ==========================================================

    def get_summary(
        self,
        db: Session,
        current_user: User,
    ) -> CartSummary:

        cart = cart_repository.get_by_user(
            db,
            current_user.id,
        )

        if cart is None:

            return CartSummary(
                total_items=0,
                grand_total=Decimal("0.00"),
            )

        (
            total_items,
            _,
            _,
            _,
            _,
            grand_total,
        ) = self._calculate_totals(
            cart,
        )

        return CartSummary(
            total_items=total_items,
            grand_total=grand_total,
        )
        
        # ==========================================================
    # Add Item To Cart
    # ==========================================================

    def add_item(
        self,
        db: Session,
        current_user: User,
        data: CartItemCreate,
    ) -> CartResponse:

        cart = cart_repository.get_by_user(
            db,
            current_user.id,
        )

        if cart is None:
            raise NotFoundError(
                "Cart not found."
            )

        product = product_repository.get_by_id(
            db,
            data.product_id,
        )

        if product is None:
            raise NotFoundError(
                "Product not found."
            )

        if not product.is_available:
            raise BadRequestError(
                "Product is currently unavailable."
            )

        existing_item = cart_repository.get_cart_item(
            db,
            cart.id,
            product.id,
        )

        try:

            if existing_item:

                existing_item.quantity += data.quantity

                cart_repository.update_item(
                    db,
                    cart_item=existing_item,
                )

            else:

                cart_item = CartItem(
                    cart_id=cart.id,
                    product_id=product.id,
                    quantity=data.quantity,
                    unit_price=product.effective_price,
                )

                cart_repository.add_item(
                    db,
                    cart_item=cart_item,
                )

            self.commit(
                db,
            )

            cart = cart_repository.get_by_user(
                db,
                current_user.id,
            )

            return self._cart_response(cart)

        except SQLAlchemyError:

            self.rollback(db)

            raise
        
        # ==========================================================
    # Update Cart Item
    # ==========================================================

    def update_item(
        self,
        db: Session,
        current_user: User,
        item_id: int,
        data: CartItemUpdate,
    ) -> CartResponse:

        cart = cart_repository.get_by_user(
            db,
            current_user.id,
        )

        if cart is None:
            raise NotFoundError(
                "Cart not found."
            )

        item = next(
            (
                cart_item
                for cart_item in cart.items
                if cart_item.id == item_id
            ),
            None,
        )

        if item is None:
            raise NotFoundError(
                "Cart item not found."
            )

        item.quantity = data.quantity

        try:

            cart_repository.update_item(
                db,
                cart_item=item,
            )

            self.commit(
                db,
            )

            cart = cart_repository.get_by_user(
                db,
                current_user.id,
            )

            return self._cart_response(cart)

        except SQLAlchemyError:

            self.rollback(db)

            raise
        
    # ==========================================================
    # Remove Item
    # ==========================================================

    def remove_item(
        self,
        db: Session,
        current_user: User,
        item_id: int,
    ) -> CartResponse:

        cart = cart_repository.get_by_user(
            db,
            current_user.id,
        )

        if cart is None:
            raise NotFoundError(
                "Cart not found."
            )

        item = next(
            (
                cart_item
                for cart_item in cart.items
                if cart_item.id == item_id
            ),
            None,
        )

        if item is None:
            raise NotFoundError(
                "Cart item not found."
            )

        try:

            cart_repository.remove_item(
                db,
                cart_item=item,
            )

            db.flush()
            db.expire_all()

            self.commit(db)

            cart = cart_repository.get_by_user(
                db,
                current_user.id,
            )

            return self._cart_response(cart)

        except SQLAlchemyError:

            self.rollback(db)

            raise
        
    # ==========================================================
    # Clear Cart
    # ==========================================================

    def clear_cart(
        self,
        db: Session,
        current_user: User,
    ) -> None:

        cart = cart_repository.get_by_user(
            db,
            current_user.id,
        )

        if cart is None:
            raise NotFoundError(
                "Cart not found."
            )

        try:

            cart_repository.clear_cart(
                db,
                cart=cart,
            )

            self.commit(
                db,
            )

        except SQLAlchemyError:

            self.rollback(db)

            raise
        
cart_service = CartService()