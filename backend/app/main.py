from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Request
from fastapi.responses import JSONResponse
from app.api.v1 import (
    auth_router,
    users_router,
    categories_router,
    products_router,
    cart_router,
    orders_router,
    reviews_router,
    address_router,
    admin_router,
    admin_orders_router,
    admin_users_router,
    admin_reviews_router,
    admin_analytics_router,
    product_images_router,
    payment_router,
    category_image,
    contact_router,
)

from app.core.config import settings


# ==================================================
# Application Lifespan
# ==================================================

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Bake N Bite API Started")
    yield
    print("Bake N Bite API Stopped")


# ==================================================
# FastAPI Application
# ==================================================

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="""
Production REST API for Bake N Bite.

Features:
- JWT Authentication
- User Management
- Category Management
- Product Management
- Shopping Cart
- Order Management
- Reviews
- Admin Dashboard
""",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)


# ==================================================
# Middleware
# ==================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception):
    origin = request.headers.get("origin")

    headers = {}
    if origin in settings.BACKEND_CORS_ORIGINS:
        headers = {
            "Access-Control-Allow-Origin": origin,
            "Access-Control-Allow-Credentials": "true",
        }

    print(f"Unhandled error on {request.method} {request.url.path}: {exc!r}")

    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error. Please try again."},
        headers=headers,
    )


# ==================================================
# API Routers
# ==================================================

app.include_router(
    auth_router,
    prefix=settings.API_V1_PREFIX,
)

app.include_router(
    users_router,
    prefix=settings.API_V1_PREFIX,
)

app.include_router(
    categories_router,
    prefix=settings.API_V1_PREFIX,
)

# ==================================================
# Category Images
# ==================================================

app.include_router(
    category_image.router,
    prefix=settings.API_V1_PREFIX,
)

app.include_router(
    products_router,
    prefix=settings.API_V1_PREFIX,
)

app.include_router(
    product_images_router,
    prefix=settings.API_V1_PREFIX,
)

app.include_router(
    cart_router,
    prefix=settings.API_V1_PREFIX,
)

app.include_router(
    orders_router,
    prefix=settings.API_V1_PREFIX,
)

app.include_router(
    payment_router,
    prefix=settings.API_V1_PREFIX,
)

app.include_router(
    reviews_router,
    prefix=settings.API_V1_PREFIX,
)

app.include_router(
    address_router,
    prefix=settings.API_V1_PREFIX,
)

app.include_router(
    admin_router,
    prefix=settings.API_V1_PREFIX,
)

app.include_router(
    admin_orders_router,
    prefix=settings.API_V1_PREFIX,
)

app.include_router(
    admin_users_router,
    prefix=settings.API_V1_PREFIX,
)

app.include_router(
    admin_reviews_router,
    prefix=settings.API_V1_PREFIX,
)

app.include_router(
    admin_analytics_router,
    prefix=settings.API_V1_PREFIX,
)

app.include_router(
    contact_router,
    prefix=settings.API_V1_PREFIX,
)


# ==================================================
# Root Endpoint
# ==================================================

@app.get("/", tags=["Root"])
def root():
    return {
        "message": "Welcome to Bake N Bite API",
        "version": settings.VERSION,
        "docs": "/docs",
    }


# ==================================================
# Health Check
# ==================================================

@app.get("/health", tags=["Health"])
def health_check():
    return {
        "status": "healthy",
    }