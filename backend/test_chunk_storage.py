from app.services.chunking_service import create_document_chunks

sample_text = "A" * 2500

metadata = {
    "document_id": 1,
    "filename": "sample.pdf",
    "uploaded_by": 1,
}

chunks = create_document_chunks(
    text=sample_text,
    metadata=metadata,
)

print(f"Total chunks: {len(chunks)}")

for chunk in chunks:
    print("-" * 60)
    print(chunk["metadata"])
    print(f"Chunk Length: {len(chunk['text'])}")