from fastapi import APIRouter

from api.v1.endpoints import chat, resume

api_router = APIRouter()
api_router.include_router(chat.router, tags=["chat"])
api_router.include_router(resume.router, tags=["resume"])
