from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Config(BaseSettings):
    OPENROUTER_API_KEY: str
    OPENROUTER_BASE_URL: str = "https://openrouter.ai/api/v1"
    OPENROUTER_MODEL: str
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8"
    )
    FRONTEND_URL: str = Field(
        default="http://localhost:3000",
        description="URL of the frontend application"
    )


def Settings() -> Config:
    """Returns the settings instance."""
    if not hasattr(Settings, "_instance"):
        Settings._instance = Config()
    return Settings._instance
