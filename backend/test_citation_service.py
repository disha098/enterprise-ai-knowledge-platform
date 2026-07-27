from app.services.retriever_service import retriever_service
from app.services.citation_service import citation_service

query = "Explain Retrieval Augmented Generation"

results = retriever_service.retrieve(query)

citations = citation_service.generate_citations(results)

print("Sources:")

for citation in citations:
    print(f"- {citation}")