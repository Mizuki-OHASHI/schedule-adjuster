from random import randint

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from src.crud import user
from src.database.database import session_factory
from src.models import User
from src.schemas.user import UserCreate, UserGet

router = APIRouter()


@router.get("/users")
def get_users(session: Session = Depends(session_factory)) -> list[UserGet]:
    return list(map(UserGet.model_validate, user.get_many_users(session)))


@router.post("/user", response_model=UserCreate)
def add_user(
    userCreate: UserCreate, session: Session = Depends(session_factory)
) -> UserGet:
    id = str(randint(1000, 9999))
    userDto = User(id=id, name=userCreate.name, role=userCreate.role.value, groups=[])
    return UserGet.model_validate(user.add_user(session, userDto))
