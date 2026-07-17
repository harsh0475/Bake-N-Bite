from .auth import router as auth_router
from .users import router as users_router
from .category import router as categories_router
from .products import router as products_router
from .cart import router as cart_router
from app.api.v1.address import router as address_router
from .orders import router as orders_router
from .reviews import router as reviews_router
from app.api.v1.admin import router as admin_router
from app.api.v1.admin_orders import (
    router as admin_orders_router,
)
from app.api.v1.admin_users import (
    router as admin_users_router,
)
from app.api.v1.admin_reviews import (
    router as admin_reviews_router,
)
from app.api.v1.admin_analytics import (
    router as admin_analytics_router,
)
from app.api.v1.product_images import (
    router as product_images_router,
)
from app.api.v1.payment import (
    router as payment_router,
)
from app.api.v1.contact import router as contact_router