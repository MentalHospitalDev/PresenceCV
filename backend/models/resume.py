from pydantic import BaseModel
from typing import Optional

class Form(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    location: Optional[str] = None
    linkedin: Optional[str] = None
    github: Optional[str] = None
    twitter: Optional[str] = None
    website: Optional[str] = None

class ProfileRequest(BaseModel):
    github_user: Optional[str] = None
    leetcode_user: Optional[str] = None
    bootdev_user: Optional[str] = None
    summarize: Optional[bool] = False
    personal: Optional[Form] = None
