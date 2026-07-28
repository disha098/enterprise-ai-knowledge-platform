from google import genai

from app.core.config import settings


class GeminiService:
    """
    Service responsible for communicating with the Gemini API.
    """

    def __init__(self):
        self.client = genai.Client(
            api_key=settings.GEMINI_API_KEY
        )

    def generate_response(self, prompt: str) -> str:
        response = self.client.models.generate_content(
            model=settings.GEMINI_MODEL,
            contents=prompt,
        )

        return response.text 


gemini_service = GeminiService()