from langchain_huggingface import HuggingFaceEmbeddings


EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2"


class EmbeddingService:
    def __init__(self):
        self.embeddings = HuggingFaceEmbeddings(
            model_name=EMBEDDING_MODEL
        )

    def embed_text(self, text: str):
        """
        Generate embedding for a single text.
        """
        return self.embeddings.embed_query(text)

    def embed_documents(self, documents: list[str]):
        """
        Generate embeddings for multiple documents/chunks.
        """
        return self.embeddings.embed_documents(documents)


embedding_service = EmbeddingService()