from fastapi import APIRouter
from fastapi.responses import FileResponse
from services.format_converter import markdown_to_docx, json_to_markdown
from models.resume import ProfileRequest
import json
import os

router = APIRouter()


@router.post("/generate")
def generate_resume(profile: ProfileRequest):
    # TODO: scrape profile, generate resume, return file
    return {"message": "Resume generation started", "profile": profile}


# @router.get("/download_resume")
# def download_resume():
    
#     json_path = os.path.join(os.path.dirname(__file__), "..", "..", "..", "generated_resume.json")
    
#     with open(json_path, "r", encoding="utf-8") as file:
#         resume_data = json.load(file)
    
#     markdown_content = json_to_markdown(resume_data)
#     docx_path = markdown_to_docx(markdown_content)
    
#     return FileResponse(
#         docx_path, 
#         media_type='application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
#         filename="resume.docx"
#     )


@router.get("/regenerate")
def regenerate_resume():
    return {"message": f"Regenerating resume with adjustments"}
