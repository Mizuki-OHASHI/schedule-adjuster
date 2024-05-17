from typing import List

from sqlalchemy.orm import Session
from sqlalchemy import and_

from src.models import Participant, ParticipantProfile


def get_participant(session: Session, participant_id: str) -> Participant:
    participant = session.get(Participant, participant_id)
    if participant is None:
        raise ValueError(f"Participant with id {participant_id} does not exist")
    return participant


def get_many_participants(session: Session, **kwargs) -> List[Participant]:
    filters = [getattr(Participant, key) == value for key, value in kwargs.items()]
    return session.query(Participant).filter(and_(*filters)).all()


def add_participant(session: Session, participant: Participant) -> Participant:
    session.add(participant)
    session.commit()
    session.refresh(participant)
    return participant


def add_many_participants(
    session: Session, participants: List[Participant]
) -> List[Participant]:
    session.add_all(participants)
    session.commit()
    session.refresh(participants)
    return participants


def upsert_participant(
    session: Session, participant: Participant, auto_create=True
) -> Participant:
    target = session.get(Participant, participant.id)
    if target:
        target.schedule_id = participant.schedule_id
        target.user_id = participant.user_id
        target.toParticipate = participant.toParticipate
        target.availability = participant.availability
        session.commit()
        session.refresh(target)
        return target
    elif auto_create:
        session.add(participant)
        session.commit()
        session.refresh(participant)
        return participant
    else:
        raise ValueError(f"Participant with id {participant.id} does not exist")


def update_many_participants(
    session: Session, participants: List[Participant]
) -> List[Participant]:
    session.bulk_update_mappings(Participant, participants)
    session.commit()
    session.refresh(participants)
    return participants


def get_participant_profile(
    session: Session, participant_id: str
) -> ParticipantProfile:
    profile = session.get(ParticipantProfile, participant_id)
    if profile is None:
        raise ValueError(f"ParticipantProfile with id {participant_id} does not exist")
    return profile


def add_participant_profile(
    session: Session, profile: ParticipantProfile
) -> ParticipantProfile:
    session.add(profile)
    session.commit()
    session.refresh(profile)
    return profile


def upsert_participant_profile(
    session: Session, profile: ParticipantProfile, auto_create=True
) -> ParticipantProfile:
    target = session.get(ParticipantProfile, profile.participant_id)
    if target:
        target.intProp1 = profile.intProp1
        target.intProp2 = profile.intProp2
        target.intProp3 = profile.intProp3
        target.listProp1 = profile.listProp1
        target.listProp2 = profile.listProp2
        target.listProp3 = profile.listProp3
        session.commit()
        session.refresh(target)
        return target
    elif auto_create:
        session.add(profile)
        session.commit()
        session.refresh(profile)
        return profile
    else:
        raise ValueError(
            f"ParticipantProfile with id {profile.participant_id} does not exist"
        )
