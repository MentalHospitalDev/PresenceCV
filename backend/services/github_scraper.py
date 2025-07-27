from models.Github import GithubProfile, Repository

import httpx


class GithubScraper:
    def __init__(self, username: str):
        self.username = username
        self.base_url = f"https://api.github.com/users/{username}"
        self.profile = None
        self.repositories = []
    async def fetch_profile(self) -> GithubProfile:
        async with httpx.AsyncClient() as client:
            response = await client.get(self.base_url)
            response.raise_for_status()
            self.profile = GithubProfile(**response.json())
            return self.profile

    async def fetch_repositories(self) -> list[Repository]:
        async with httpx.AsyncClient() as client:
            response = await client.get(f"{self.base_url}/repos")
            response.raise_for_status()
            for repo in response.json():
                readme = await client.get(f"https://raw.githubusercontent.com/{self.username}/master/README.md")
                self.repositories.append(Repository(**repo, stars=repo.get("stargazers_count", 0), readme=readme.text if readme.status_code == 200 else None))
            return self.repositories


