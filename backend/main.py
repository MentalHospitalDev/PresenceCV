from fastapi import FastAPI
from api.routes import router
from services.resume_generator import resume_generator

app = FastAPI()
app.include_router(router)

print("Hello from backend!")



    

