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

        return results


retriever_service = RetrieverService()