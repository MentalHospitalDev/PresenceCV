from models.leetcode import LeetCodeProfile
import httpx


class LeetCodeScraper:
    def __init__(self, username: str):
        self.username = username
        self.profile = None

    async def fetch_profile(self) :
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://leetcode.com/graphql/",
                headers={
                    "Content-Type": "application/json",
                },
                json={
                    "query": """
                query mergedUserInfo($username: String!) {
                matchedUser(username: $username) {
                    profile {
                    ranking
                    aboutMe
                    }
                    languageProblemCount {
                    languageName
                    problemsSolved
                    }
                    tagProblemCounts {
                        advanced {
                            tagName
                            tagSlug
                            problemsSolved
                        }
                        intermediate {
                            tagName
                            tagSlug
                            problemsSolved
                        }
                        fundamental {
                            tagName
                            tagSlug
                            problemsSolved
                        }
                    }
                    submitStats {
                        acSubmissionNum {
                            difficulty
                            count
                            submissions
                        }
                    }
                }
                }
                    """,
                    "variables": {
                        "username": "weismannS"
                    },
                    "operationName": "mergedUserInfo"
                }
            )
            
            response.raise_for_status()
            data = response.json().get("data", {}).get("matchedUser", None)
            if not data:
                raise ValueError("User not found or no data available")
            print(data)
            self.profile = LeetCodeProfile(
                username=self.username,
                ranking=data["profile"]["ranking"],
                url=f"https://leetcode.com/{self.username}/",
                skills=[tag["tagName"] for diff in data["tagProblemCounts"] for tag in data["tagProblemCounts"][diff]],
                bio=data["profile"].get("aboutMe", ""),
                problem_diff_counts={
                    "easy": sum(item["count"] for item in data["submitStats"]["acSubmissionNum"] if item["difficulty"] == "Easy"),
                    "intermediate": sum(item["count"] for item in data["submitStats"]["acSubmissionNum"] if item["difficulty"] == "Medium"),
                    "hard": sum(item["count"] for item in data["submitStats"]["acSubmissionNum"] if item["difficulty"] == "Hard"),
                },
                solved_problems_count=sum(item["count"] for item in data["submitStats"]["acSubmissionNum"]),
                most_common_languages=[lang["languageName"] for lang in data["languageProblemCount"]][:3]  # Top 3 languages
            )
            print(self.profile)
            return self.profile
            



