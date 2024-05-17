from random import randint
from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from src.crud import account, group
from src.database.database import session_factory
from src.models import Group
from src.schemas.account import AccountGet
from src.schemas.group import GroupCreate, GroupGet
from src.services.id import new_id

router = APIRouter(tags=["group"])


@router.get("/groups")
def get_groups(session: Session = Depends(session_factory)) -> List[GroupGet]:
    return list(map(GroupGet.model_validate, group.get_many_groups(session)))


@router.get("/group/{group_id}")
def get_group(group_id: str, session: Session = Depends(session_factory)) -> GroupGet:
    return GroupGet.model_validate(group.get_group(session, group_id))


@router.post("/group", response_model=GroupCreate)
def add_group(
    groupCreate: GroupCreate, session: Session = Depends(session_factory)
) -> GroupGet:
    id = new_id()
    groupDto = Group(id=id, name=groupCreate.name, description=groupCreate.description)
    return GroupGet.model_validate(group.add_group(session, groupDto))


@router.put("/group/{group_id}", response_model=GroupCreate)
def update_group(
    group_id: str, groupCreate: GroupCreate, session: Session = Depends(session_factory)
) -> GroupGet:
    groupDto = Group(
        id=group_id, name=groupCreate.name, description=groupCreate.description
    )
    return GroupGet.model_validate(group.update_group(session, groupDto))


@router.get("/group/accounts/{group_id}")
def get_accounts_by_group(
    group_id: str, session: Session = Depends(session_factory)
) -> List[AccountGet]:
    return list(
        map(
            AccountGet.model_validate,
            account.get_many_accounts(session, group_id=group_id),
        )
    )
