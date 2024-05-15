from typing import List, Optional
from datetime import date, datetime

from sqlalchemy import Enum, ForeignKey, String, Date, DateTime, Boolean, ARRAY, JSON
from sqlalchemy.orm import (
    DeclarativeBase,
    Mapped,
    MappedAsDataclass,
    mapped_column,
    relationship,
)

from src.schemas.user import UserRole
from src.schemas.schedule import ScheduleMasterStatus, ScheduleConstraintPropId
from src.schemas.participant import ParticipantAvailability


class Base(DeclarativeBase):
    pass


class User(MappedAsDataclass, Base):
    __tablename__ = "users"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    role: Mapped[UserRole] = mapped_column(Enum("USER", "ADMIN"))
    name: Mapped[str] = mapped_column(String)
    email: Mapped[str] = mapped_column(String)
    birthday: Mapped[Optional[date]] = mapped_column(Date, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now)

    accounts: Mapped[List["Account"]] = relationship("Account")


class Group(MappedAsDataclass, Base):
    __tablename__ = "groups"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    name: Mapped[str] = mapped_column(String)
    description: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now)


class Account(MappedAsDataclass, Base):
    __tablename__ = "accounts"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    user_id: Mapped[str] = mapped_column(String, ForeignKey("users.id"))
    group_id: Mapped[str] = mapped_column(String, ForeignKey("groups.id"))
    role: Mapped[UserRole] = mapped_column(Enum("GUEST", "USER", "ADMIN"))
    name: Mapped[str] = mapped_column(String)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now)

    group: Mapped["Group"] = relationship("Group", uselist=False)


class ScheduleMaster(MappedAsDataclass, Base):
    __tablename__ = "schedule_masters"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    group_id: Mapped[str] = mapped_column(String, ForeignKey("groups.id"))
    status: Mapped[ScheduleMasterStatus] = mapped_column(
        Enum("ADJUSTING", "ADJUSTED", "PENDING", "CLOSED")
    )
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now)

    schedules: Mapped[List["Schedule"]] = relationship("Schedule")


class Schedule(MappedAsDataclass, Base):
    __tablename__ = "schedules"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    schedule_master_id: Mapped[str] = mapped_column(
        String, ForeignKey("schedule_masters.id")
    )
    title: Mapped[str] = mapped_column(String)
    description: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    startAt: Mapped[datetime] = mapped_column(DateTime)
    endAt: Mapped[Optional[datetime]] = mapped_column(DateTime, nullable=True)
    allDay: Mapped[bool] = mapped_column(Boolean)
    canceled: Mapped[bool] = mapped_column(Boolean)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now)

    config: Mapped["ScheduleConfig"] = relationship("ScheduleConfig", uselist=False)


class ScheduleConfig(MappedAsDataclass, Base):
    __tablename__ = "schedule_configs"

    schedule_master_id: Mapped[str] = mapped_column(
        String, ForeignKey("schedule_masters.id"), primary_key=True
    )

    constraints: Mapped[List["ScheduleConstraint"]] = relationship("ScheduleConstraint")


class ScheduleConstraint(MappedAsDataclass, Base):
    __tablename__ = "schedule_configs_props"

    schedule_config_id: Mapped[str] = mapped_column(
        String, ForeignKey("schedule_configs.schedule_master_id"), primary_key=True
    )
    prop_id: Mapped[ScheduleConstraintPropId] = mapped_column(
        Enum("intProp1", "intProp2", "intProp3", "listProp1", "listProp2", "listProp3"),
        primary_key=True,
    )
    name: Mapped[str] = mapped_column(String)
    constraints: Mapped[dict] = mapped_column(JSON)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now)


class Participant(MappedAsDataclass, Base):
    __tablename__ = "participants"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    schedule_id: Mapped[str] = mapped_column(String, ForeignKey("schedules.id"))
    user_id: Mapped[str] = mapped_column(String, ForeignKey("users.id"))
    toParticipate: Mapped[bool] = mapped_column(Boolean, default=False)
    availability: Mapped[Optional[ParticipantAvailability]] = mapped_column(
        Enum("YES", "MAYBE", "NO"), nullable=True, default=None
    )
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now)

    user: Mapped["User"] = relationship("User", uselist=False)
    profile: Mapped["ParticipantProfile"] = relationship(
        "ParticipantProfile", uselist=False
    )


class ParticipantProfile(MappedAsDataclass, Base):
    __tablename__ = "participant_profiles"

    participant_id: Mapped[str] = mapped_column(
        String, ForeignKey("participants.id"), primary_key=True
    )
    intProp1: Mapped[Optional[int]] = mapped_column(String, nullable=True)
    intProp2: Mapped[Optional[int]] = mapped_column(String, nullable=True)
    intProp3: Mapped[Optional[int]] = mapped_column(String, nullable=True)
    listProp1: Mapped[Optional[List[str]]] = mapped_column(ARRAY(String), nullable=True)
    listProp2: Mapped[Optional[List[str]]] = mapped_column(ARRAY(String), nullable=True)
    listProp3: Mapped[Optional[List[str]]] = mapped_column(ARRAY(String), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now)
