from app.services.gemini_service import gemini_service
from app.services.retriever_service import retriever_service
from app.utils.token_manager import build_context


class ChatService:
    def chat(self, question: str, history: list | None = None,):
        retrieved_chunks = retriever_service.retrieve(
            query=question,
            top_k=3,
        )

        context = build_context(retrieved_chunks)
        
        conversation_history = ""

        if history:

            for message in history:

                if message.role == "user":
                    conversation_history += f"User: {message.message}\n"

                else:
                    conversation_history += f"Assistant: {message.message}\n"
        print("=" * 60)
        print("Conversation History:")
        print(conversation_history if conversation_history else "No previous conversation")
        print("=" * 60)

        print("=" * 50)
        print(f"Context Length: {len(context)} characters")
        print("=" * 50)

        prompt = f"""
        You are an Enterprise AI Assistant.

        You must answer ONLY using the uploaded document context.

        Conversation History:
        {conversation_history}

        Document Context:
        {context}

        Current Question:
        {question}

        Instructions:
        - Use the conversation history to understand follow-up questions.
        - Use the document context as the source of truth.
        - If the answer is not present in the document context, reply exactly:
        "I couldn't find that information in the uploaded documents."

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