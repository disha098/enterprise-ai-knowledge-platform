from app.services.rag_pipeline_service import rag_pipeline_service

result = rag_pipeline_service.generate_prompt(
    query="Explain Retrieval Augmented Generation",
    top_k=2,
    where={"category": "AI"},
)

print("=== Prompt ===")
print(result["prompt"])

print("\n=== Citations ===")
print(result["citations"])