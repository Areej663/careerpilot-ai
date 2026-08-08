from app.api.health import router as health_router
from app.api.resume import router as resume_router
from app.api.job import router as job_router
from fastapi import FastAPI
from app.core.config import settings

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION
)

app.include_router(health_router)
app.include_router(resume_router)
app.include_router(job_router)

@app.get("/")
def root():
    return {
        "app": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "status": "running"
    }