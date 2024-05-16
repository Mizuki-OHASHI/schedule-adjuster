from datetime import datetime
from enum import Enum
from typing import List, Optional

from pydantic import BaseModel, ConfigDict

from src.schemas.user import UserGet

### Participant ###


class ParticipantBase(BaseModel):
    schedule_id: str
    user_id: str
    toParticipate: bool
    availability: Optional["ParticipantAvailability"] = None


class ParticipantAvailability(Enum):
    YES = "YES"
    MAYBE = "MAYBE"
    NO = "NO"

    def __str__(self):
        return self.value


class ParticipantGet(ParticipantBase):
    id: str
    user: "UserGet"
    prodile: "ParticipantProfileGet"
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class ParticipantCreate(ParticipantBase):
    pass


### Participant Profile ###


class ParticipantProfileBase(BaseModel):
    participant_id: str
    intProp1: Optional[int] = None
    intProp2: Optional[int] = None
    intProp3: Optional[int] = None
    listProp1: Optional[List[str]] = None
    listProp2: Optional[List[str]] = None
    listProp3: Optional[List[str]] = None


class ParticipantProfileGet(ParticipantProfileBase):
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class PartcipantProfileCreate(ParticipantProfileBase):
    pass
