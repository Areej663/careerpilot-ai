import os
import shutil

from fastapi import APIRouter, UploadFile, File, HTTPException

from app.services.resume_service import extract_text_from_pdf
from app.services.parser import extract_resume_info

router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/upload")
async def upload_resume(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        resume_text = extract_text_from_pdf(file_path)
        resume_data = extract_resume_info(resume_text)

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Error reading PDF: {str(e)}"
        )

    return {
        "filename": file.filename,
        "content_type": file.content_type,
        "saved_to": file_path,
        "text_preview": resume_text[:500],
        "parsed_data": resume_data,
        "message": "Resume uploaded successfully"
    }