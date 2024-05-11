from src.routers import group, me, user

router_list = [
    me.router,
    user.router,
    group.router,
]
