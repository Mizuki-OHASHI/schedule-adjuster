from enum import Enum
from typing import List

from pydantic import BaseModel, ConfigDict

from src.schemas.group import GroupGet


class UserRole(Enum):
    GUEST = "GUEST"
    USER = "USER"
    ADMIN = "ADMIN"


class UserBase(BaseModel):
    name: str
    role: UserRole


class UserGet(UserBase):
    id: str
    groups: List[GroupGet]

    model_config = ConfigDict(from_attributes=True)


class UserCreate(UserBase):
    pass
