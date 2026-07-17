from typing import List

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user
from app.db.models.user import User
from app.db.session import get_db

from app.schemas.address import (
    AddressCreate,
    AddressUpdate,
    AddressResponse,
    AddressSummary,
)

from app.services.address_service import address_service


router = APIRouter(
    prefix="/addresses",
    tags=["Addresses"],
)


# --------------------------------------------------
# Get All Addresses
# --------------------------------------------------

@router.get(
    "/",
    response_model=List[AddressSummary],
)
def get_addresses(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return address_service.get_user_addresses(
        db,
        current_user,
    )


# --------------------------------------------------
# Get Default Address
# --------------------------------------------------

@router.get(
    "/default",
    response_model=AddressResponse,
)
def get_default_address(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return address_service.get_default_address(
        db,
        current_user,
    )


# --------------------------------------------------
# Get Single Address
# --------------------------------------------------

@router.get(
    "/{address_id}",
    response_model=AddressResponse,
)
def get_address(
    address_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    address = address_service.get_address(
        db,
        current_user,
        address_id,
    )

    return AddressResponse.model_validate(
        address,
    )


# --------------------------------------------------
# Create Address
# --------------------------------------------------

@router.post(
    "/",
    response_model=AddressResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_address(
    address: AddressCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return address_service.create_address(
        db,
        current_user,
        address,
    )


# --------------------------------------------------
# Update Address
# --------------------------------------------------

@router.put(
    "/{address_id}",
    response_model=AddressResponse,
)
def update_address(
    address_id: int,
    address: AddressUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return address_service.update_address(
        db,
        current_user,
        address_id,
        address,
    )


# --------------------------------------------------
# Set Default Address
# --------------------------------------------------

@router.put(
    "/{address_id}/default",
    response_model=AddressResponse,
)
def set_default_address(
    address_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return address_service.set_default_address(
        db,
        current_user,
        address_id,
    )


# --------------------------------------------------
# Delete Address
# --------------------------------------------------

@router.delete(
    "/{address_id}",
    status_code=status.HTTP_200_OK,
)
def delete_address(
    address_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    address_service.delete_address(
        db,
        current_user,
        address_id,
    )

    return {
        "message": "Address deleted successfully."
    }