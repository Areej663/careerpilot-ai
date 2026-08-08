from pathlib import Path
from pypdf import PdfReader

def extract_text_from_pdf(file_path: Path) -> str:
    reader = PdfReader(file_path)

    text = ""

    print("=" * 50)
    print("Reading:", file_path)

    for i, page in enumerate(reader.pages):
        page_text = page.extract_text()

        print(f"Page {i+1}:")
        print(repr(page_text))
        print("-" * 50)

        if page_text:
            text += page_text + "\n"

    print("Final Text Length:", len(text))
    print("=" * 50)

    return text