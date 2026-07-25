from app.services.embedding_service import embedding_service
from app.services.vector_store_service import vector_store

query = "What is Retrieval Augmented Generation?"

results = vector_store.similarity_search(
    query=query,
    embedding_service=embedding_service,
    top_k=3
)

print("\nRetrieved Documents:\n")

documents = results["documents"][0]
ids = results["ids"][0]

for doc_id, document in zip(ids, documents):
    print(f"ID: {doc_id}")
    print(document)
    print("-" * 50)