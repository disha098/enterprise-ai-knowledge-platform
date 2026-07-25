class ContextBuilderService:
    """
    Builds a context string from retrieved chunks.
    """

    def build_context(self, retrieval_results):
        documents = retrieval_results["documents"][0]
        ids = retrieval_results["ids"][0]

        context_parts = []

        for doc_id, document in zip(ids, documents):
            context_parts.append(
                f"[Chunk {doc_id}]\n{document}"
            )

        return "\n\n".join(context_parts)


context_builder_service = ContextBuilderService()