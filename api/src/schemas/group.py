from typing import Optional

from pydantic import BaseModel, ConfigDict


class GroupBase(BaseModel):
    name: str
    description: Optional[str] = None


class GroupGet(GroupBase):
    id: str

    model_config = ConfigDict(from_attributes=True)


class GroupCreate(GroupBase):
    pass
