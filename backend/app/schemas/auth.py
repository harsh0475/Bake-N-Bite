from __future__ import annotations

from pydantic import BaseModel, ConfigDict, EmailStr, Field

from app.db.models.user import UserRole


# ==========================================================
# Register Request
# ==========================================================

class RegisterRequest(BaseModel):
    full_name: str = Field(
        ...,
        min_length=2,
        max_length=100,
    )

    email: EmailStr

    phone: str = Field(
        ...,
        min_length=10,
        max_length=15,
    )

    password: str = Field(
        ...,
        min_length=8,
        max_length=128,
    )


# ==========================================================
# Google Sign-In
# ==========================================================

class GoogleLoginRequest(BaseModel):
    credential: str = Field(
        ...,
        description="Google ID Token returned by Google Sign-In",
    )


# ==========================================================
# Send OTP (Future)
# ==========================================================

class SendOTPRequest(BaseModel):
    phone: str = Field(
        ...,
        min_length=10,
        max_length=15,
    )


# ==========================================================
# Verify OTP (Future)
# ==========================================================

class VerifyOTPRequest(BaseModel):
    phone: str = Field(
        ...,
        min_length=10,
        max_length=15,
    )

    otp: str = Field(
        ...,
        min_length=4,
        max_length=8,
    )


# ==========================================================
# Forgot Password
# ==========================================================

class ForgotPasswordRequest(BaseModel):
    email: EmailStr


# ==========================================================
# Reset Password
# ==========================================================

class ResetPasswordRequest(BaseModel):
    token: str

    new_password: str = Field(
        ...,
        min_length=8,
        max_length=128,
    )


# ==========================================================
# Change Password
# ==========================================================

class ChangePassword(BaseModel):
    current_password: str

    new_password: str = Field(
        ...,
        min_length=8,
        max_length=128,
    )


# ==========================================================
# Refresh Token (Future)
# ==========================================================

class RefreshTokenRequest(BaseModel):
    refresh_token: str


# ==========================================================
# Authentication Response
# ==========================================================

class AuthResponse(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
    )

    access_token: str

    token_type: str = "bearer"

    user_id: int

    full_name: str

    email: EmailStr

    role: UserRole

    is_verified: bool
    
# ==========================================================
# Generic Message Response
# ==========================================================

class MessageResponse(BaseModel):
    message: str