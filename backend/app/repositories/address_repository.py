from __future__ import annotations

from sqlalchemy.orm import Session

from app.db.models.address import Address
from app.repositories.base_repository import BaseRepository


class AddressRepository(BaseRepository[Address]):
    """
    Repository for Address database operations.
    """

    def __init__(self) -> None:
        super().__init__(Address)

    # ==========================================================
    # Get Address By User
    # ==========================================================

    def get_user_addresses(
        self,
        db: Session,
        user_id: int,
    ) -> list[Address]:

        return self.get_many_by(
            db,
            Address.user_id == user_id,
        )

    # ==========================================================
    # Get Default Address
    # ==========================================================

    def get_default_address(
        self,
        db: Session,
        user_id: int,
    ) -> Address | None:

        return self.get_one_by(
            db,
            Address.user_id == user_id,
            Address.is_default.is_(True),
        )

    # ==========================================================
    # Get User Address By ID
    # ==========================================================

    def get_user_address(
        self,
        db: Session,
        user_id: int,
        address_id: int,
    ) -> Address | None:

        return self.get_one_by(
            db,
            Address.id == address_id,
            Address.user_id == user_id,
        )

    # ==========================================================
    # Has Default Address
    # ==========================================================

    def has_default_address(
        self,
        db: Session,
        user_id: int,
    ) -> bool:

        return (
            self.get_default_address(
                db,
                user_id,
            )
            is not None
        )

    # ==========================================================
    # Count User Addresses
    # ==========================================================

    def count_user_addresses(
        self,
        db: Session,
        user_id: int,
    ) -> int:

        return len(
            self.get_user_addresses(
                db,
                user_id,
            )
        )


address_repository = AddressRepository()