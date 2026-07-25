from app.services.retriever_service import retriever_service
from app.services.context_builder_service import context_builder_service

query = "Explain Retrieval Augmented Generation"

results = retriever_service.retrieve(query)

context = context_builder_service.build_context(results)

print("\nGenerated Context:\n")
print(context)