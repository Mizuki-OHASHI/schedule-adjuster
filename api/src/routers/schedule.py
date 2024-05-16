from random import randint
from typing import List
from datetime import datetime

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from src.crud import schedule
from src.database.database import session_factory
from src.models import Schedule, ScheduleMaster
from src.schemas.schedule import ScheduleCreate, ScheduleGet

router = APIRouter()


@router.get("/schedules")
def get_schedules(session: Session = Depends(session_factory)) -> List[ScheduleGet]:
    return list(map(ScheduleGet.model_validate, schedule.get_many_schedules(session)))


@router.get("/schedule/{schedule_id}")
def get_schedule(
    schedule_id: str, session: Session = Depends(session_factory)
) -> ScheduleGet:
    return ScheduleGet.model_validate(schedule.get_schedule(session, schedule_id))


@router.post("/schedule", response_model=ScheduleCreate)
def add_schedule(
    scheduleCreate: ScheduleCreate, session: Session = Depends(session_factory)
) -> ScheduleGet:
    id = str(randint(1000, 9999))
    schedule_master = session.get(ScheduleMaster, scheduleCreate.schedule_master_id)
    if not schedule_master:
        raise ValueError("Invalid schedule_master_id")
    scheduleDto = Schedule(
        id=id,
        schedule_master_id=scheduleCreate.schedule_master_id,
        name=scheduleCreate.name,
        description=scheduleCreate.description,
        startAt=scheduleCreate.startAt,
        endAt=scheduleCreate.endAt,
        allDay=scheduleCreate.allDay,
        canceled=scheduleCreate.canceled,
    )
    return ScheduleGet.model_validate(schedule.add_schedule(session, scheduleDto))


@router.post("/schedules", response_model=List[ScheduleCreate])
def add_schedules(
    schedules: List[ScheduleCreate], session: Session = Depends(session_factory)
) -> List[ScheduleGet]:
    scheduleDtos = []
    for sched in schedules:
        schedule_master = session.get(ScheduleMaster, sched.schedule_master_id)
        if not schedule_master:
            raise ValueError("Invalid schedule_master_id")
        scheduleDtos.append(
            Schedule(
                id=str(randint(1000, 9999)),
                schedule_master_id=sched.schedule_master_id,
                name=sched.name,
                description=sched.description,
                startAt=sched.startAt,
                endAt=sched.endAt,
                allDay=sched.allDay,
                canceled=sched.canceled,
            )
        )
    return list(
        map(
            ScheduleGet.model_validate,
            schedule.add_many_schedules(session, scheduleDtos),
        )
    )


@router.put("/schedule/{schedule_id}", response_model=ScheduleCreate)
def update_schedule(
    schedule_id: str,
    scheduleCreate: ScheduleCreate,
    session: Session = Depends(session_factory),
) -> ScheduleGet:
    schedule_master = session.get(ScheduleMaster, scheduleCreate.schedule_master_id)
    if not schedule_master:
        raise ValueError("Invalid schedule_master_id")
    scheduleDto = Schedule(
        id=schedule_id,
        schedule_master_id=scheduleCreate.schedule_master_id,
        name=scheduleCreate.name,
        description=scheduleCreate.description,
        startAt=scheduleCreate.startAt,
        endAt=scheduleCreate.endAt,
        allDay=scheduleCreate.allDay,
        canceled=scheduleCreate.canceled,
    )
    return ScheduleGet.model_validate(schedule.upsert_schedule(session, scheduleDto))


@router.put("/schedules", response_model=List[ScheduleCreate])
def update_schedules(
    schedules: List[ScheduleCreate], session: Session = Depends(session_factory)
) -> List[ScheduleGet]:
    scheduleDtos = []
    for sched in schedules:
        schedule_master = session.get(ScheduleMaster, sched.schedule_master_id)
        if not schedule_master:
            raise ValueError("Invalid schedule_master_id")
        scheduleDtos.append(
            Schedule(
                id=sched.id,
                schedule_master_id=sched.schedule_master_id,
                name=sched.name,
                description=sched.description,
                startAt=sched.startAt,
                endAt=sched.endAt,
                allDay=sched.allDay,
                canceled=sched.canceled,
            )
        )
    return list(
        map(
            ScheduleGet.model_validate,
            schedule.update_many_schedules(session, scheduleDtos),
        )
    )
