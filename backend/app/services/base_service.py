from __future__ import annotations

from sqlalchemy.orm import Session


class BaseService:
    """
    Base service providing common database operations.
    """

    @staticmethod
    def commit(
        db: Session,
    ) -> None:
        """
        Commit current transaction.
        """

        db.commit()

    @staticmethod
    def refresh(
        db: Session,
        instance: object,
    ) -> None:
        """
        Refresh SQLAlchemy instance.
        """

        db.refresh(instance)

    @staticmethod
    def commit_and_refresh(
        db: Session,
        instance: object,
    ) -> None:
        """
        Commit transaction and refresh object.
        """

        db.commit()
        db.refresh(instance)

    @staticmethod
    def rollback(
        db: Session,
    ) -> None:
        """
        Roll back current transaction.
        """

        db.rollback()

    @staticmethod
    def delete(
        db: Session,
        instance: object,
    ) -> None:
        """
        Delete an object.
        """

        db.delete(instance)
        db.commit()

    @staticmethod
    def flush(
        db: Session,
    ) -> None:
        """
        Flush pending SQL statements.
        """

        db.flush()