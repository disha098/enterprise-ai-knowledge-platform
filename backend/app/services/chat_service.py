from app.services.gemini_service import gemini_service
from app.services.retriever_service import retriever_service
from app.utils.token_manager import build_context


class ChatService:
    def chat(self, question: str):
        retrieved_chunks = retriever_service.retrieve(
            query=question,
            top_k=3,
        )

        context = build_context(retrieved_chunks)
        print("=" * 50)
        print(f"Context Length: {len(context)} characters")
        print("=" * 50)

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

        # Convert internal chunk format to API response format
        sources = []

        for chunk in retrieved_chunks:
            sources.append({
            "document_id": chunk.get("document_id", 0),
            "filename": chunk.get("filename", "Unknown"),
            "page": chunk.get("page"),
            "content": chunk["text"],
        })

        return {
            "answer": answer,
            "sources": sources,
        }


chat_service = ChatService()