from fastapi import APIRouter

from models.chat import ChatResponse, ChatRequest
from services.chat_service import fetch_chat_response

router = APIRouter()


@router.post("/chat", response_model=ChatResponse)
async def chat_completion(request: ChatRequest):
    return await fetch_chat_response(request)
