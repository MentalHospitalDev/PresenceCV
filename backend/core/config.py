from pydantic_settings import BaseSettings, SettingsConfigDict


class Config(BaseSettings):
    OPENROUTER_API_KEY: str
    OPENROUTER_BASE_URL: str = "https://openrouter.ai/api/v1"
    OPENROUTER_MODEL: str
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8"
    )


def Settings() -> Config:
    """Returns the settings instance."""
    if not hasattr(Settings, "_instance"):
        Settings._instance = Config()
    return Settings._instance
