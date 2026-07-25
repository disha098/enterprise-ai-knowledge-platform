from app.services.retriever_service import retriever_service

query = "Explain Retrieval Augmented Generation"

results = retriever_service.retrieve(
    query=query,
    top_k=3
)

documents = results["documents"][0]
ids = results["ids"][0]

print("\nRetrieved Documents:\n")

for doc_id, document in zip(ids, documents):
    print(f"ID: {doc_id}")
    print(document)
    print("-" * 50)