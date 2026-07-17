from __future__ import annotations

from typing import Any, Generic, TypeVar

from sqlalchemy import func, select
from sqlalchemy.orm import Session
from sqlalchemy.sql.elements import ColumnElement

ModelType = TypeVar("ModelType")


class BaseRepository(Generic[ModelType]):
    """
    Generic repository implementing common CRUD operations.
    Transaction management (commit/rollback/refresh) is handled
    by the service layer.
    """

    def __init__(
        self,
        model: type[ModelType],
    ) -> None:
        self.model = model

    # ==========================================================
    # Create
    # ==========================================================

    def create(
        self,
        db: Session,
        *,
        obj_in: dict[str, Any],
    ) -> ModelType:

        db_obj = self.model(**obj_in)

        db.add(db_obj)

        return db_obj

    # ==========================================================
    # Get By ID
    # ==========================================================

    def get_by_id(
        self,
        db: Session,
        object_id: int,
    ) -> ModelType | None:

        return db.get(
            self.model,
            object_id,
        )

    # ==========================================================
    # Get All
    # ==========================================================

    def get_all(
        self,
        db: Session,
        *order_by: Any,
    ) -> list[ModelType]:

        statement = select(self.model)

        if order_by:
            statement = statement.order_by(*order_by)

        return list(
            db.scalars(statement)
        )

    # ==========================================================
    # Get One By Filters
    # ==========================================================

    def get_one_by(
        self,
        db: Session,
        *filters: ColumnElement[bool],
    ) -> ModelType | None:

        statement = (
            select(self.model)
            .where(*filters)
        )

        return db.scalar(statement)

    # ==========================================================
    # Get Many By Filters
    # ==========================================================

    def get_many_by(
        self,
        db: Session,
        *filters: ColumnElement[bool],
    ) -> list[ModelType]:

        statement = (
            select(self.model)
            .where(*filters)
        )

        return list(
            db.scalars(statement)
        )

    # ==========================================================
    # Update
    # ==========================================================

    def update(
        self,
        db: Session,
        *,
        db_obj: ModelType,
        obj_in: dict[str, Any],
    ) -> ModelType:

        for field, value in obj_in.items():
            setattr(
                db_obj,
                field,
                value,
            )

        db.add(db_obj)

        return db_obj

    # ==========================================================
    # Delete
    # ==========================================================

    def delete(
        self,
        db: Session,
        *,
        db_obj: ModelType,
    ) -> None:

        db.delete(db_obj)

    # ==========================================================
    # Exists
    # ==========================================================

    def exists(
        self,
        db: Session,
        object_id: int,
    ) -> bool:

        return (
            self.get_by_id(
                db,
                object_id,
            )
            is not None
        )

    # ==========================================================
    # Count
    # ==========================================================

    def count(
        self,
        db: Session,
    ) -> int:

        statement = (
            select(func.count())
            .select_from(self.model)
        )

        return db.scalar(statement) or 0

    # ==========================================================
    # Flush
    # ==========================================================

    def flush(
        self,
        db: Session,
    ) -> None:
        """
        Flush pending changes without committing.
        Useful when the service needs generated IDs before commit.
        """

        db.flush()

    # ==========================================================
    # Refresh
    # ==========================================================

    def refresh(
        self,
        db: Session,
        db_obj: ModelType,
    ) -> None:
        """
        Refresh an ORM object from the database.
        """

        db.refresh(db_obj)