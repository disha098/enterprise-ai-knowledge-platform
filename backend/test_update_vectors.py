from app.services.embedding_service import embedding_service
from app.services.vector_store_service import vector_store

updated_chunks = [
    {
        "chunk_id": 2,
        "text": "Retrieval Augmented Generation enhances LLM responses using external knowledge."
    }
]

updated_chunks = embedding_service.create_chunk_embeddings(updated_chunks)

vector_store.update_chunks(updated_chunks)

print("Vector updated successfully.")