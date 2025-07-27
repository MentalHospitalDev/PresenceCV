from pydantic import BaseModel, Field
import httpx


    


class Repository(BaseModel):
    name: str = Field(..., description="Name of the repository")
    url: str = Field(..., description="URL to the repository")
    description: str | None = Field(None, description="Description of the repository")
    stars: int = Field(..., description="Number of stars the repository has")
    forks: int = Field(..., description="Number of forks of the repository")
    readme: str | None = Field(None, description="README content of the repository")
    language: str | None = Field(None, description="Primary programming language used in the repository")
    topics	: list[str] = Field(default_factory=list, description="List of topics associated with the repository")

class GithubProfile(BaseModel):
    login: str = Field(..., description="GitHub username")
    id : int = Field(..., description="Unique identifier for the user")
    url: str = Field(..., description="URL to the GitHub profile")
    avatar_url: str = Field(..., description="URL to the avatar image")
    bio: str | None = Field(None, description="Short biography of the user")
    public_repos: int = Field(..., description="Number of public repositories")
    followers: int = Field(..., description="Number of followers")
    following: int = Field(..., description="Number of users being followed")



