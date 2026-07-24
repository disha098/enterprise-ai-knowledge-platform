from pathlib import Path

from app.services.text_extraction_service import extract_docx_text

docx_folder = Path("uploads/docx")

docx_files = list(docx_folder.glob("*.docx"))

if not docx_files:
    print("No DOCX files found.")
else:
    text = extract_docx_text(str(docx_files[0]))

    print("=" * 80)
    print(text)
    print("=" * 80)