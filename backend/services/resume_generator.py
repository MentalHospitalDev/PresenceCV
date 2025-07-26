import os
from google import genai
from google.genai import types
from dotenv import load_dotenv

def resume_generator(user_data: str):
    load_dotenv()
    api_key = os.environ.get("GEMINI_API_KEY")
    client = genai.Client(api_key=api_key)

    response = client.models.generate_content(
    model="gemini-2.5-flash",
    config=types.GenerateContentConfig(
        system_instruction="You are a professional AI resume writer. Parse the user's data and return a structured JSON object representing a clean resume."),
    contents=user_data
    )
    
    print(response.text)