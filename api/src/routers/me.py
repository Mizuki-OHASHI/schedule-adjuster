from fastapi import APIRouter

from src.schemas.user import UserGet, UserRole

router = APIRouter()


@router.get("/me")
def getMe() -> UserGet:
    return UserGet(id="ID", name="NAME", role=UserRole.USER, group_id="GROUP_ID")
