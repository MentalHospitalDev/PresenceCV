from typing import Literal
from pydantic import BaseModel, Field



class LeetCodeProfile(BaseModel):
    username: str = Field(..., description="LeetCode username")
    ranking: int = Field(..., description="Ranking of the user on LeetCode")
    url: str = Field(..., description="URL to the LeetCode profile")
    skills : list[str] = Field(default_factory=list, description="List of skills associated with the user")
    bio: str | None = Field(None, description="Short biography of the user")
    ranking: int = Field(..., description="Ranking of the user on LeetCode")
    problem_diff_counts: dict[Literal["easy", "intermediate", "hard"], int] = Field(default_factory=dict, description="Counts of problems solved by difficulty level")
    solved_problems_count: int = Field(..., description="Number of problems solved by the user")
    most_common_languages: list[str] = Field(default_factory=list, description="List of most common programming languages used by the user")


