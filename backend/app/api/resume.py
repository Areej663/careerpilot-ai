from pathlib import Path
import shutil

from fastapi import APIRouter, UploadFile, File, HTTPException

from app.services.resume_service import extract_text_from_pdf
from app.services.parser import extract_resume_info


router = APIRouter()

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

ALLOWED_CONTENT_TYPES = {
    "application/pdf",
}


@router.post("/upload")
async def upload_resume(file: UploadFile = File(...)):
    if file.content_type not in ALLOWED_CONTENT_TYPES:
        raise HTTPException(
            status_code=400,
            detail="Resume must be a PDF file."
        )

    if not file.filename:
        raise HTTPException(
            status_code=400,
            detail="No filename provided."
        )

    filename = Path(file.filename).name
    file_path = UPLOAD_DIR / filename

    try:
        with file_path.open("wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        resume_text = extract_text_from_pdf(file_path)

        if not resume_text.strip():
            raise HTTPException(
                status_code=400,
                detail="Could not extract text from the resume."
            )

        resume_data = extract_resume_info(resume_text)

        return {
            "filename": filename,
            "content_type": file.content_type,
            "text_preview": resume_text[:500],
            "parsed_data": resume_data,
            "message": "Resume uploaded successfully"
        }

    except HTTPException:
        raise

    except Exception as exc:
        raise HTTPException(
            status_code=400,
            detail=f"Unable to process resume: {str(exc)}"
        )

    finally:
        await file.close()