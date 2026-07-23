from pathlib import Path
from uuid import uuid4

from fastapi import HTTPException, UploadFile

from app.core.config import settings


def save_uploaded_file(file: UploadFile) -> tuple[str, str]:
    extension = Path(file.filename).suffix.lower()

    if extension not in settings.ALLOWED_FILE_TYPES:
        raise HTTPException(
            status_code=400,
            detail="Unsupported file type.",
        )

    file.file.seek(0, 2)
    file_size = file.file.tell()
    file.file.seek(0)

    if file_size > settings.MAX_UPLOAD_SIZE:
        raise HTTPException(
            status_code=400,
            detail="File size exceeds the maximum allowed limit.",
        )

    folder = Path(settings.UPLOAD_DIR) / extension.replace(".", "")
    folder.mkdir(parents=True, exist_ok=True)

    stored_filename = f"{uuid4()}{extension}"
    file_path = folder / stored_filename

    with open(file_path, "wb") as buffer:
        buffer.write(file.file.read())

    file.file.seek(0)

    return str(file_path), stored_filename