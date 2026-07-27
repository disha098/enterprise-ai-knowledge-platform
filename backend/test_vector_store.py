from app.services.embedding_service import embedding_service
from app.services.vector_store_service import vector_store

chunks = [
    {
        "chunk_id": 1,
        "text": "Artificial Intelligence is changing enterprise software.",
        "category": "AI",
        "document_name": "enterprise_ai.pdf"
    },
    {
        "chunk_id": 2,
        "text": "Retrieval Augmented Generation improves LLM accuracy.",
        "category": "AI",
        "document_name": "enterprise_ai.pdf"
    },
    {
        "chunk_id": 3,
        "text": "ChromaDB stores vector embeddings efficiently.",
        "category": "AI",
        "document_name": "enterprise_ai.pdf"
    }
]

chunks = embedding_service.create_chunk_embeddings(chunks)

vector_store.add_chunks(chunks)