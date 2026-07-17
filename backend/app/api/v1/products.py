from typing import List

from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_admin
from app.db.models.user import User
from app.db.session import get_db

from app.schemas.product import (
    AdminProductListResponse,
    ProductCard,
    ProductCreate,
    ProductDeleteResponse,
    ProductResponse,
    ProductUpdate,
)

from app.services.product_service import product_service


router = APIRouter(
    prefix="/products",
    tags=["Products"],
)


# ==================================================
# Public Endpoints
# ==================================================

@router.get(
    "/",
    response_model=List[ProductCard],
)
def get_products(
    category_id: int | None = Query(default=None),
    search: str | None = Query(default=None),

    featured: bool | None = Query(default=None),

    best_seller: bool | None = Query(default=None),

    is_veg: bool | None = Query(default=None),

    sort: str | None = Query(default=None),

    available: bool = Query(default=True),

    min_price: float | None = Query(default=None, ge=0),

    max_price: float | None = Query(default=None, ge=0),

    db: Session = Depends(get_db),
):
    return product_service.get_all_products(
        db=db,

        category_id=category_id,

        search=search,

        featured=featured,

        best_seller=best_seller,

        is_veg=is_veg,
        
        sort=sort,

        available=available,

        min_price=min_price,

        max_price=max_price,
    )


@router.get(
    "/category/{category_id}",
    response_model=List[ProductCard],
)
def get_products_by_category(
    category_id: int,
    db: Session = Depends(get_db),
):
    return product_service.get_products_by_category(
        db,
        category_id,
    )


# ==================================================
# Admin Endpoints
# ==================================================

@router.get(
    "/admin",
    response_model=AdminProductListResponse,
)
def get_admin_products(
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=10, ge=1, le=100),
    search: str | None = Query(default=None),
    category_id: int | None = Query(default=None),
    is_veg: bool | None = Query(default=None),
    sort: str | None = Query(default=None),
    is_available: bool | None = Query(default=None),
    is_featured: bool | None = Query(default=None),
    is_best_seller: bool | None = Query(default=None),
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin),
    
):
    return product_service.get_admin_products(
        db=db,
        page=page,
        page_size=page_size,
        search=search,
        category_id=category_id,
        is_veg=is_veg,
        sort=sort,
        is_available=is_available,
        is_featured=is_featured,
        is_best_seller=is_best_seller,
    )


# ==================================================
# Single Product (KEEP AFTER /admin)
# ==================================================

@router.get(
    "/{product_id}",
    response_model=ProductResponse,
)
def get_product(
    product_id: int,
    db: Session = Depends(get_db),
):
    product = product_service.get_product(
        db,
        product_id,
    )

    return ProductResponse.model_validate(product)


@router.post(
    "/",
    response_model=ProductResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_product(
    product: ProductCreate,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin),
):
    return product_service.create_product(
        db,
        product,
    )


@router.put(
    "/{product_id}",
    response_model=ProductResponse,
)
def update_product(
    product_id: int,
    product: ProductUpdate,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin),
):
    return product_service.update_product(
        db,
        product_id,
        product,
    )


@router.delete(
    "/{product_id}",
    response_model=ProductDeleteResponse,
    status_code=status.HTTP_200_OK,
)
def delete_product(
    product_id: int,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin),
):
    product_service.delete_product(
        db,
        product_id,
    )

    return {
        "message": "Product deleted successfully."
    }