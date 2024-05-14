from typing import List

from sqlalchemy import Enum, ForeignKey, String
from sqlalchemy.orm import (
    DeclarativeBase,
    Mapped,
    MappedAsDataclass,
    mapped_column,
    relationship,
)

from src.schemas.user import UserRole


class Base(DeclarativeBase):
    pass


class Group(MappedAsDataclass, Base):
    __tablename__ = "groups"
    id: Mapped[str] = mapped_column(String, primary_key=True)
    name: Mapped[str] = mapped_column(String)
    description: Mapped[str] = mapped_column(String)


class User(MappedAsDataclass, Base):
    __tablename__ = "users"
    id: Mapped[str] = mapped_column(String, primary_key=True)
    name: Mapped[str] = mapped_column(String)
    role: Mapped[UserRole] = mapped_column(Enum("GUEST", "USER", "ADMIN"))
    groups: Mapped[List[Group]] = relationship("Group", secondary="user_groups")


class UserGroup(MappedAsDataclass, Base):
    __tablename__ = "user_groups"
    user_id: Mapped[str] = mapped_column(
        String, ForeignKey("users.id"), primary_key=True
    )
    group_id: Mapped[str] = mapped_column(
        String, ForeignKey("groups.id"), primary_key=True
    )
