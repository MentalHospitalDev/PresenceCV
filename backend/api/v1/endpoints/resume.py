import io
from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import StreamingResponse
from services.format_converter import markdown_to_docx, json_to_markdown
from services.resume_generator import resume_generator, ScrapedData
from services.github_scraper import GithubScraper
from services.leetcode_scraper import LeetCodeScraper
from services.boot_dev import BootDevScraper
from models.resume import ProfileRequest
from datetime import datetime
from cachetools import TTLCache

router = APIRouter()

rate_limit = 30  # seconds btw

last_request_times = TTLCache(maxsize=10000, ttl=rate_limit) # i used to have this as dict, but now this is much better

@router.post("/generate")
async def generate_resume(profile: ProfileRequest, request: Request):
    if request.client:
        client_ip = request.client.host
        if client_ip in last_request_times:
            raise HTTPException(
                status_code=429,
                detail=f"Rate limit exceeded. Please wait {rate_limit} seconds before making another request."
            )

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
        
        #scrape leetcode data
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
            leetcode_profile=leetcode_profile,
            personal_info= profile.personal
        )
        
        #generate resume
        resume_json = resume_generator(scraped_data, use_summarizer=profile.summarize)
        print(resume_json)
        #convert to markdown
        markdown_content = json_to_markdown(resume_json)
        
        #convert to docx, save file
        docx_buffer, docx_filename = markdown_to_docx(markdown_content)
        
        # Instead of saving buffer in memory, return it directly as a response
        docx_buffer.seek(0)
        last_request_times[client_ip] = datetime.now()
        return StreamingResponse(
            io.BytesIO(docx_buffer.read()),
            media_type='application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            headers={"Content-Disposition": f"attachment; filename={docx_filename}"}
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
