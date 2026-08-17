from pathlib import Path
import shutil

from fastapi import APIRouter, File, HTTPException, UploadFile

from app.services.job_service import extract_text_from_job_pdf
from app.services.matching_service import calculate_match
from app.services.parser import extract_job_info, extract_resume_info
from app.services.resume_service import extract_text_from_pdf


router = APIRouter()

UPLOAD_DIR = Path("match_uploads")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

ALLOWED_JOB_TYPES = {
    "application/pdf",
    "image/jpeg",
    "image/png",
}


@router.post("/match/files")
async def match_files(
    resume: UploadFile = File(...),
    job: UploadFile = File(...),
):
    """Match a resume against a job description."""

    if not resume.filename:
        raise HTTPException(
            status_code=400,
            detail="No resume file was uploaded.",
        )

    if not job.filename:
        raise HTTPException(
            status_code=400,
            detail="No job description file was uploaded.",
        )

    resume_filename_lower = (resume.filename or "").lower()
    if resume.content_type != "application/pdf" and not resume_filename_lower.endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Resume must be a PDF file.",
        )

    job_filename_lower = (job.filename or "").lower()
    job_ext_valid = (
        job.content_type in ALLOWED_JOB_TYPES
        or job_filename_lower.endswith(".pdf")
        or job_filename_lower.endswith(".jpg")
        or job_filename_lower.endswith(".jpeg")
        or job_filename_lower.endswith(".png")
    )
    if not job_ext_valid:
        raise HTTPException(
            status_code=400,
            detail="Job must be a PDF, JPEG, or PNG file.",
        )

    resume_path = UPLOAD_DIR / f"resume_{resume.filename}"
    job_path = UPLOAD_DIR / f"job_{job.filename}"

    try:
        with resume_path.open("wb") as buffer:
            shutil.copyfileobj(resume.file, buffer)

        with job_path.open("wb") as buffer:
            shutil.copyfileobj(job.file, buffer)

        resume_text = extract_text_from_pdf(resume_path)
        job_text = extract_text_from_job_pdf(job_path)

        resume_data = extract_resume_info(resume_text)
        job_data = extract_job_info(job_text)

        matching_result = calculate_match(
            resume_data,
            job_data,
        )

        return {
            "message": "Resume and Job Description matched successfully",
            "resume": {
                "filename": resume.filename,
                "skills": resume_data["skills"],
            },
            "job": {
                "filename": job.filename,
                "skills": job_data["skills"],
            },
            "matching_result": matching_result,
        }

    except ValueError as exc:
        raise HTTPException(
            status_code=400,
            detail=str(exc),
        ) from exc

    except FileNotFoundError as exc:
        raise HTTPException(
            status_code=404,
            detail="Uploaded file could not be found.",
        ) from exc

    except RuntimeError as exc:
        print(
            f"MATCHING ERROR: "
            f"{type(exc).__name__}: {exc}"
        )

        raise HTTPException(
            status_code=500,
            detail="Unable to process the matching request.",
        ) from exc

    except Exception as exc:
        print(
            f"MATCHING ERROR: "
            f"{type(exc).__name__}: {exc}"
        )

        raise HTTPException(
            status_code=500,
            detail="Unable to match the resume with the job description.",
        ) from exc