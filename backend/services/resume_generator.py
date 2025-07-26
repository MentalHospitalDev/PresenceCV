import os
import json
from google import genai
from google.genai import types
from dotenv import load_dotenv

def resume_generator(user_data: dict):
    load_dotenv()
    api_key = os.environ.get("GEMINI_API_KEY")
    client = genai.Client(api_key=api_key)

    resume_template = {
        "personal_info": {
            "name": "",
            "email": "",
            "phone": "",
            "location": "",
            "linkedin": "",
            "github": "",
            "twitter": "",
            "website": ""
        },
        "summary": "",
        "skills": [],
        "experience": [],
        "projects": [],
        "education": [],
        "achievements": []
    }

    system_instruction = f"""
    You are a professional AI resume writer. Based on the provided scraped user data from GitHub, Twitter, and other sources, create a well-structured resume following a professional template style.
    IMPORTANT INSTRUCTIONS:

    Extract and organize information from the provided JSON data
    Fill in the resume template structure provided
    If information is missing or unavailable, use "[USER INPUT REQUIRED]" as a placeholder to indicate that the user needs to provide this information
    Make reasonable inferences for missing data when appropriate
    Ensure the resume is professional and well-formatted
    Focus on technical skills, projects, and achievements from the scraped data
    Return ONLY a valid JSON object matching the template structure
    Do not wrap the JSON response in markdown code blocks or any other formatting pls pls pls pls pls
    Return raw json only pls i beg u

    Template Structure to Follow:
    {json.dumps(resume_template, indent=2)}

    Return the completed resume as a JSON object with the same structure.
    """

    content = f"""
            Scraped User Data:
            {json.dumps(user_data, indent=2)}
            Please create a resume based on this data following the template structure provided in the system instruction.
            """

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        config=types.GenerateContentConfig(
            system_instruction=system_instruction),
        contents=content
    )
    
    try:
        resume_data = json.loads(response.text)
        
        output_filename = "generated_resume.json"
        with open(output_filename, "w", encoding="utf-8") as f:
            json.dump(resume_data, f, ensure_ascii=False, indent=2)
        
        print(f"Resume saved to {output_filename}")
        
    except json.JSONDecodeError as e:
        print(f"Error parsing JSON response: {e}")
        print("Raw response:")
        print(response.text)
        return None
    