import os
import json
from litellm import completion
from pydantic import BaseModel
from dotenv import load_dotenv
from typing import Optional, Union
from models.Github import GithubProfile, Repository
from models.leetcode import LeetCodeProfile
from models.bootdev import BootDevProfile

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

class SummarizedData(BaseModel):
    personal_info: dict = {}
    technical_skills: list[str] = []
    key_projects: list[dict] = []
    learning_achievements: list[str] = []
    problem_solving_stats: dict = {}
    professional_experience_indicators: list[str] = []
    education_background: list[str] = []

def data_summarizer(scraped_data: ScrapedData):
    load_dotenv()
    api_key = os.environ.get("OPENROUTER_API_KEY")
    
    
    system_instruction = data_summarizer_sys_prompt()
    scraped_data_dict = scraped_data.model_dump(exclude_none=True)
    
    user_content = f"""
    summarize the following scraped data for resume creation:
    {json.dumps(scraped_data_dict, indent=2)}
    """

    try:
        response = completion(
            model="openrouter/google/gemini-2.5-flash",
            api_key=api_key,
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

def resume_generator(data: Union[ScrapedData, SummarizedData], use_summarizer: bool = False):
    load_dotenv()
    api_key = os.environ.get("OPENROUTER_API_KEY")
    
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
        response = completion(
            model="openrouter/google/gemini-2.5-pro",
            api_key=api_key,
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
    return """
    you are an expert resume writer with the experts in creating cool af resumes
    
    pls listen to me: You must return valid JSON matching this exact structure:
    {
        "personal_info": {"name": "string", "email": "string", "phone": "string", "location": "string", "linkedin": "string", "github": "string", "twitter": "string", "website": "string"},
        "summary": "string",
        "skills": ["string1", "string2"],
        "experience": [{"title": "string", "company": "string", "duration": "string", "description": "string"}],
        "projects": [{"name": "string", "description": "string", "technologies_used": ["string1"]}],
        "education": [{"degree": "string", "institution": "string", "year": "string"}],
        "achievements": ["string1", "string2"]
    }
    
    create a professional resume following these guidelines:
    - write a professional summary that highlights key strengths
    - transform project data into impressive project descriptions
    - use problem-solving stats to demonstrate analytical capabilities
    - create profesional experience if there's any
    - fill missing information with "[USER INPUT REQUIRED]" placeholders
    
    RETURN ONLY VALID JSON STRUCTURE, NO MARKDOWN, NO FORMATTING pls pls pls
    """

def without_data_summarizer() -> str:
    return """
    You are a professional AI resume writer. Based on the provided scraped user data from GitHub, boot.dev, and leetcode, create a cool af resume.
    
    pls listen to me: You must return valid JSON matching this exact structure:
    {
        "personal_info": {"name": "string", "email": "string", "phone": "string", "location": "string", "linkedin": "string", "github": "string", "twitter": "string", "website": "string"},
        "summary": "string",
        "skills": ["string1", "string2"],
        "experience": [{"title": "string", "company": "string", "duration": "string", "description": "string"}],
        "projects": [{"name": "string", "description": "string", "technologies_used": ["string1"]}],
        "education": [{"degree": "string", "institution": "string", "year": "string"}],
        "achievements": ["string1", "string2"]
    }
    
    important instructions:
    - extract information from the scraped data
    - create a professional summary that highlights skills and maybe experience
    - infer projects from github with meaningful descriptions
    - use boot.dev courses to highlight learning journey
    - add leetcode achievements to showcase problem-solving skill
    - generate profesional entries, if the user has any
    - fill missing information with "[USER INPUT REQUIRED]" placeholders
    - make reasonable professional inferences from the available data
    - highlight learning journey
    - forcus on impressive and relevant info
    
    RETURN ONLY VALID JSON STRUCTURE, NO MARKDOWN, NO FORMATTING pls pls pls
    """
    
def data_summarizer_sys_prompt() -> str:
    return """
    you are an expert data analyst in extracting and summarizing information.
    
    pls listen to me: You must return valid JSON matching this exact structure:
{
  "personal_info": {
    "name": "string",
    "location": "string", 
    "github_url": "string",
    "leetcode_url": "string"
  },
  "technical_skills": ["skill1", "skill2"],
  "key_projects": [
    {
      "name": "string",
      "description": "string",
      "technologies": "string"
    }
  ],
  "learning_achievements": ["achievement1", "achievement2"],
  "problem_solving_stats": {
    "total_problems": 0,
    "difficulty_breakdown": "string",
    "languages": ["lang1", "lang2"]
  },
  "professional_experience_indicators": ["indicator1", "indicator2"],
  "education_background": ["education1", "education2"]
}
    
    your task is to analyzed scrapped data from github, leetcode, boot.dev that highlights:
    - Personal info: extract name, location, contact details, and professional links
    - Technical skills: programming languages, frameworks, tools
    - Key projects: impressive GitHub repositories with meaningful descriptions
    - Learning achievements: summarize completed courses, certifications, continuous learning
    - Problem-solving stats: extract leetcode stats
    - Professional indicators: look for patterns suggesting employment, freelance work, or professional experience
    - Education background: infer formal or informal education from courses and project complexity
    
    quality guidelines:
    - prioritize active projects and if applicable recent ones
    - highlight consistent learning patterns
    - extract quantifiable achievements
    - identify professional work patterns
    - only focus on career-relevant information
    
    RETURN ONLY VALID JSON STRUCTURE, NO MARKDOWN, NO FORMATTING pls pls pls
    """

