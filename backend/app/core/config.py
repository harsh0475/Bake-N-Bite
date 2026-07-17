from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """
    Application settings loaded from the .env file.
    """

    # ==========================================================
    # Project Settings
    # ==========================================================

    PROJECT_NAME: str = "Bake N Bite API"

    VERSION: str = "1.0.0"

    API_V1_PREFIX: str = "/api/v1"

    DEBUG: bool = Field(
        default=False,
        description="Enable debug mode",
    )

    ENVIRONMENT: str = Field(
        default="development",
        description="Application environment",
    )

    # ==========================================================
    # Database
    # ==========================================================

    DATABASE_URL: str = Field(
        ...,
        description="PostgreSQL database connection URL",
    )

    # ==========================================================
    # JWT Authentication
    # ==========================================================

    SECRET_KEY: str = Field(
        ...,
        description="Secret key used for JWT generation",
    )

    ALGORITHM: str = "HS256"

    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    # ==========================================================
    # Frontend / Password Reset
    # ==========================================================

    FRONTEND_URL: str = Field(
        default="http://localhost:5173",
        description="Frontend URL",
    )

    PASSWORD_RESET_TOKEN_EXPIRE_MINUTES: int = 30

    # ==========================================================
    # Google OAuth
    # ==========================================================

    GOOGLE_CLIENT_ID: str = ""
    

    # ==========================================================
    # Razorpay
    # ==========================================================

    RAZORPAY_KEY_ID: str = Field(
        default="",
        description="Razorpay API Key ID",
    )

    RAZORPAY_KEY_SECRET: str = Field(
        default="",
        description="Razorpay API Secret",
    )

    RAZORPAY_WEBHOOK_SECRET: str = Field(
        default="",
        description="Razorpay Webhook Secret",
    )

    # ==========================================================
    # Payment Settings
    # ==========================================================

    COD_ENABLED: bool = True

    UPI_ID: str = ""

    UPI_NAME: str = "Bake N Bite"

    CURRENCY: str = "INR"

    # ==========================================================
    # CORS
    # ==========================================================

    BACKEND_CORS_ORIGINS: list[str] = Field(
        default=["http://localhost:5173"],
        description="Allowed CORS origins",
    )

    # ==========================================================
    # Admin Settings
    # ==========================================================

    ADMIN_EMAIL: str = ""

    # ==========================================================
    # Email (Future)
    # ==========================================================

    SMTP_HOST: str = ""

    SMTP_PORT: int = 587

    SMTP_USERNAME: str = ""

    SMTP_PASSWORD: str = ""

    SMTP_FROM_EMAIL: str = ""

    # ==========================================================
    # Pydantic Settings
    # ==========================================================

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore",
    )
    
    # ==========================================================
    # Cloudinary
    # ==========================================================

    CLOUDINARY_CLOUD_NAME: str = ""

    CLOUDINARY_API_KEY: str = ""

    CLOUDINARY_API_SECRET: str = ""


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()