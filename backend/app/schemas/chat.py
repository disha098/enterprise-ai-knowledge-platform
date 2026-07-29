from pydantic import BaseModel


class ChatRequest(BaseModel):
    question: str


class SourceDocument(BaseModel):
    document_id: int
    filename: str
    page: int | None = None
    content: str


class ChatResponse(BaseModel):
    answer: str
    sources: list[SourceDocument]