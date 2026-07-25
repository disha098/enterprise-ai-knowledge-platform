from copy import deepcopy


def chunk_text(
    text: str,
    chunk_size: int = 1000,
    chunk_overlap: int = 200,
) -> list[str]:
    """
    Split text into overlapping chunks.
    """

    if not text:
        return []

    if chunk_overlap >= chunk_size:
        raise ValueError("chunk_overlap must be smaller than chunk_size.")

    chunks = []
    start = 0

    while start < len(text):
        end = start + chunk_size
        chunks.append(text[start:end])

        if end >= len(text):
            break

        start += chunk_size - chunk_overlap

    return chunks


def create_document_chunks(
    text: str,
    metadata: dict,
    chunk_size: int = 1000,
    chunk_overlap: int = 200,
) -> list[dict]:
    """
    Create chunks with metadata attached.
    """

    chunks = chunk_text(
        text=text,
        chunk_size=chunk_size,
        chunk_overlap=chunk_overlap,
    )

    chunk_documents = []

    for index, chunk in enumerate(chunks):
        chunk_metadata = deepcopy(metadata)

        chunk_metadata["chunk_index"] = index
        chunk_metadata["total_chunks"] = len(chunks)

        chunk_documents.append(
            {
                "text": chunk,
                "metadata": chunk_metadata,
            }
        )

    return chunk_documents