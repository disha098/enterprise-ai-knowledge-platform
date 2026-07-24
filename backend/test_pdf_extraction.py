from pathlib import Path

from app.services.text_extraction_service import extract_pdf_text

pdf_folder = Path("uploads/pdf")

pdf_files = list(pdf_folder.glob("*.pdf"))

if not pdf_files:
    print("No PDF files found.")
else:
    text = extract_pdf_text(str(pdf_files[0]))

    print("=" * 80)
    print(text)
    print("=" * 80)