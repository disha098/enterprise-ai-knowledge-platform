from app.services.retriever_service import retriever_service

results = retriever_service.retrieve(
    query="Explain Retrieval Augmented Generation",
    top_k=2
)

print(f"Retrieved {len(results)} chunks\n")

for chunk in results:
    print(f"Chunk ID : {chunk['chunk_id']}")
    print(f"Text     : {chunk['text']}")

    if "distance" in chunk:
        print(f"Distance : {chunk['distance']}")

    print("-" * 50)