from typing import List
from sqlalchemy.orm import Session

from src import models


def get_many_groups(
    session: Session, skip: int = 0, limit: int = 10
) -> List[models.Group]:
    return session.query(models.Group).offset(skip).limit(limit).all()


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
