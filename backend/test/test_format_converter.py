import json
import os
from services.format_converter import json_to_markdown, markdown_to_docx

def test_markdown():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    json_path = os.path.join(base_dir, "..", "generated_resume.json")
    md_path = os.path.join(base_dir, "..", "generated_resume.md")
    
    with open(json_path, "r", encoding="utf-8") as file:
        resume_data = json.load(file)
        
        markdown_content = json_to_markdown(resume_data)

        with open(md_path, "w", encoding="utf-8") as m:
            m.write(markdown_content)
        
    print("Markdown resume saved as generated_resume.md")
    return markdown_content
    
def test_docx(markdown_content: str):
    docx_file = markdown_to_docx(markdown_content)
    print(f"docx resume saved as {docx_file}")
        
    
    