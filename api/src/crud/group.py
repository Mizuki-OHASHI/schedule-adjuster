from typing import List

from sqlalchemy import and_
from sqlalchemy.orm import Session

from src import models


def get_group(session: Session, group_id: str) -> models.Group:
    group = session.get(models.Group, group_id)
    if group is None:
        raise ValueError(f"Group with id {group_id} does not exist")
    return group


def get_many_groups(
    session: Session, skip: int = 0, limit: int = 10, **kwargs
) -> List[models.Group]:
    filters = [getattr(models.Group, key) == value for key, value in kwargs.items()]
    return (
        session.query(models.Group)
        .filter(and_(*filters))
        .offset(skip)
        .limit(limit)
        .all()
    )


def get_many_groups_by_user(
    session: Session, user_id: str, skip: int = 0, limit: int = 10
) -> List[models.Group]:
    return (
        session.query(models.Group)
        .join(models.Account)
        .filter(models.Account.user_id == user_id)
        .offset(skip)
        .limit(limit)
        .all()
    )


def add_group(session: Session, group: models.Group) -> models.Group:
    session.add(group)
    session.commit()
    session.refresh(group)
    return group


def update_group(session: Session, group: models.Group) -> models.Group:
    target = session.get(models.Group, group.id)
    if target is None:
        raise ValueError(f"Group with id {group.id} does not exist")
    target.name = group.name
    target.description = group.description
    session.commit()
    session.refresh(target)
    return target
