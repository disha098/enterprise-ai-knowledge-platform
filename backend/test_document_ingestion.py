from app.services.document_ingestion_service import document_ingestion_service

sample_text = """
Artificial Intelligence is transforming enterprises.

Retrieval Augmented Generation improves the accuracy of LLMs.

ChromaDB is used to store vector embeddings.
"""

metadata = {
    "document_id": 1,
    "filename": "sample.pdf",
    "uploaded_by": 1,
}

chunks = document_ingestion_service.ingest(
    text=sample_text,
    metadata=metadata,
)

print(f"Stored {len(chunks)} chunks.")

for chunk in chunks:
    print("-" * 50)
    print(f"Chunk ID      : {chunk['chunk_id']}")
    print(f"Filename      : {chunk['filename']}")
    print(f"Document ID   : {chunk['document_id']}")
    print(f"Chunk Index   : {chunk['chunk_index']}")
    print(f"Total Chunks  : {chunk['total_chunks']}")
    print(f"Text Preview  : {chunk['text'][:100]}...")
    print(f"Embedding Size: {len(chunk['embedding'])}")