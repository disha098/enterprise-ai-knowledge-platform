from pathlib import Path

from app.services.text_extraction_service import extract_txt_text

txt_folder = Path("uploads/txt")

txt_files = list(txt_folder.glob("*.txt"))

if not txt_files:
    print("No TXT files found.")
else:
    text = extract_txt_text(str(txt_files[0]))

    print("=" * 80)
    print(text)
    print("=" * 80)