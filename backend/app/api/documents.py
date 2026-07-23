from pathlib import Path
from app.api.dependencies import get_current_user

from fastapi import HTTPException
from fastapi.responses import FileResponse

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
    get_document_by_id,
    delete_document,
    get_document_history,
    get_document_count,
)

from app.schemas.document import (
    DocumentUploadResponse,
    DocumentListResponse,
    DocumentHistoryResponse,
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


@router.get(
    "/history",
    response_model=DocumentHistoryResponse,
)
def document_history(
    page: int = 1,
    page_size: int = 20,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if page < 1:
        page = 1

    if page_size < 1:
        page_size = 20

    if page_size > 100:
        page_size = 100

    skip = (page - 1) * page_size

    documents = get_document_history(
        db=db,
        skip=skip,
        limit=page_size,
    )

    total = get_document_count(db)

    return {
        "total": total,
        "page": page,
        "page_size": page_size,
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


@router.get("/{document_id}/download")
def download_document(
    document_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    document = get_document_by_id(
        db,
        document_id,
    )

    if document is None:
        raise HTTPException(
            status_code=404,
            detail="Document not found.",
        )

    file_path = Path(document.file_path)

    if not file_path.exists():
        raise HTTPException(
            status_code=404,
            detail="File not found on disk.",
        )

    return FileResponse(
        path=file_path,
        filename=document.filename,
        media_type="application/octet-stream",
    )


@router.delete("/{document_id}")
def delete_uploaded_document(
    document_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_roles(["Admin", "Editor"])
    ),
):
    document = get_document_by_id(
        db,
        document_id,
    )

    if document is None:
        raise HTTPException(
            status_code=404,
            detail="Document not found.",
        )

    file_path = Path(document.file_path)

    if file_path.exists():
        file_path.unlink()

    delete_document(
        db,
        document,
    )

    return {
        "message": "Document deleted successfully.",
    }