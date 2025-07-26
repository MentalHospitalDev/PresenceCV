from pydantic import BaseModel


class ProfileRequest(BaseModel):
    github_url: str | None
    twitter_url: str | None
