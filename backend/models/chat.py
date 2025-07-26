from pydantic import BaseModel


class ChatRequest(BaseModel):
    message: str
    model: str = "google/gemini-2.5-flash"


class ChatResponse(BaseModel):
    response: str
    model: str
    usage: dict | None = None
