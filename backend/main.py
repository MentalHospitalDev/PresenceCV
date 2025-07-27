from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.v1.api import api_router
from core.config import Settings

app = FastAPI(title="PresenceCV API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000",
                   "http://127.0.0.1:3000",
                   ""],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
