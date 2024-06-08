"""add course counter

Revision ID: 02e0948e42bd
Revises: ec46516905de
Create Date: 2024-06-08 03:41:49.404639

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '02e0948e42bd'
down_revision: Union[str, None] = 'ec46516905de'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('courses', sa.Column('counter', sa.Integer(), nullable=False))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('courses', 'counter')
    # ### end Alembic commands ###