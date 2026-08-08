import os
import shutil

from fastapi import APIRouter, UploadFile, File, HTTPException

from app.services.job_service import extract_text_from_job_pdf
from app.services.parser import extract_resume_info

print("✅ job.py loaded")

router = APIRouter()

UPLOAD_DIR = "job_uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/job/upload")
async def upload_job(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        job_text = extract_text_from_job_pdf(file_path)
        job_data = extract_resume_info(job_text)

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Error reading Job PDF: {str(e)}"
        )

    return {
        "filename": file.filename,
        "content_type": file.content_type,
        "saved_to": file_path,
        "text_preview": job_text[:500],
        "parsed_data": job_data,
        "message": "Job Description uploaded successfully"
    }