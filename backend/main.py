from typing import Union
from fastapi import FastAPI

app = FastAPI()

print("Hello from backend!")
    
@app.get("/")
def read_root():
    return {"Hello": "World"}
