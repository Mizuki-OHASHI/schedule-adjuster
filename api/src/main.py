from fastapi import FastAPI

from src.routers.router import router_list


app = FastAPI()


@app.get("/")
def index():
    return {"message": "Hello, World!"}


@app.get("/health/{status}")
def health(status: str):
    return {"status": status}


for router in router_list:
    app.include_router(router)
