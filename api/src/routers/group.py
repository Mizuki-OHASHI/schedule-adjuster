from random import randint
from typing import List

from fastapi import APIRouter, Depends, Request, HTTPException
from sqlalchemy.orm import Session

from src.crud import account, group
from src.database.database import session_factory
from src.models import Group
from src.schemas.account import AccountGet, AccountRole
from src.schemas.group import GroupCreate, GroupGet
from src.schemas.user import UserGet
from src.services.id import new_id
from src.services.auth import get_actor_from

router = APIRouter(tags=["group"])


def authentucation(user: UserGet, role: AccountRole, group_id: str):
    account = next(filter(lambda a: a.group_id == group_id, user.accounts), None)
    if account is None:
        raise HTTPException(status_code=401, detail="account not found")
    if not account.role.auth(role):
        raise HTTPException(status_code=401, detail="permission denied")
    return


@router.get("/groups")
def get_groups(
    req: Request, session: Session = Depends(session_factory)
) -> List[GroupGet]:
    # return list(map(GroupGet.model_validate, group.get_many_groups(session)))
    actor = get_actor_from(req)
    return list(
        map(GroupGet.model_validate, group.get_many_groups_by_user(session, actor.id))
    )


@router.get("/group/{group_id}")
def get_group(
    req: Request, group_id: str, session: Session = Depends(session_factory)
) -> GroupGet:
    authentucation(get_actor_from(req), AccountRole.USER, group_id)
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
    req: Request,
    group_id: str,
    groupCreate: GroupCreate,
    session: Session = Depends(session_factory),
) -> GroupGet:
    authentucation(get_actor_from(req), AccountRole.ADMIN, group_id)
    groupDto = Group(
        id=group_id, name=groupCreate.name, description=groupCreate.description
    )
    return GroupGet.model_validate(group.update_group(session, groupDto))


@router.get("/group/accounts/{group_id}")
def get_accounts_by_group(
    req: Request, group_id: str, session: Session = Depends(session_factory)
) -> List[AccountGet]:
    authentucation(get_actor_from(req), AccountRole.ADMIN, group_id)
    return list(
        map(
            AccountGet.model_validate,
            account.get_many_accounts(session, group_id=group_id),
        )
    )
