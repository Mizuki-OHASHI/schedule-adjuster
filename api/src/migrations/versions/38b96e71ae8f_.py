"""init

Revision ID: 38b96e71ae8f
Revises: 
Create Date: 2024-05-16 02:04:13.387249

"""

from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision: str = "38b96e71ae8f"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "groups",
        sa.Column("id", sa.String(), nullable=False),
        sa.Column("name", sa.String(), nullable=False),
        sa.Column("description", sa.String(), nullable=True),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "users",
        sa.Column("id", sa.String(), nullable=False),
        sa.Column("role", sa.Enum("USER", "ADMIN"), nullable=False),
        sa.Column("name", sa.String(), nullable=False),
        sa.Column("email", sa.String(), nullable=False),
        sa.Column("birthday", sa.Date(), nullable=True),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "accounts",
        sa.Column("id", sa.String(), nullable=False),
        sa.Column("user_id", sa.String(), nullable=False),
        sa.Column("group_id", sa.String(), nullable=False),
        sa.Column("role", sa.Enum("GUEST", "USER", "ADMIN"), nullable=False),
        sa.Column("name", sa.String(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(
            ["group_id"],
            ["groups.id"],
        ),
        sa.ForeignKeyConstraint(
            ["user_id"],
            ["users.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "schedule_masters",
        sa.Column("id", sa.String(), nullable=False),
        sa.Column("name", sa.String(), nullable=False),
        sa.Column("description", sa.String(), nullable=True),
        sa.Column("group_id", sa.String(), nullable=False),
        sa.Column(
            "status",
            sa.Enum("ADJUSTING", "ADJUSTED", "PENDING", "CLOSED"),
            nullable=False,
        ),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(
            ["group_id"],
            ["groups.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("group_id", "name"),
    )
    op.create_table(
        "schedule_configs",
        sa.Column("schedule_master_id", sa.String(), nullable=False),
        sa.ForeignKeyConstraint(
            ["schedule_master_id"],
            ["schedule_masters.id"],
        ),
        sa.PrimaryKeyConstraint("schedule_master_id"),
    )
    op.create_table(
        "schedules",
        sa.Column("id", sa.String(), nullable=False),
        sa.Column("schedule_master_id", sa.String(), nullable=False),
        sa.Column("name", sa.String(), nullable=False),
        sa.Column("description", sa.String(), nullable=True),
        sa.Column("startAt", sa.DateTime(), nullable=False),
        sa.Column("endAt", sa.DateTime(), nullable=True),
        sa.Column("allDay", sa.Boolean(), nullable=False),
        sa.Column("canceled", sa.Boolean(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(
            ["schedule_master_id"],
            ["schedule_masters.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("schedule_master_id", "name"),
    )
    op.create_table(
        "participants",
        sa.Column("id", sa.String(), nullable=False),
        sa.Column("schedule_id", sa.String(), nullable=False),
        sa.Column("user_id", sa.String(), nullable=False),
        sa.Column("toParticipate", sa.Boolean(), nullable=False),
        sa.Column("availability", sa.Enum("YES", "MAYBE", "NO"), nullable=True),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(
            ["schedule_id"],
            ["schedules.id"],
        ),
        sa.ForeignKeyConstraint(
            ["user_id"],
            ["users.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "schedule_configs_props",
        sa.Column("schedule_config_id", sa.String(), nullable=False),
        sa.Column(
            "prop_id",
            sa.Enum(
                "intProp1",
                "intProp2",
                "intProp3",
                "listProp1",
                "listProp2",
                "listProp3",
            ),
            nullable=False,
        ),
        sa.Column("name", sa.String(), nullable=False),
        sa.Column("constraints", sa.JSON(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(
            ["schedule_config_id"],
            ["schedule_configs.schedule_master_id"],
        ),
        sa.PrimaryKeyConstraint("schedule_config_id", "prop_id"),
    )
    op.create_table(
        "participant_profiles",
        sa.Column("participant_id", sa.String(), nullable=False),
        sa.Column("intProp1", sa.Integer(), nullable=True),
        sa.Column("intProp2", sa.Integer(), nullable=True),
        sa.Column("intProp3", sa.Integer(), nullable=True),
        sa.Column("listProp1", sa.JSON(), nullable=True),
        sa.Column("listProp2", sa.JSON(), nullable=True),
        sa.Column("listProp3", sa.JSON(), nullable=True),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(
            ["participant_id"],
            ["participants.id"],
        ),
        sa.PrimaryKeyConstraint("participant_id"),
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table("participant_profiles")
    op.drop_table("schedule_configs_props")
    op.drop_table("participants")
    op.drop_table("schedules")
    op.drop_table("schedule_configs")
    op.drop_table("schedule_masters")
    op.drop_table("accounts")
    op.drop_table("users")
    op.drop_table("groups")
    # ### end Alembic commands ###
