from datetime import datetime

from pydantic import BaseModel, ConfigDict


class DocumentResponse(BaseModel):
    id: int
    filename: str
    stored_filename: str
    file_path: str
    file_type: str
    file_size: int
    uploaded_by: int
    uploaded_at: datetime

    model_config = ConfigDict(from_attributes=True)


class DocumentListResponse(BaseModel):
    documents: list[DocumentResponse]

    model_config = ConfigDict(from_attributes=True)


class DocumentUploadResponse(BaseModel):
    message: str
    document: DocumentResponse

    model_config = ConfigDict(from_attributes=True)


class DocumentHistoryResponse(BaseModel):
    total: int
    page: int
    page_size: int
    documents: list[DocumentResponse]

    model_config = ConfigDict(from_attributes=True)