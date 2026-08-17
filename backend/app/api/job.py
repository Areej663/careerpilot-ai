from pathlib import Path
import shutil

from fastapi import APIRouter, File, HTTPException, UploadFile

from app.services.job_service import extract_text_from_job_pdf
from app.services.parser import extract_job_info


router = APIRouter()

UPLOAD_DIR = Path("job_uploads")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)


@router.post("/job/upload")
async def upload_job(file: UploadFile = File(...)):
    if not file.filename:
        raise HTTPException(
            status_code=400,
            detail="No file was uploaded.",
        )

    file_path = UPLOAD_DIR / file.filename

    try:
        with file_path.open("wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        job_text = extract_text_from_job_pdf(file_path)
        job_data = extract_job_info(job_text)

        return {
            "filename": file.filename,
            "content_type": file.content_type,
            "saved_to": str(file_path),
            "text_preview": job_text[:500],
            "parsed_data": job_data,
            "message": "Job Description uploaded successfully",
        }

    except ValueError as exc:
        raise HTTPException(
            status_code=400,
            detail=str(exc),
        ) from exc

    except FileNotFoundError as exc:
        raise HTTPException(
            status_code=404,
            detail="Uploaded job description file could not be found.",
        ) from exc

    except Exception as exc:
        print(
            f"JOB PROCESSING ERROR: "
            f"{type(exc).__name__}: {exc}"
        )

        raise HTTPException(
            status_code=500,
            detail="Unexpected error while processing the job description.",
        ) from exc