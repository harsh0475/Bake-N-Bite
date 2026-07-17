"""add google sign-in and password reset fields

Revision ID: 8a1f2c3d4e5f
Revises: 0456d0efdfcb
Create Date: 2026-07-06 00:00:00.000000
"""
from __future__ import annotations

from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision: str = '8a1f2c3d4e5f'
down_revision: Union[str, Sequence[str], None] = '0456d0efdfcb'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Phone and password are no longer strictly required
    # (Google sign-in accounts may not have either at first).
    op.alter_column('users', 'phone', existing_type=sa.String(length=15), nullable=True)
    op.alter_column('users', 'hashed_password', existing_type=sa.String(length=255), nullable=True)

    op.add_column('users', sa.Column('google_id', sa.String(length=255), nullable=True))
    op.add_column('users', sa.Column('reset_token', sa.String(length=255), nullable=True))
    op.add_column('users', sa.Column('reset_token_expires', sa.DateTime(timezone=True), nullable=True))

    op.create_index(op.f('ix_users_google_id'), 'users', ['google_id'], unique=True)
    op.create_index(op.f('ix_users_reset_token'), 'users', ['reset_token'], unique=True)


def downgrade() -> None:
    op.drop_index(op.f('ix_users_reset_token'), table_name='users')
    op.drop_index(op.f('ix_users_google_id'), table_name='users')

    op.drop_column('users', 'reset_token_expires')
    op.drop_column('users', 'reset_token')
    op.drop_column('users', 'google_id')

    op.alter_column('users', 'hashed_password', existing_type=sa.String(length=255), nullable=False)
    op.alter_column('users', 'phone', existing_type=sa.String(length=15), nullable=False)