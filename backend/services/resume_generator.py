import os
import json
from litellm import completion
from pydantic import BaseModel
from dotenv import load_dotenv
from typing import Optional, Union

from uvicorn import Config
from backend.models.resume import Form
from models.Github import GithubProfile, Repository
from models.leetcode import LeetCodeProfile
from models.bootdev import BootDevProfile
from core.config import Settings

class PersonalInfo(BaseModel):
    name: str = ""
    email: str = ""
    phone: str = ""
    location: str = ""
    linkedin: str = ""
    github: str = ""
    twitter: str = ""
    website: str = ""

class Experience(BaseModel):
    title: str = ""
    company: str = ""
    duration: str = ""
    description: str = ""

class Project(BaseModel):
    name: str = ""
    description: str = ""
    technologies_used: list[str] = []

class Education(BaseModel):
    degree: str = ""
    institution: str = ""
    year: str = ""

class Resume(BaseModel):
    personal_info: PersonalInfo
    summary: str = ""
    skills: list[str] = []
    experience: list[Experience] = []
    projects: list[Project] = []
    education: list[Education] = []
    achievements: list[str] = []

class ScrapedData(BaseModel):
    github_profile: Optional[GithubProfile] = None
    github_repositories: Optional[list[Repository]] = None
    leetcode_profile: Optional[LeetCodeProfile] = None
    bootdev_profile: Optional[BootDevProfile] = None
    personal_info: Optional[Form] = None

class SummarizedData(BaseModel):
    personal_info: dict = {}
    technical_skills: list[str] = []
    key_projects: list[dict] = []
    learning_achievements: list[str] = []
    problem_solving_stats: dict = {}
    professional_experience_indicators: list[str] = []
    education_background: list[str] = []

def data_summarizer(scraped_data: ScrapedData):
    system_instruction = data_summarizer_sys_prompt()
    scraped_data_dict = scraped_data.model_dump(exclude_none=True)
    
    user_content = f"""
    summarize the following scraped data for resume creation:
    {json.dumps(scraped_data_dict, indent=2)}
    """

    try:
        print("Summarizing data for resume generation...")
        print("config ", Settings().OPENROUTER_MODEL)
        response = completion(
            model=f"openrouter/{Settings().OPENROUTER_MODEL}",
            messages=[
                {"role": "system", "content": system_instruction},
                {"role": "user", "content": user_content}
            ],
            response_format={"type": "json_object"}
        )
        
        #parse json
        summary_json = json.loads(response.choices[0].message.content)
        #validate
        summarized_data = SummarizedData(**summary_json)
        return summarized_data
    
    except Exception as e:
        print(f"Error summarizing data: {e}")
        return None

def resume_generator(data: Union[ScrapedData, SummarizedData], use_summarizer: Optional[bool] = False):
    if isinstance(data, ScrapedData):
        if use_summarizer:
            summarized_data = data_summarizer(data)
            input_data = summarized_data.model_dump()
            system_instruction = with_data_summarizer()
        else:
            input_data = data.model_dump(exclude_none=True)
            system_instruction = without_data_summarizer()
    else:
        input_data = data.model_dump()
        system_instruction = with_data_summarizer()
    
    user_content = f"""
    Create a professional resume using this data:
    {json.dumps(input_data, indent=2)}
    """

    try:
        print("Generating resume...")
        print("config ", Settings().OPENROUTER_MODEL)
        response = completion(
            model=f"openrouter/{Settings().OPENROUTER_MODEL}",
            messages=[
                {"role": "system", "content": system_instruction},
                {"role": "user", "content": user_content}
            ],
            response_format={"type": "json_object"}
        )
        
        #parse json
        resume_json = json.loads(response.choices[0].message.content)
        #validate
        resume_model = Resume(**resume_json)
        #return as dict
        return resume_model.model_dump()
        
    except Exception as e:
        print(f"Error generating resume: {e}")
        return None

def with_data_summarizer() -> str:
    return """expert resume writer. create professional resume from summarized data.
    Required JSON structure: personal_info{name,email,phone,location,linkedin,github,twitter,website}, summary(string), skills(array), experience(array with title,company,duration,description), projects(array with name,description,technologies_used), education(array with degree,institution,year), achievements(array).
    guidelines:
    - professional summary highlighting key strengths
    - transform projects into impressive descriptions
    - use stats to show analytical capabilities
    - add professional experience if any
    - fill missing info with "[USER INPUT REQUIRED]"
    - skip underwhelming stats

    return valid JSON only, no markdown."""

def without_data_summarizer() -> str:
    return """expert resume writer. create professional resume from GitHub, LeetCode, Boot.dev data.
    Required JSON structure: personal_info{name,email,phone,location,linkedin,github,twitter,website}, summary(string), skills(array), experience(array with title,company,duration,description), projects(array with name,description,technologies_used), education(array with degree,institution,year), achievements(array).
    Extract:
    - professional summary highlighting skills/experience
    - gitHub projects with meaningful descriptions
    - boot.dev courses for learning journey
    - leetCode achievements for problem-solving
    - professional experience if any
    - fill missing info with "[USER INPUT REQUIRED]"
    - focus on impressive, relevant info only
    - skip underwhelming stats (e.g. <50 LeetCode problems)

    return valid JSON only, no markdown."""
    
def data_summarizer_sys_prompt() -> str:
    return """expert data analyst. extract and summarize GitHub, LeetCode, Boot.dev data. 

    extract:
    - personal info (name, location, URLs)
    - technical skills (languages, frameworks, tools)
    - key impressive projects with descriptions
    - learning achievements (courses, certifications)
    - problem-solving stats (only if >50 problems)
    - professional experience indicators
    - education background

    Qrules:
    - skip underwhelming stats (<50 LeetCode, <200 followers)
    - prioritize recent/active projects
    - focus on career-relevant info only

    Return valid JSON only."""

