from fastapi import FastAPI
from api.v1.api import api_router
from core.config import Settings

app = FastAPI(title="PresenceCV API")

app.include_router(api_router, prefix="/api/v1")


@app.get("/")
def read_root():
    return {"message": "Welcome to the PresenceCV API"}


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "api_configured": bool(Settings().OPENROUTER_API_KEY)
    }
