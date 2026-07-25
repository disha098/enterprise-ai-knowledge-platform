import chromadb
from chromadb.config import Settings


class VectorStoreService:
    def __init__(self):
        self.client = chromadb.PersistentClient(
            path="./chroma_db",
            settings=Settings(anonymized_telemetry=False)
        )

        self.collection = self.client.get_or_create_collection(
            name="documents"
        )

    def add_chunks(self, chunks):
        """
        Store document chunks in ChromaDB.
        """

        ids = []
        documents = []
        embeddings = []
        metadatas = []

        for chunk in chunks:

            ids.append(str(chunk["chunk_id"]))

            documents.append(chunk["text"])

            embeddings.append(chunk["embedding"])

            metadata = {
                key: value
                for key, value in chunk.items()
                if key not in ["text", "embedding"]
            }

            metadatas.append(metadata)

        self.collection.add(
            ids=ids,
            documents=documents,
            embeddings=embeddings,
            metadatas=metadatas,
        )

        print(f"Stored {len(ids)} chunks in ChromaDB.")


    def similarity_search(self, query: str, embedding_service, top_k: int = 3):
        """
        Search for the most relevant chunks.
        """

        query_embedding = embedding_service.embed_text(query)

        results = self.collection.query(
            query_embeddings=[query_embedding],
            n_results=top_k,
        )

        return results


    def delete_vectors(self, ids: list[str]):
        """
        Delete vectors from ChromaDB by their IDs.
        """

        self.collection.delete(ids=ids)

        print(f"Deleted {len(ids)} vectors.")


vector_store = VectorStoreService()