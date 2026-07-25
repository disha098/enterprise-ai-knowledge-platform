from app.services.embedding_service import embedding_service
from app.services.vector_store_service import vector_store

chunks = [
    {
        "chunk_id": 1,
        "text": "Artificial Intelligence is changing enterprise software."
    },
    {
        "chunk_id": 2,
        "text": "Retrieval Augmented Generation improves LLM accuracy."
    },
    {
        "chunk_id": 3,
        "text": "ChromaDB stores vector embeddings efficiently."
    }
]

chunks = embedding_service.create_chunk_embeddings(chunks)

vector_store.add_chunks(chunks)