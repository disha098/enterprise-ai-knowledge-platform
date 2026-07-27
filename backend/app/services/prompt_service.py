class PromptService:
    """
    Creates prompts for the LLM.
    """

    def build_prompt(self, question: str, context: str) -> str:
        return f"""
You are an Enterprise AI Knowledge Assistant.

Use ONLY the information provided in the context.

Rules:
1. Do not make up information.
2. If the answer is not present in the context, reply:
   "I couldn't find the answer in the provided documents."
3. Answer clearly and concisely.

=========================
CONTEXT
=========================
{context}

=========================
QUESTION
=========================
{question}

=========================
ANSWER
=========================
""".strip()


prompt_service = PromptService()