from pathlib import Path

from pypdf import PdfReader


def extract_text_from_pdf(file_path: Path) -> str:
    """
    Extract selectable text from a PDF resume.

    Args:
        file_path: Path to the PDF file.

    Returns:
        Extracted text as a single string.

    Raises:
        ValueError: If the PDF contains no selectable text.
    """

    try:
        reader = PdfReader(file_path)

        text_parts = []

        for page in reader.pages:
            page_text = page.extract_text()

            if page_text:
                text_parts.append(page_text.strip())

        text = "\n".join(text_parts).strip()

        if not text:
            raise ValueError(
                "No selectable text found in the PDF."
            )

        return text

    except ValueError:
        raise

    except Exception as exc:
        raise RuntimeError(
            f"Unable to read PDF: {exc}"
        ) from exc