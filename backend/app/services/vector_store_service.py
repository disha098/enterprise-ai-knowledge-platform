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


vector_store = VectorStoreService()