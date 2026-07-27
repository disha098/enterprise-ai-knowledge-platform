class CitationService:
    """
    Generates citations from retrieval results.
    """

    def generate_citations(self, retrieval_results):
        ids = retrieval_results["ids"][0]

        citations = []

        for chunk_id in ids:
            citations.append(f"Chunk {chunk_id}")

        return citations


citation_service = CitationService()