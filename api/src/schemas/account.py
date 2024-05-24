from datetime import datetime
from enum import Enum

from pydantic import BaseModel, ConfigDict

from src.schemas.group import GroupGet


class AccountBase(BaseModel):
    user_id: str
    group_id: str
    role: "AccountRole"
    name: str


class AccountRole(Enum):
    GUEST = "GUEST"
    USER = "USER"
    ADMIN = "ADMIN"

    def __str__(self):
        return self.value

    def auth(self, role: "AccountRole"):
        if self == AccountRole.ADMIN:
            return True
        if self == AccountRole.USER:
            return role != AccountRole.ADMIN
        return False


class AccountGet(AccountBase):
    id: str
    created_at: datetime
    group: GroupGet

    model_config = ConfigDict(from_attributes=True)


class AccountCreate(AccountBase):
    pass
