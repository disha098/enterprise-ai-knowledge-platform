import re
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
        return clean_text(extract_pdf_text(file_path))

    if extension == ".docx":
        return clean_text(extract_docx_text(file_path))

    if extension == ".txt":
        return clean_text(extract_txt_text(file_path))

    raise ValueError(f"Unsupported file type: {extension}")


def clean_text(text: str) -> str:
    """
    Clean extracted text before chunking.
    """
    if not text:
        return ""

    # Normalize line endings
    text = text.replace("\r\n", "\n").replace("\r", "\n")

    # Replace tabs with spaces
    text = text.replace("\t", " ")

    # Remove multiple spaces
    text = re.sub(r"[ ]{2,}", " ", text)

    # Remove excessive blank lines
    text = re.sub(r"\n{3,}", "\n\n", text)

    # Trim leading/trailing whitespace
    return text.strip()