from pathlib import Path

from fastapi import (
    APIRouter,
    Depends,
    File,
    UploadFile,
)
from sqlalchemy.orm import Session

from app.core.permissions import require_roles
from app.database.session import get_db
from app.models.user import User
from app.services.document_service import save_uploaded_file

from app.crud.document import (
    create_document,
    get_all_documents,
)

from app.schemas.document import (
    DocumentUploadResponse,
    DocumentListResponse,
)

router = APIRouter(
    prefix="/documents",
    tags=["Documents"],
)


@router.get(
    "/",
    response_model=DocumentListResponse,
)
def list_documents(
    db: Session = Depends(get_db),
):
    documents = get_all_documents(db)

    return {
        "documents": documents,
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
    file_path, stored_filename, file_size = save_uploaded_file(file)

    document = create_document(
        db=db,
        filename=file.filename,
        stored_filename=stored_filename,
        file_path=file_path,
        file_type=Path(file.filename).suffix.lower(),
        file_size=file_size,
        uploaded_by=current_user.id,
    )

    return {
        "message": "Document uploaded successfully.",
        "document": document,
    }