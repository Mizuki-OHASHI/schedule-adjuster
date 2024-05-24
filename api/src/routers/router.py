from src.routers import account, group, participant, schedule, user

router_list = [
    user.router,
    group.router,
    account.router,
    schedule.router,
    participant.router,
]
