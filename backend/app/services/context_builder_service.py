class ContextBuilderService:
    """
    Builds context from retrieved chunks.
    """

    def build_context(self, retrieved_chunks):
        context = []

        for chunk in retrieved_chunks:
            context.append(
                f"[Chunk {chunk['chunk_id']}]\n{chunk['text']}"
            )

        return "\n\n".join(context)


context_builder_service = ContextBuilderService()