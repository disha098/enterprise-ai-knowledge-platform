from pathlib import Path

import fitz
from docx import Document


def extract_pdf_text(file_path: str) -> str:
    """
    Extract text from a PDF file.
    """
    pdf = fitz.open(file_path)

    try:
        pages = []

        for page in pdf:
            pages.append(page.get_text())

        return "\n".join(pages).strip()

    finally:
        pdf.close()


def extract_docx_text(file_path: str) -> str:
    """
    Extract text from a DOCX file.
    """
    document = Document(file_path)

    paragraphs = []

    for paragraph in document.paragraphs:
        text = paragraph.text.strip()

        if text:
            paragraphs.append(text)

    return "\n".join(paragraphs)


def extract_txt_text(file_path: str) -> str:
    """
    Extract text from a TXT file.
    """
    try:
        with open(file_path, "r", encoding="utf-8") as file:
            return file.read().strip()
    except UnicodeDecodeError:
        with open(file_path, "r", encoding="latin-1") as file:
            return file.read().strip()


def extract_text(file_path: str) -> str:
    extension = Path(file_path).suffix.lower()

    if extension == ".pdf":
        return extract_pdf_text(file_path)

    if extension == ".docx":
        return extract_docx_text(file_path)

    if extension == ".txt":
        return extract_txt_text(file_path)

    raise ValueError(f"Unsupported file type: {extension}")