from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

from app.schemas.chat import (
    ChatRequest,
    ChatResponse,
    ConversationSummary,
    ConversationResponse,
)

from app.services.chat_service import chat_service

from app.database.session import get_db
from app.api.dependencies import get_current_user
from app.models.user import User

from app.crud.chat import (
    create_conversation,
    get_chat_history,
    save_message,
    get_conversations,
    get_conversation,
)

router = APIRouter(
    prefix="/chat",
    tags=["Chat"],
)


@router.post("/", response_model=ChatResponse)
def chat(
    request: ChatRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    try:

        # Create conversation if it doesn't exist
        if request.conversation_id is None:

            conversation = create_conversation(
                db=db,
                user_id=current_user.id,
                title=request.query[:50],
            )

            conversation_id = conversation.id

        else:
            conversation_id = request.conversation_id

        # Save current user message first
        save_message(
            db=db,
            conversation_id=conversation_id,
            role="user",
            message=request.query,
        )

        # Load conversation history
        history = get_chat_history(
            db=db,
            conversation_id=conversation_id,
            user_id=current_user.id,
        )

        # Remove the current user message from history
        # to avoid sending it twice to the LLM.
        if (
            history
            and history[-1].role == "user"
            and history[-1].message == request.query
        ):
            history = history[:-1]

        # Generate AI response
        result = chat_service.chat(
            question=request.query,
            history=history,
        )

        # Save assistant response
        save_message(
            db=db,
            conversation_id=conversation_id,
            role="assistant",
            message=result["answer"],
        )

        return ChatResponse(
            conversation_id=conversation_id,
            answer=result["answer"],
            sources=result["sources"],
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


@router.get(
    "/conversations",
    response_model=list[ConversationSummary],
)
def list_conversations(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return get_conversations(
        db=db,
        user_id=current_user.id,
    )


@router.get(
    "/conversations/{conversation_id}",
    response_model=ConversationResponse,
)
def conversation_details(
    conversation_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    conversation = get_conversation(
        db=db,
        conversation_id=conversation_id,
        user_id=current_user.id,
    )

    if conversation is None:
        raise HTTPException(
            status_code=404,
            detail="Conversation not found",
        )

    return conversation