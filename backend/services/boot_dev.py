from models.bootdev import BootDevProfile, Course
import httpx 


class BootDevScraper:
    def __init__(self, username: str):
        self.username = username
        self.profile = BootDevProfile(username=username)
    
    async def fetch_profile(self) -> BootDevProfile:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"https://api.boot.dev/v1/users/public/{self.username}/tracks_and_courses",
                headers={
                    "content-type": "application/json"
                }
            )
            response.raise_for_status()
            data = response.json()
            if not data.get("data", None):
                raise ValueError("No data found for the user")
            data = data["data"]
            for course_data in data.get("Courses", []):
                course_data = await client.get(f"https://api.boot.dev/v1/static/courses/slug/{course_data.get('Slug')}")
                course_data.raise_for_status()
                course_data = course_data.json()
                if not course_data.get("Course", None):
                    print("not")
                    continue
                course_data = course_data["Course"]
                course = Course(
                    title=course_data.get("Title"),
                    description=course_data.get("Description"),
                    lessons=list(map(lambda x: x.get("Title"), course_data.get("Chapters", []))),
                    slug=course_data.get("Slug"),
                    language=course_data.get("Language")
                )
                print(course)
                self.profile.courses_done.append(course)
            
            return self.profile
        


