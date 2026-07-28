from google import genai
from app.core.config import settings
import traceback

client = genai.Client(api_key=settings.GEMINI_API_KEY)

print("Testing Gemini API...")

try:
    response = client.models.generate_content(
        model=settings.GEMINI_MODEL,
        contents="Reply only with OK."
    )

    print("Success!")
    print(response.text)

except Exception:
    print("\nError occurred:\n")
    traceback.print_exc()
    