from pydantic import BaseModel, Field



class BootDevProfile(BaseModel):
    username: str = Field(..., description="Boot.dev username")
    url: str = Field(..., description="URL to the Boot.dev profile")
    skills: list[str] = Field(default_factory=list, description="List of skills associated with the user")
    bio: str | None = Field(None, description="Short biography of the user")
    solved_problems_count: int = Field(..., description="Number of problems solved by the user")
    most_common_languages: list[str] = Field(default_factory=list, description="List of most common programming languages used by the user")
