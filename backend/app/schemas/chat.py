from pydantic import BaseModel
from datetime import datetime


class ChatRequest(BaseModel):
    query: str
    conversation_id: int | None = None


class SourceDocument(BaseModel):
    document_id: int
    filename: str
    page: int | None = None
    content: str


class ChatResponse(BaseModel):
    conversation_id: int
    answer: str
    sources: list[SourceDocument]


class ConversationSummary(BaseModel):
    id: int
    title: str
    created_at: datetime

    model_config = {
        "from_attributes": True
    }


class ChatMessageResponse(BaseModel):
    role: str
    message: str

    model_config = {
        "from_attributes": True
    }


class ConversationResponse(BaseModel):
    id: int
    title: str
    created_at: datetime
    messages: list[ChatMessageResponse]

    model_config = {
        "from_attributes": True
    }