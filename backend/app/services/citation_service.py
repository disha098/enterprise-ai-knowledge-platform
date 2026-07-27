class CitationService:
    """
    Generates citations from retrieved chunks.
    """

    def generate_citations(self, retrieved_chunks):
        return [
            f"Chunk {chunk['chunk_id']}"
            for chunk in retrieved_chunks
        ]


citation_service = CitationService()