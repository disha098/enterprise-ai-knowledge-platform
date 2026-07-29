from fastapi import APIRouter, HTTPException

from app.schemas.chat import ChatRequest, ChatResponse
from app.services.chat_service import chat_service

router = APIRouter(
    prefix="/chat",
    tags=["Chat"],
)


@router.post("/", response_model=ChatResponse)
def chat(request: ChatRequest):
    try:
        result = chat_service.chat(request.question)

        return ChatResponse(
            answer=result["answer"],
            sources=result["sources"],
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e),
        )