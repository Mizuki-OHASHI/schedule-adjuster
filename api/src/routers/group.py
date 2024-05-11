from random import randint

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from src.crud import group
from src.database.database import session_factory
from src.models import Group
from src.schemas.group import GroupCreate, GroupGet

router = APIRouter()


@router.get("/groups")
def get_groups(session: Session = Depends(session_factory)) -> list[GroupGet]:
    return list(map(GroupGet.model_validate, group.get_groups(session)))


@router.post("/group", response_model=GroupCreate)
def add_group(
    groupCreate: GroupCreate, session: Session = Depends(session_factory)
) -> GroupGet:
    id = str(randint(1000, 9999))
    groupDto = Group(id=id, name=groupCreate.name, description=groupCreate.description)
    return GroupGet.model_validate(group.add_group(session, groupDto))
