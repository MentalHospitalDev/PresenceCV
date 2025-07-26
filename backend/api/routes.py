from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class ProfileRequest(BaseModel):
    github_url: str | None
    twitter_url: str | None

@router.post("/generate")
def generate_resume(profile: ProfileRequest):
    #TODO: scrape profile, generate resume, return file
    return {"message": "Resume generation started", "profile": profile}
    
@router.get("/resume/{resume_id}")
def get_resume(resume_id: str):
    #TODO: return generated resume (PDF/HTML)
    return {"message": f"Fetching resume {resume_id}"}

@router.get("/regenerate")
def regenerate_resume():
    return {"message": f"Regenerating resume with adjustments"}