"""
Import all SQLAlchemy models.

Importing this module ensures that all models are registered with
SQLAlchemy's metadata before Alembic autogeneration runs.
"""

from app.db.models.address import Address
from app.db.models.cart import Cart
from app.db.models.cart_item import CartItem
from app.db.models.category import Category
from app.db.models.order import Order
from app.db.models.order_item import OrderItem
from app.db.models.payment import Payment
from app.db.models.product import Product
from app.db.models.product_image import ProductImage
from app.db.models.review import Review
from app.db.models.user import User

__all__ = [
    "Address",
    "Cart",
    "CartItem",
    "Category",
    "Order",
    "OrderItem",
    "Payment",
    "Product",
    "ProductImage",
    "Review",
    "User",
]