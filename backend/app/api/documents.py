from pathlib import Path

from fastapi import (
    APIRouter,
    Depends,
    File,
    UploadFile,
)
from sqlalchemy.orm import Session

from app.core.permissions import require_roles
from app.crud.document import create_document
from app.database.session import get_db
from app.models.user import User
from app.schemas.document import DocumentUploadResponse
from app.services.document_service import save_uploaded_file

router = APIRouter(
    prefix="/documents",
    tags=["Documents"],
)


@router.get("/")
def list_documents():
    return {
        "message": "Documents API is working!"
    }


@router.post(
    "/upload",
    response_model=DocumentUploadResponse,
)
def upload_document(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_roles(["Admin", "Editor"])
    ),
):
    file_path, stored_filename = save_uploaded_file(file)

    document = create_document(
        db=db,
        filename=file.filename,
        stored_filename=stored_filename,
        file_path=file_path,
        file_type=Path(file.filename).suffix.lower(),
        file_size=file.size or 0,
        uploaded_by=current_user.id,
    )

    return {
        "message": "Document uploaded successfully.",
        "document": document,
    }