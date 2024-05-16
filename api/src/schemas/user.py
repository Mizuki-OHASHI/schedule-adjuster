from datetime import date, datetime
from enum import Enum
from typing import List, Optional

from pydantic import BaseModel, ConfigDict


class UserBase(BaseModel):
    role: "UserRole"
    name: str
    email: str
    birthday: Optional[date] = None


class UserRole(Enum):
    USER = "USER"
    ADMIN = "ADMIN"

    def __str__(self):
        return self.value


class UserGet(UserBase):
    id: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class UserCreate(UserBase):
    pass
