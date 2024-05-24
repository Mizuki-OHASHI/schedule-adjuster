from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from src.crud import participant
from src.database.database import session_factory
from src.models import Participant, ParticipantProfile
from src.schemas.participant import (ParticipantCreate, ParticipantGet,
                                     ParticipantProfileCreate,
                                     ParticipantProfileGet)

router = APIRouter(tags=["participant"])


@router.get("/participants", response_model=List[ParticipantGet])
def get_participants(session: Session = Depends(session_factory)):
    return list(
        map(ParticipantGet.model_validate, participant.get_many_participants(session))
    )


@router.get("/participant/{participant_id}", response_model=ParticipantGet)
def get_participant(participant_id: str, session: Session = Depends(session_factory)):
    return ParticipantGet.model_validate(
        participant.get_participant(session, participant_id)
    )


@router.post("/participant", response_model=ParticipantGet)
def add_participant(
    participant_create: ParticipantCreate, session: Session = Depends(session_factory)
):
    participant_dto = Participant(**participant_create.dict())
    return ParticipantGet.model_validate(
        participant.add_participant(session, participant_dto)
    )


@router.post("/participants", response_model=List[ParticipantGet])
def add_participants(
    participants_create: List[ParticipantCreate],
    session: Session = Depends(session_factory),
):
    participant_dtos = [Participant(**p.dict()) for p in participants_create]
    return list(
        map(
            ParticipantGet.model_validate,
            participant.add_many_participants(session, participant_dtos),
        )
    )


@router.put("/participant/{participant_id}", response_model=ParticipantGet)
def update_participant(
    participant_id: str,
    participant_create: ParticipantCreate,
    session: Session = Depends(session_factory),
):
    participant_dto = Participant(id=participant_id, **participant_create.dict())
    return ParticipantGet.model_validate(
        participant.upsert_participant(session, participant_dto)
    )


@router.put("/participants", response_model=List[ParticipantGet])
def update_participants(
    participants_create: List[ParticipantCreate],
    session: Session = Depends(session_factory),
):
    participant_dtos = [Participant(id=p.id, **p.dict()) for p in participants_create]
    return list(
        map(
            ParticipantGet.model_validate,
            participant.update_many_participants(session, participant_dtos),
        )
    )


@router.get(
    "/participant-profile/{participant_id}", response_model=ParticipantProfileGet
)
def get_participant_profile(
    participant_id: str, session: Session = Depends(session_factory)
):
    return ParticipantProfileGet.model_validate(
        participant.get_participant_profile(session, participant_id)
    )


@router.post("/participant-profile", response_model=ParticipantProfileGet)
def add_participant_profile(
    profile_create: ParticipantProfileCreate,
    session: Session = Depends(session_factory),
):
    profile_dto = ParticipantProfile(**profile_create.dict())
    return ParticipantProfileGet.model_validate(
        participant.add_participant_profile(session, profile_dto)
    )


@router.put(
    "/participant-profile/{participant_id}", response_model=ParticipantProfileGet
)
def update_participant_profile(
    participant_id: str,
    profile_create: ParticipantProfileCreate,
    session: Session = Depends(session_factory),
):
    profile_dto = ParticipantProfile(
        participant_id=participant_id, **profile_create.dict()
    )
    return ParticipantProfileGet.model_validate(
        participant.upsert_participant_profile(session, profile_dto)
    )
