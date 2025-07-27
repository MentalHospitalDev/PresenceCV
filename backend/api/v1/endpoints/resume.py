from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
from services.format_converter import markdown_to_docx, json_to_markdown
from services.resume_generator import resume_generator, ScrapedData
from services.github_scraper import GithubScraper
from services.leetcode_scraper import LeetCodeScraper
from services.boot_dev import BootDevScraper
from models.resume import ProfileRequest
import os

router = APIRouter()

# Global variable to store the latest generated resume (in production, use database or session)
current_resume_data = None

router = APIRouter()

@router.post("/generate")
async def generate_resume(profile: ProfileRequest):
    try:
        github_profile = None
        github_repo = None
        leetcode_profile = None
        bootdev_profile = None
        
        scraped_data = {}
        
        #scrape github data
        if profile.github_user:
            github_scraper = GithubScraper(profile.github_user)
            try:
                github_profile = await github_scraper.fetch_profile()
                github_repo = await github_scraper.fetch_repositories()
            except Exception as e:
                print(f"Error: {e}")
        
        #rape leetcode data
        if profile.leetcode_user:
            leetcode_scraper = LeetCodeScraper(profile.leetcode_user)
            try:
                leetcode_profile = await leetcode_scraper.fetch_profile()
            except Exception as e:
                print(f"Error {e}")
                
        #scrape bootdev data
        if profile.bootdev_user:
            bootdev_scraper = BootDevScraper(profile.bootdev_user)
            try:
                bootdev_profile = await bootdev_scraper.fetch_profile()
            except Exception as e:
                print(f"Error {e}")
        
        if not any([github_profile, bootdev_profile, leetcode_profile]):
            raise HTTPException(status_code=400, detail="No valid data can be scrapped")
        
        scraped_data = ScrapedData(
            github_profile= github_profile,
            github_repositories=github_repo,
            bootdev_profile=bootdev_profile,
            leetcode_profile=leetcode_profile
        )
        
        #generate resume 
        #toggle datascrap summarizer here
        resume_json = resume_generator(scraped_data, use_summarizer=False)
        
        #convert to markdown
        markdown_content = json_to_markdown(resume_json)
        
        #convert to docx, save file
        docx_filename = markdown_to_docx(markdown_content)
        
        #store resume data globally for download endpoint
        global current_resume_data
        current_resume_data = {
            "resume_json": resume_json,
            "markdown": markdown_content,
            "docx_filename": docx_filename
        }
        return {
            "status": "success",
            "message": "Resume generated successfully",
            "docx_filename": docx_filename
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/download_resume")
def download_resume():
    try:
        if not current_resume_data:
            raise HTTPException(status_code=404, detail="No resume available.")
        
        docx_path = current_resume_data["docx_filename"]
        
        if not os.path.exists(docx_path):
            raise HTTPException(status_code=404, detail="Resume file not found")
        
        return FileResponse(
            docx_path, 
            media_type='application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
            filename=os.path.basename(docx_path)
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))