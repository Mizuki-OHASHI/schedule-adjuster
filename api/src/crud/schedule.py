from typing import List

from sqlalchemy.orm import Session
from sqlalchemy import and_

from src.models import Schedule


def get_schedule(session: Session, schedule_id: str) -> Schedule:
    schedule = session.get(Schedule, schedule_id)
    if schedule is None:
        raise ValueError(f"Schedule with id {schedule_id} does not exist")
    return schedule


def get_many_schedules(
    session: Session, skip: int = 0, limit: int = 100, **kwargs
) -> List[Schedule]:
    filters = [getattr(Schedule, key) == value for key, value in kwargs.items()]
    return session.query(Schedule).filter(and_(filters)).offset(skip).limit(limit).all()


def add_schedule(session: Session, schedule: Schedule) -> Schedule:
    session.add(schedule)
    session.commit()
    session.refresh(schedule)
    return schedule


def add_many_schedules(session: Session, schedules: List[Schedule]) -> List[Schedule]:
    session.add_all(schedules)
    session.commit()
    session.refresh(schedules)
    return schedules


def upsert_schedule(session: Session, schedule: Schedule, auto_create=True) -> Schedule:
    target = session.get(Schedule, schedule.id)
    if target:
        target.schedule_master_id = schedule.schedule_master_id
        target.name = schedule.name
        target.description = schedule.description
        target.startAt = schedule.startAt
        target.endAt = schedule.endAt
        target.allDay = schedule.allDay
        target.canceled = schedule.canceled
        session.commit()
        session.refresh(target)
        return target
    elif auto_create:
        session.add(schedule)
        session.commit()
        session.refresh(schedule)
        return schedule
    else:
        raise ValueError(f"Schedule with id {schedule.id} does not exist")


def update_many_schedules(
    session: Session, schedules: List[Schedule]
) -> List[Schedule]:
    session.bulk_update_mappings(Schedule, schedules)
    session.commit()
    session.refresh(schedules)
    return schedules
