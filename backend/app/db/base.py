from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    """
    Base class for all SQLAlchemy ORM models.

    Every database model should inherit from this class.
    Example:

    class User(Base):
        __tablename__ = "users"
        ...
    """

    pass