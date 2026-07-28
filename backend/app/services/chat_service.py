from app.services.gemini_service import gemini_service
from app.services.retriever_service import retriever_service


class ChatService:
    """
    Handles RAG chat by combining retrieval with Gemini.
    """

    def chat(self, question: str):
        # Retrieve relevant chunks
        retrieved_chunks = retriever_service.retrieve(
            query=question,
            top_k=3,
        )

        # Build context
        context = "\n\n".join(
            chunk["text"] for chunk in retrieved_chunks
        )

        prompt = f"""
You are an Enterprise AI Assistant.

Answer ONLY using the provided context.

If the answer is not present in the context, reply exactly:

"I couldn't find that information in the uploaded documents."

Context:
{context}

Question:
{question}

Answer:
"""

        answer = gemini_service.generate_response(prompt)

        return {
            "answer": answer,
            "sources": retrieved_chunks,
        }


chat_service = ChatService()