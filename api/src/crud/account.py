from typing import List
from sqlalchemy.orm import Session

from src.models import Account


def get_account(session: Session, account_id: str) -> Account:
    account = session.get(Account, account_id)
    if account is None:
        raise ValueError(f"Account with id {account_id} does not exist")
    return account


def get_many_accounts_by_group(
    session: Session, group_id: str, skip: int = 0, limit: int = 100
) -> List[Account]:
    return (
        session.query(Account)
        .filter(Account.group_id == group_id)
        .offset(skip)
        .limit(limit)
        .all()
    )


def add_account(session: Session, account: Account) -> Account:
    session.add(account)
    session.commit()
    session.refresh(account)
    return account


def add_many_accounts(session: Session, accounts: List[Account]) -> List[Account]:
    session.add_all(accounts)
    session.commit()
    session.refresh(accounts)
    return accounts


def upsert_account(session: Session, account: Account, auto_create=True) -> Account:
    target = session.get(Account, account.id)
    if target:
        target.role = account.role
        target.name = account.name
        session.commit()
        session.refresh(target)
        return target
    elif auto_create:
        session.add(account)
        session.commit()
        session.refresh(account)
        return account
    else:
        raise ValueError(f"Account with id {account.id} does not exist")


def update_many_accounts(session: Session, accounts: List[Account]) -> List[Account]:
    session.bulk_update_mappings(Account, accounts)
    session.commit()
    session.refresh(accounts)
    return accounts
