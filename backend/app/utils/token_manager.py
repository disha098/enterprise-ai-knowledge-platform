MAX_CONTEXT_CHARS = 8000


def build_context(chunks, max_chars: int = MAX_CONTEXT_CHARS):
    """
    Build context while limiting the total size sent to the LLM.
    """

    context_parts = []
    current_size = 0

    for chunk in chunks:
        text = chunk["text"]

        if current_size + len(text) > max_chars:
            break

        context_parts.append(text)
        current_size += len(text)

    return "\n\n".join(context_parts)