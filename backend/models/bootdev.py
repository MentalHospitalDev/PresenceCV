from pydantic import BaseModel, Field


class Course(BaseModel):
    title : str = Field(..., description="Title of the course")
    description: str | None = Field(None, description="Description of the course")
    slug: str = Field(..., description="Slug for the course URL")
    lessons : list[str] = Field(default_factory=list, description="List of lessons in the course")
    language: str | None = Field(None, description="Primary programming language used in the course")
class BootDevProfile(BaseModel):
    username: str = Field(..., description="Boot.dev username")
    courses_done: list[Course] = Field(default_factory=list, description="List of courses associated with the user")

