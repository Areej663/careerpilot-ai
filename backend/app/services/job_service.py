from pathlib import Path

from PIL import Image
from pdf2image import convert_from_path
from pypdf import PdfReader
import pytesseract


POPPLER_PATH = r"C:\poppler\poppler-26.02.0\Library\bin"
TESSERACT_PATH = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

pytesseract.pytesseract.tesseract_cmd = TESSERACT_PATH


SUPPORTED_IMAGE_HEADERS = {
    b"\xff\xd8\xff": "JPEG",
    b"\x89PNG": "PNG",
}


def _extract_pdf_text(file_path: Path) -> str:
    """Extract selectable text from a PDF."""

    reader = PdfReader(file_path)
    text_parts = []

    for page in reader.pages:
        page_text = page.extract_text()

        if page_text:
            cleaned_text = page_text.strip()

            if cleaned_text:
                text_parts.append(cleaned_text)

    return "\n".join(text_parts)


def _ocr_pdf(file_path: Path) -> str:
    """Convert PDF pages to images and extract text using Tesseract."""

    images = convert_from_path(
        str(file_path),
        poppler_path=POPPLER_PATH,
    )

    text_parts = []

    for image in images:
        page_text = pytesseract.image_to_string(image).strip()

        if page_text:
            text_parts.append(page_text)

    return "\n".join(text_parts)


def _ocr_image(file_path: Path) -> str:
    """Extract text from a JPEG or PNG image using Tesseract."""

    with Image.open(file_path) as image:
        return pytesseract.image_to_string(image).strip()


def extract_text_from_job_pdf(file_path: Path) -> str:
    """
    Extract text from a job description PDF, JPEG, or PNG.

    PDFs with selectable text are processed directly.
    Scanned PDFs are processed using OCR.
    JPEG and PNG files are processed directly using OCR.
    """

    if not file_path.exists():
        raise FileNotFoundError(
            f"Job description file not found: {file_path}"
        )

    with file_path.open("rb") as file:
        header = file.read(8)

    if header.startswith(b"%PDF"):
        text = _extract_pdf_text(file_path)

        if not text.strip():
            text = _ocr_pdf(file_path)

    elif header.startswith(b"\xff\xd8\xff"):
        text = _ocr_image(file_path)

    elif header.startswith(b"\x89PNG"):
        text = _ocr_image(file_path)

    else:
        raise ValueError(
            "Unsupported file format. Please upload a PDF, JPEG, or PNG file."
        )

    if not text.strip():
        raise ValueError(
            "No readable text could be extracted from the job description."
        )

    return text