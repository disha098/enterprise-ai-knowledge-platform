from app.services.embedding_service import embedding_service
from app.services.vector_store_service import vector_store


class RetrieverService:
    """
    Handles semantic retrieval from the vector database.
    """

    def retrieve(self, query: str, top_k: int = 3):
        results = vector_store.similarity_search(
            query=query,
            embedding_service=embedding_service,
            top_k=top_k,
        )

        retrieved_chunks = []

        ids = results["ids"][0]
        documents = results["documents"][0]

        # Chroma may not always return distances depending on configuration
        distances = results.get("distances", [[]])[0]

        for index, (chunk_id, document) in enumerate(zip(ids, documents)):
            chunk = {
                "chunk_id": chunk_id,
                "text": document,
            }

            if index < len(distances):
                chunk["distance"] = distances[index]

            retrieved_chunks.append(chunk)

        return retrieved_chunks


retriever_service = RetrieverService()