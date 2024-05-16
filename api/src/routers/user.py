from random import randint
from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from src.crud import user
from src.database.database import session_factory
from src.models import User
from src.schemas.user import UserCreate, UserGet

router = APIRouter(tags=["user"])


@router.get("/users")
def get_users(session: Session = Depends(session_factory)) -> List[UserGet]:
    return list(map(UserGet.model_validate, user.get_many_users(session)))


@router.get("/user/{user_id}")
def get_user(user_id: str, session: Session = Depends(session_factory)) -> UserGet:
    return UserGet.model_validate(user.get_user(session, user_id))


@router.post("/user", response_model=UserCreate)
def add_user(
    userCreate: UserCreate, session: Session = Depends(session_factory)
) -> UserGet:
    id = str(randint(1000, 9999))
    userDto = User(
        id=id,
        name=userCreate.name,
        role=userCreate.role.value,
        email=userCreate.email,
        birthday=userCreate.birthday,
        accounts=[],
    )
    return UserGet.model_validate(user.add_user(session, userDto))


@router.post("/users", response_model=List[UserCreate])
def add_users(
    users: List[UserCreate], session: Session = Depends(session_factory)
) -> List[UserGet]:
    userDtos = [
        User(
            id=str(randint(1000, 9999)),
            name=user.name,
            role=user.role.value,
            email=user.email,
            birthday=user.birthday,
            accounts=[],
        )
        for user in users
    ]
    return list(map(UserGet.model_validate, user.add_many_users(session, userDtos)))


@router.put("/user/{user_id}", response_model=UserCreate)
def update_user(
    user_id: str, userCreate: UserCreate, session: Session = Depends(session_factory)
) -> UserGet:
    userDto = User(
        id=user_id,
        name=userCreate.name,
        role=userCreate.role.value,
        email=userCreate.email,
        birthday=userCreate.birthday,
        accounts=[],
    )
    return UserGet.model_validate(user.upsert_user(session, userDto))


@router.put("/users", response_model=List[UserCreate])
def update_users(
    users: List[UserCreate], session: Session = Depends(session_factory)
) -> List[UserGet]:
    userDtos = [
        User(
            id=user.id,
            name=user.name,
            role=user.role.value,
            email=user.email,
            birthday=user.birthday,
            accounts=[],
        )
        for user in users
    ]
    return list(map(UserGet.model_validate, user.update_many_users(session, userDtos)))
