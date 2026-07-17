from __future__ import annotations

import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from app.core.config import settings


def send_email(to_email: str, subject: str, html_body: str) -> None:
    """
    Sends an HTML email via SMTP.

    If SMTP is not configured (no host/username in .env), the email
    is printed to the console instead — handy for local development.
    """

    if not settings.SMTP_HOST or not settings.SMTP_USERNAME:
        print(
            "\n===== EMAIL (DEV MODE - SMTP NOT CONFIGURED) =====\n"
            f"To: {to_email}\n"
            f"Subject: {subject}\n\n"
            f"{html_body}\n"
            "===================================================\n"
        )
        return

    message = MIMEMultipart("alternative")
    message["Subject"] = subject
    message["From"] = settings.SMTP_FROM_EMAIL or settings.SMTP_USERNAME
    message["To"] = to_email
    message.attach(MIMEText(html_body, "html"))

    with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT) as server:
        server.starttls()
        server.login(settings.SMTP_USERNAME, settings.SMTP_PASSWORD)
        server.sendmail(message["From"], to_email, message.as_string())


def send_password_reset_email(to_email: str, full_name: str, reset_link: str) -> None:
    subject = "Reset your Bake N Bite password"

    html_body = f"""
    <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto;">
      <h2 style="color:#f97316;">Bake N Bite</h2>
      <p>Hi {full_name or 'there'},</p>
      <p>
        We received a request to reset your password. Click the button
        below to choose a new one. This link expires in
        {settings.PASSWORD_RESET_TOKEN_EXPIRE_MINUTES} minutes.
      </p>
      <p style="text-align:center; margin: 32px 0;">
        <a href="{reset_link}"
           style="background:#f97316;color:#fff;padding:12px 24px;
                  border-radius:12px;text-decoration:none;font-weight:bold;">
          Reset Password
        </a>
      </p>
      <p style="color:#888;font-size:12px;">
        If you didn't request this, you can safely ignore this email.
      </p>
    </div>
    """

    send_email(to_email, subject, html_body)