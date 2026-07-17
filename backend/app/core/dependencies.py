from __future__ import annotations

from jose import JWTError
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.security import decode_access_token
from app.db.models.user import User, UserRole
from app.db.session import get_db
from app.repositories.user_repository import user_repository

# ==========================================================
# OAuth2
# ==========================================================

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl=f"{settings.API_V1_PREFIX}/auth/login",
)

# ==========================================================
# Current User
# ==========================================================


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
) -> User:

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={
            "WWW-Authenticate": "Bearer",
        },
    )

    try:

        payload = decode_access_token(token)

        if payload is None:
            raise credentials_exception

        user_id = payload.get("sub")

        if user_id is None:
            raise credentials_exception

    except JWTError:
        raise credentials_exception

    user = user_repository.get_by_id(
        db,
        int(user_id),
    )

    if user is None:
        raise credentials_exception

    return user


# ==========================================================
# Active User
# ==========================================================


def get_current_active_user(
    current_user: User = Depends(get_current_user),
) -> User:

    if not current_user.is_active:

        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Inactive account",
        )

    return current_user


# ==========================================================
# Verified User
# ==========================================================


def get_current_verified_user(
    current_user: User = Depends(get_current_active_user),
) -> User:

    if not current_user.is_verified:

        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Email not verified",
        )

    return current_user


# ==========================================================
# Admin User
# ==========================================================


def get_current_admin(
    current_user: User = Depends(get_current_active_user),
) -> User:

    if current_user.role != UserRole.ADMIN:

        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Administrator access required",
        )

    return current_user