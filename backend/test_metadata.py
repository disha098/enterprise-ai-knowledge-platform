from datetime import datetime

from app.services.metadata_service import generate_metadata

sample_text = """
Enterprise AI Knowledge Platform

This project implements Retrieval-Augmented Generation (RAG)
using FastAPI, LangChain and ChromaDB.
"""

metadata = generate_metadata(
    document_id=1,
    original_filename="sample.pdf",
    stored_filename="4b1c2d3e.pdf",
    file_path="uploads/pdf/4b1c2d3e.pdf",
    file_size=24576,
    uploaded_by=1,
    uploaded_at=datetime.now(),
    text=sample_text,
)

for key, value in metadata.items():
    print(f"{key}: {value}")