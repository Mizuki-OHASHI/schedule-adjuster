from sqlalchemy.orm import Session

from src import models


def get_groups(session: Session, skip: int = 0, limit: int = 10) -> list[models.Group]:
    return session.query(models.Group).offset(skip).limit(limit).all()


def add_group(session: Session, group: models.Group) -> models.Group:
    session.add(group)
    session.commit()
    session.refresh(group)
    return group
