from random import randint
from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from src.crud import account
from src.database.database import session_factory
from src.models import Account, User, Group
from src.schemas.account import AccountCreate, AccountGet

router = APIRouter(tags=["account"])


@router.get("/account/{account_id}")
def get_account(
    account_id: str, session: Session = Depends(session_factory)
) -> AccountGet:
    return AccountGet.model_validate(account.get_account(session, account_id))


@router.post("/account", response_model=AccountCreate)
def add_account(
    accountCreate: AccountCreate, session: Session = Depends(session_factory)
) -> AccountGet:
    id = str(randint(1000, 9999))
    user = session.get(User, accountCreate.user_id)
    group = session.get(Group, accountCreate.group_id)
    if not user or not group:
        raise ValueError("Invalid user_id or group_id")
    accountDto = Account(
        id=id,
        user_id=accountCreate.user_id,
        group_id=accountCreate.group_id,
        role=accountCreate.role.value,
        name=accountCreate.name,
    )
    return AccountGet.model_validate(account.add_account(session, accountDto))


@router.post("/accounts", response_model=List[AccountCreate])
def add_accounts(
    accounts: List[AccountCreate], session: Session = Depends(session_factory)
) -> List[AccountGet]:
    accountDtos = []
    for acc in accounts:
        user = session.get(User, acc.user_id)
        group = session.get(Group, acc.group_id)
        if not user or not group:
            raise ValueError("Invalid user_id or group_id")
        accountDtos.append(
            Account(
                id=str(randint(1000, 9999)),
                user_id=acc.user_id,
                group_id=acc.group_id,
                role=acc.role.value,
                name=acc.name,
            )
        )
    return list(
        map(AccountGet.model_validate, account.add_many_accounts(session, accountDtos))
    )


@router.put("/account/{account_id}", response_model=AccountCreate)
def update_account(
    account_id: str,
    accountCreate: AccountCreate,
    session: Session = Depends(session_factory),
) -> AccountGet:
    user = session.get(User, accountCreate.user_id)
    group = session.get(Group, accountCreate.group_id)
    if not user or not group:
        raise ValueError("Invalid user_id or group_id")
    accountDto = Account(
        id=account_id,
        user_id=accountCreate.user_id,
        group_id=accountCreate.group_id,
        role=accountCreate.role.value,
        name=accountCreate.name,
    )
    return AccountGet.model_validate(account.upsert_account(session, accountDto))


@router.put("/accounts", response_model=List[AccountCreate])
def update_accounts(
    accounts: List[AccountCreate], session: Session = Depends(session_factory)
) -> List[AccountGet]:
    accountDtos = []
    for acc in accounts:
        user = session.get(User, acc.user_id)
        group = session.get(Group, acc.group_id)
        if not user or not group:
            raise ValueError("Invalid user_id or group_id")
        accountDtos.append(
            Account(
                id=acc.id,
                user_id=acc.user_id,
                group_id=acc.group_id,
                role=acc.role.value,
                name=acc.name,
            )
        )
    return list(
        map(
            AccountGet.model_validate,
            account.update_many_accounts(session, accountDtos),
        )
    )
