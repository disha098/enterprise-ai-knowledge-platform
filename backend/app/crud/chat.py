from sqlalchemy.orm import Session
from datetime import datetime, UTC

from app.models.conversation import Conversation
from app.models.chat_message import ChatMessage


def create_conversation(
    db: Session,
    user_id: int,
    title: str,
):
    conversation = Conversation(
        user_id=user_id,
        title=title,
        created_at=datetime.now(UTC),
        updated_at=datetime.now(UTC),
    )

    db.add(conversation)
    db.commit()
    db.refresh(conversation)

    return conversation


def save_message(
    db: Session,
    conversation_id: int,
    role: str,
    message: str,
):
    chat_message = ChatMessage(
        conversation_id=conversation_id,
        role=role,
        message=message,
        created_at=datetime.now(UTC)
    )

    db.add(chat_message)
    db.commit()
    db.refresh(chat_message)

    return chat_message