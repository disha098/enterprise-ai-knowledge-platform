from app.services.retriever_service import retriever_service
from app.services.context_builder_service import context_builder_service
from app.services.prompt_service import prompt_service

query = "Explain Retrieval Augmented Generation"

results = retriever_service.retrieve(query)

context = context_builder_service.build_context(results)

prompt = prompt_service.build_prompt(
    question=query,
    context=context
)

print(prompt)