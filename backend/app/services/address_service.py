from __future__ import annotations

from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from app.core.exceptions import (
    ConflictError,
    NotFoundError,
)
from app.db.models.address import Address
from app.db.models.user import User
from app.repositories.address_repository import (
    address_repository,
)
from app.schemas.address import (
    AddressCreate,
    AddressResponse,
    AddressSummary,
    AddressUpdate,
)
from app.services.base_service import BaseService


class AddressService(BaseService):
    """
    Business logic for customer addresses.
    """

    # ==========================================================
    # Get Address
    # ==========================================================

    def get_address(
        self,
        db: Session,
        current_user: User,
        address_id: int,
    ) -> Address:

        address = address_repository.get_user_address(
            db,
            current_user.id,
            address_id,
        )

        if address is None:
            raise NotFoundError(
                "Address not found."
            )

        return address

    # ==========================================================
    # Get User Addresses
    # ==========================================================

    def get_user_addresses(
        self,
        db: Session,
        current_user: User,
    ) -> list[AddressSummary]:

        addresses = address_repository.get_user_addresses(
            db,
            current_user.id,
        )

        return [
            AddressSummary.model_validate(address)
            for address in addresses
        ]

    # ==========================================================
    # Get Default Address
    # ==========================================================

    def get_default_address(
        self,
        db: Session,
        current_user: User,
    ) -> AddressResponse:

        address = address_repository.get_default_address(
            db,
            current_user.id,
        )

        if address is None:
            raise NotFoundError(
                "Default address not found."
            )

        return AddressResponse.model_validate(
            address,
        )

    # ==========================================================
    # Create Address
    # ==========================================================

    def create_address(
        self,
        db: Session,
        current_user: User,
        data: AddressCreate,
    ) -> AddressResponse:

        try:

            if data.is_default:

                addresses = address_repository.get_user_addresses(
                    db,
                    current_user.id,
                )

                for address in addresses:
                    address.is_default = False

            elif not address_repository.has_default_address(
                db,
                current_user.id,
            ):
                data.is_default = True

            address = address_repository.create(
                db,
                obj_in={
                    "user_id": current_user.id,
                    "full_name": data.full_name,
                    "phone": data.phone,
                    "address_line_1": data.address_line_1,
                    "address_line_2": data.address_line_2,
                    "landmark": data.landmark,
                    "city": data.city,
                    "state": data.state,
                    "postal_code": data.postal_code,
                    "latitude": data.latitude,
                    "longitude": data.longitude,
                    "address_type": data.address_type,
                    "is_default": data.is_default,
                },
            )

            self.commit_and_refresh(
                db,
                address,
            )

            return AddressResponse.model_validate(
                address,
            )

        except SQLAlchemyError:

            self.rollback(db)

            raise

    # ==========================================================
    # Update Address
    # ==========================================================

    def update_address(
        self,
        db: Session,
        current_user: User,
        address_id: int,
        data: AddressUpdate,
    ) -> AddressResponse:

        address = self.get_address(
            db,
            current_user,
            address_id,
        )

        try:

            update_data = data.model_dump(
                exclude_unset=True,
            )

            if update_data.get("is_default"):

                addresses = address_repository.get_user_addresses(
                    db,
                    current_user.id,
                )

                for item in addresses:
                    item.is_default = False

            updated = address_repository.update(
                db,
                db_obj=address,
                obj_in=update_data,
            )

            self.commit_and_refresh(
                db,
                updated,
            )

            return AddressResponse.model_validate(
                updated,
            )

        except SQLAlchemyError:

            self.rollback(db)

            raise

    # ==========================================================
    # Delete Address
    # ==========================================================

    def delete_address(
        self,
        db: Session,
        current_user: User,
        address_id: int,
    ) -> None:

        address = self.get_address(
            db,
            current_user,
            address_id,
        )

        was_default = address.is_default

        try:

            address_repository.delete(
                db,
                db_obj=address,
            )

            self.commit(db)

            # ------------------------------------------
            # If deleted address was default,
            # make another address default
            # ------------------------------------------

            if was_default:

                remaining = address_repository.get_user_addresses(
                    db,
                    current_user.id,
                )

                if remaining:

                    remaining[0].is_default = True

                    self.commit(db)

        except SQLAlchemyError:

            self.rollback(db)

            raise

    # ==========================================================
    # Set Default Address
    # ==========================================================

    def set_default_address(
        self,
        db: Session,
        current_user: User,
        address_id: int,
    ) -> AddressResponse:

        address = self.get_address(
            db,
            current_user,
            address_id,
        )

        try:

            addresses = address_repository.get_user_addresses(
                db,
                current_user.id,
            )

            for item in addresses:
                item.is_default = False

            address.is_default = True

            self.commit_and_refresh(
                db,
                address,
            )

            return AddressResponse.model_validate(
                address,
            )

        except SQLAlchemyError:

            self.rollback(db)

            raise


address_service = AddressService()