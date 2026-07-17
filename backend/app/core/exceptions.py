from __future__ import annotations

from fastapi import HTTPException, status


class AuthenticationError(HTTPException):
    def __init__(
        self,
        detail: str = "Invalid credentials",
    ) -> None:

        super().__init__(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=detail,
            headers={
                "WWW-Authenticate": "Bearer",
            },
        )


class AuthorizationError(HTTPException):
    def __init__(
        self,
        detail: str = "Permission denied",
    ) -> None:

        super().__init__(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=detail,
        )


class NotFoundError(HTTPException):
    def __init__(
        self,
        detail: str = "Resource not found",
    ) -> None:

        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=detail,
        )


class BadRequestError(HTTPException):
    def __init__(
        self,
        detail: str,
    ) -> None:

        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=detail,
        )


class ConflictError(HTTPException):
    def __init__(
        self,
        detail: str,
    ) -> None:

        super().__init__(
            status_code=status.HTTP_409_CONFLICT,
            detail=detail,
        )