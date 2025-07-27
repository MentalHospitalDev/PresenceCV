import httpx
from fastapi import HTTPException

from core.config import Config
from models.chat import ChatRequest, ChatResponse


# https://openrouter.ai/docs/api-reference/authentication
async def fetch_chat_response(request: ChatRequest) -> ChatResponse | HTTPException:
    if not Config.OPENROUTER_API_KEY:
        raise HTTPException(status_code=500, detail="OpenRouter API key not configured")

    headers = {
        "Authorization": f"Bearer {Config.OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
        # "HTTP-Referer": "<YOUR_SITE_URL>",  # Optional. Site URL for rankings on openrouter.ai.
        "X-Title": "PresenceCV",
    }

    payload = {
        "model": request.model,
        "messages": [
            {
                "role": "user",
                "content": request.message
            }
        ],
        "max_tokens": 500
    }

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{Config.OPENROUTER_BASE_URL}/chat/completions",
                json=payload,
                headers=headers,
                timeout=30.0
            )

            if response.status_code != 200:
                raise HTTPException(
                    status_code=response.status_code,
                    detail=f"OpenRouter API error: {response.text}"
                )

            data = response.json()
            return ChatResponse(
                response=data.get("choices", [{}])[0].get("message", {}).get("content", ""),
                model=request.model,
                usage=data.get("usage")
            )
    except httpx.TimeoutException:
        return HTTPException(status_code=408, detail="Request timed out")
    except httpx.RequestError as e:
        raise HTTPException(status_code=500, detail=f"Request error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")
