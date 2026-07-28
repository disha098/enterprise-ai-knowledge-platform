from app.core.config import settings

print("Key prefix:", settings.GEMINI_API_KEY[:10])
print("Key length:", len(settings.GEMINI_API_KEY))
print("Model:", settings.GEMINI_MODEL)