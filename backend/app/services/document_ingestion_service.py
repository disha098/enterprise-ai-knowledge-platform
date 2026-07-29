from app.services.chunking_service import create_document_chunks
from app.services.embedding_service import embedding_service
from app.services.vector_store_service import vector_store


class DocumentIngestionService:
    """
    Handles the complete document ingestion pipeline:
    Text -> Chunks -> Embeddings -> ChromaDB
    """

    def ingest(self, text: str, metadata: dict):
        # Create chunks
        chunks = create_document_chunks(
            text=text,
            metadata=metadata,
        )

        processed_chunks = []

        for index, chunk in enumerate(chunks):
            processed_chunk = {
                "chunk_id": f"{metadata['document_id']}_{index}",
                "text": chunk["text"],
                "embedding": embedding_service.embed_text(chunk["text"]),
                **chunk["metadata"],
            }

            processed_chunks.append(processed_chunk)

        vector_store.add_chunks(processed_chunks)

        return processed_chunks


document_ingestion_service = DocumentIngestionService()