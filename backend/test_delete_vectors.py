from app.services.vector_store_service import vector_store

vector_store.delete_vectors(["1"])

print("Deletion completed.")