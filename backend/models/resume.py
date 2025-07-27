from pydantic import BaseModel
from typing import Optional


class ProfileRequest(BaseModel):
    github_user: Optional[str] = None
    leetcode_user: Optional[str] = None
    bootdev_user: Optional[str] = None
    summarize: Optional[bool] = False
