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

    def create_chunk_embeddings(self, chunks: list[dict]):
        """
        Generate embeddings for document chunks.
        """
        texts = [chunk["text"] for chunk in chunks]

        vectors = self.embeddings.embed_documents(texts)

        for chunk, vector in zip(chunks, vectors):
            chunk["embedding"] = vector

        return chunks


embedding_service = EmbeddingService()