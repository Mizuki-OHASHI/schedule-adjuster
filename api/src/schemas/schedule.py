from datetime import datetime
from enum import Enum
from typing import Optional, List

from pydantic import BaseModel, ConfigDict


### Schedule Master ###


class ScheduleMasterBase(BaseModel):
    group_id: str
    status: "ScheduleMasterStatus"


class ScheduleMasterStatus(Enum):
    ADJUSTING = "ADJUSTING"
    ADJUSTED = "ADJUSTED"
    PENDING = "PENDING"
    CLOSED = "CLOSED"

    def __str__(self):
        return self.value


class ScheduleMasterGet(ScheduleMasterBase):
    id: str
    schedules: List["ScheduleGet"]
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class ScheduleMasterCreate(ScheduleMasterBase):
    pass


### Schedule ###


class ScheduleBase(BaseModel):
    schedule_master_id: str
    title: str
    description: Optional[str] = None
    startAt: datetime
    endAt: Optional[datetime] = None
    allDay: bool
    canceled: bool


class ScheduleGet(ScheduleBase):
    id: str
    config: "ScheduleConfigGet"
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class ScheduleCreate(ScheduleBase):
    pass


### Schedule Config ###


class ScheduleConfigBase(BaseModel):
    schedule_master_id: str


class ScheduleConfigGet(ScheduleConfigBase):
    constraints: List["ScheduleConstraintGet"]
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class ScheduleConfigCreate(ScheduleConfigBase):
    pass


### Schedule Constraint ###


class ScheduleConstraintBase(BaseModel):
    schedule_config_id: str
    prop_id: "ScheduleConstraintPropId"
    name: str
    constraints: dict


class ScheduleConstraintPropId(Enum):
    intProp1 = "intProp1"
    intProp2 = "intProp2"
    intProp3 = "intProp3"
    listProp1 = "listProp1"
    listProp2 = "listProp2"
    listProp3 = "listProp3"

    def __str__(self):
        return self.value


class ScheduleConstraintGet(ScheduleConstraintBase):
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class ScheduleConstraintCreate(ScheduleConstraintBase):
    pass
