from pydantic import BaseModel


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