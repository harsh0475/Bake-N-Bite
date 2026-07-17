from __future__ import annotations

from pydantic import BaseModel


# ==========================================================
# JWT Access Token Response
# ==========================================================

class Token(BaseModel):
    access_token: str

    token_type: str = "bearer"


# ==========================================================
# JWT Token Payload
# ==========================================================

class TokenPayload(BaseModel):
    sub: str

    exp: int