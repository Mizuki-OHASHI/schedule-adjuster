import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from src.main import app  # FastAPIアプリのエントリーポイントをインポート
from src.database.database import session_factory
from src.models import Base

# テスト用SQLiteデータベースの設定
SQLALCHEMY_DATABASE_URL = "sqlite:///sqlite.db"
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


# データベースのセットアップとクリーンアップ
@pytest.fixture(scope="function")
def session():
    Base.metadata.create_all(bind=engine)
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()
        Base.metadata.drop_all(bind=engine)


# テストクライアントの作成
@pytest.fixture(scope="function")
def client(session):
    def override_get_db():
        try:
            yield session
        finally:
            session.close()

    app.dependency_overrides[session_factory] = override_get_db
    with TestClient(app) as c:
        yield c
