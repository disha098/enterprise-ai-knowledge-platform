from pathlib import Path
from datetime import datetime


def generate_metadata(
    *,
    document_id: int,
    original_filename: str,
    stored_filename: str,
    file_path: str,
    file_size: int,
    uploaded_by: int,
    uploaded_at: datetime,
    text: str,
) -> dict:
    """
    Generate metadata for an uploaded document.
    """

    return {
        "document_id": document_id,
        "original_filename": original_filename,
        "stored_filename": stored_filename,
        "file_type": Path(file_path).suffix.lower().replace(".", ""),
        "file_size": file_size,
        "text_length": len(text),
        "word_count": len(text.split()),
        "uploaded_by": uploaded_by,
        "uploaded_at": uploaded_at.isoformat(),
    }