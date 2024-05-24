from typing import List

from sqlalchemy.orm import Session

from src.models import User


def get_user(session: Session, user_id: str) -> User:
    user = session.get(User, user_id)
    if user is None:
        raise ValueError(f"User with id {user_id} does not exist")
    return user


def get_many_users(
    session: Session, skip: int = 0, limit: int = 100, **kwargs
) -> List[User]:
    filters = [getattr(User, key) == value for key, value in kwargs.items()]
    return session.query(User).filter(*filters).offset(skip).limit(limit).all()


def add_user(session: Session, user: User) -> User:
    session.add(user)
    session.commit()
    session.refresh(user)
    return user


def add_many_users(session: Session, users: List[User]) -> None:
    session.add_all(users)
    session.commit()
    # FIXME: N+1 problem
    for user in users:
        session.refresh(user)
    return users


def upsert_user(session: Session, user: User, auto_create=True) -> User:
    target = session.get(User, user.id)
    if target:
        target.name = user.name
        target.role = user.role
        target.birthday = user.birthday
        session.commit()
        session.refresh(target)
        return target
    elif auto_create:
        session.add(user)
        session.commit()
        session.refresh(user)
        return user
    else:
        raise ValueError(f"User with id {user.id} does not exist")


def update_many_users(session: Session, users: List[User]) -> List[User]:
    session.bulk_update_mappings(User, users)
    session.commit()
    session.refresh(users)
    return users
