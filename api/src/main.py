from time import time
from typing import Callable, Coroutine, Any

from fastapi import FastAPI, Request, Response, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.utils import get_openapi

import firebase_admin
from firebase_admin import credentials, auth

from src.routers.router import router_list
from src.routers.user import get_user

app = FastAPI()


cred = credentials.Certificate("account_key.json")
fire_app = firebase_admin.initialize_app(cred)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)


def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    openapi_schema = get_openapi(
        title="Custom API",
        version="1.0.0",
        description="This is a custom OpenAPI schema",
        routes=app.routes,
    )
    openapi_schema["components"]["securitySchemes"] = {
        "BearerAuth": {
            "type": "http",
            "scheme": "bearer",
        }
    }
    openapi_schema["security"] = [{"BearerAuth": []}]
    app.openapi_schema = openapi_schema
    return app.openapi_schema


app.openapi = custom_openapi


@app.middleware("http")
async def add_process_time_header(
    request: Request,
    call_next: Callable[[Request], Coroutine[None, None, Response]],
) -> Response:
    start_time = time()
    response = await call_next(request)
    process_time = time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response


def validate_uid(uid: Any) -> bool:
    return isinstance(uid, str) and len(uid) > 0


@app.middleware("http")
async def authorization(
    request: Request,
    call_next: Callable[[Request], Coroutine[None, None, Response]],
) -> Response:
    # いくつかのエンドポイントは認証をスキップする
    ignore_paths_and_methods = [
        ("/health", "GET"),
        ("/user", "POST"),
        ("/docs", "GET"),
        ("/openapi.json", "GET"),
    ]
    for path, method in ignore_paths_and_methods:
        if path == request.url.path[: len(path)] and method == request.method:
            return await call_next(request)

    # Bearer トークンを取得し, UID を取得する
    token = request.headers.get("Authorization")
    if token is None or not token.startswith("Bearer "):
        return Response(
            status_code=status.HTTP_401_UNAUTHORIZED,
            headers={"message": "Bearer token is required."},
        )
    token_body = token[len("Bearer ") :]
    try:
        decoded_token = auth.verify_id_token(token_body, fire_app)
    except Exception:
        return Response(
            status_code=status.HTTP_401_UNAUTHORIZED,
            headers={"message": "Invalid token."},
        )
    uid = decoded_token["uid"]

    # UID のバリデーションを行い, ユーザーを取得する
    if not validate_uid(uid):
        return Response(
            status_code=status.HTTP_401_UNAUTHORIZED,
            headers={"message": "Invalid UID."},
        )
    try:
        user = get_user(uid)
    except ValueError:
        return Response(
            status_code=status.HTTP_401_UNAUTHORIZED,
            headers={"message": "User not found."},
        )

    request.state.user = user
    response = await call_next(request)
    return response


@app.get("/")
def index():
    return {"message": "This is a server of schedule adjuster."}


@app.get("/health/{status}")
def health(status: str):
    return {"status": status}


for router in router_list:
    app.include_router(router)
