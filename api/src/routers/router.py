from src.routers import account, group, me, participant, schedule, user

router_list = [
    me.router,
    user.router,
    group.router,
    account.router,
    schedule.router,
    participant.router,
]
