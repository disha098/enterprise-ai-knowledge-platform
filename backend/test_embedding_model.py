from app.services.embedding_service import embedding_service

documents = [
    "Artificial Intelligence",
    "Machine Learning",
    "Natural Language Processing",
    "Retrieval Augmented Generation"
]

embeddings = embedding_service.embed_documents(documents)

print(f"Number of embeddings: {len(embeddings)}")
print(f"Embedding dimension: {len(embeddings[0])}")

print("\nFirst 5 values of first embedding:")
print(embeddings[0][:5])