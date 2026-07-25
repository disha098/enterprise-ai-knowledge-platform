from app.services.embedding_service import embedding_service

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

result = embedding_service.create_chunk_embeddings(chunks)

print(f"Generated embeddings for {len(result)} chunks.\n")

for chunk in result:
    print(f"Chunk ID: {chunk['chunk_id']}")
    print(f"Vector length: {len(chunk['embedding'])}")
    print(f"First 5 values: {chunk['embedding'][:5]}")
    print("-" * 50)