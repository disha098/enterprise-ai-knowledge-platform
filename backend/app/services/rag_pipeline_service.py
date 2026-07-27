from app.services.retriever_service import retriever_service
from app.services.context_builder_service import context_builder_service
from app.services.prompt_service import prompt_service
from app.services.citation_service import citation_service


class RAGPipelineService:
    """
    Orchestrates the complete RAG pipeline.
    """

    def generate_prompt(
        self,
        query: str,
        top_k: int = 3,
        where: dict | None = None,
    ):
        # Step 1: Retrieve relevant chunks
        retrieved_chunks = retriever_service.retrieve(
            query=query,
            top_k=top_k,
            where=where,
        )

        # Step 2: Build context
        context = context_builder_service.build_context(retrieved_chunks)

        # Step 3: Build prompt
        prompt = prompt_service.build_prompt(
            question=query,
            context=context,
        )

        # Step 4: Generate citations
        citations = citation_service.generate_citations(
            retrieved_chunks
        )

        return {
            "query": query,
            "prompt": prompt,
            "citations": citations,
            "retrieved_chunks": retrieved_chunks,
        }


rag_pipeline_service = RAGPipelineService()