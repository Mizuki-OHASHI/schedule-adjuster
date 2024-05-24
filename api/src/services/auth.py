from fastapi import Request, HTTPException
from src.schemas.user import UserGet, UserRole


def is_admin(user: UserGet) -> bool:
    return user.role == UserRole.ADMIN


def get_actor_from(req: Request) -> UserGet:
    try:
        actor = req.state.actor
    except AttributeError:
        raise HTTPException(status_code=401, detail="user not found")
    if not isinstance(actor, UserGet):
        raise HTTPException(status_code=401, detail="user not found")
    return actor
