from fastapi import APIRouter, status

from app.core.config import settings
from app.core.email import send_email
from app.schemas.contact import (
    ContactMessageRequest,
    ContactMessageResponse,
)

router = APIRouter(
    prefix="/contact",
    tags=["Contact"],
)


@router.post(
    "/send-message",
    response_model=ContactMessageResponse,
    status_code=status.HTTP_200_OK,
)
def send_contact_message(
    payload: ContactMessageRequest,
):
    """
    Forwards a message from the public Contact Us page to the
    store's admin inbox. Uses the same SMTP config as password
    reset emails (see app/core/email.py).
    """

    admin_email = settings.ADMIN_EMAIL or settings.SMTP_FROM_EMAIL

    if admin_email:
        html_body = f"""
        <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto;">
          <h2 style="color:#f97316;">New Contact Message — Bake N Bite</h2>
          <p><strong>Name:</strong> {payload.name}</p>
          <p><strong>Email:</strong> {payload.email}</p>
          <p><strong>Phone:</strong> {payload.phone or '-'}</p>
          <p><strong>Subject:</strong> {payload.subject}</p>
          <p style="white-space: pre-line;"><strong>Message:</strong><br/>{payload.message}</p>
        </div>
        """

        send_email(
            admin_email,
            f"New Contact Message: {payload.subject}",
            html_body,
        )

    return ContactMessageResponse(
        message="Thanks for reaching out! We'll get back to you shortly.",
    )