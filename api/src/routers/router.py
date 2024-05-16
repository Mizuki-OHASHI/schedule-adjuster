from src.routers import group, me, user, account, schedule

router_list = [
    me.router,
    user.router,
    group.router,
    account.router,
    schedule.router,
]
