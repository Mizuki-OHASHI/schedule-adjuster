from sqlalchemy.orm import Session

from src import models


def get_user(session: Session, user_id: str) -> models.User:
    return session.query(models.User).filter(models.User.id == user_id).first()


def get_many_users(
    session: Session, skip: int = 0, limit: int = 100
) -> list[models.User]:
    return session.query(models.User).offset(skip).limit(limit).all()


def add_user(session: Session, user: models.User) -> models.User:
    session.add(user)
    session.commit()
    session.refresh(user)
    return user
