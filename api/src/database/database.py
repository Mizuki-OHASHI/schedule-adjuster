from typing import AsyncIterator

from sqlalchemy import create_engine
from sqlalchemy.orm import Session


engine = create_engine("sqlite:///sqlite.db", echo=True)


async def session_factory() -> AsyncIterator[Session]:
    with Session(engine) as session:
        yield session
