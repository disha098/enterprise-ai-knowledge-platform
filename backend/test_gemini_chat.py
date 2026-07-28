from app.services.gemini_service import gemini_service
from app.core.config import settings

print("Model:", settings.GEMINI_MODEL)

response = gemini_service.client.models.generate_content(
    model=settings.GEMINI_MODEL,
    contents="Say hello in one sentence."
)

print(response.text)