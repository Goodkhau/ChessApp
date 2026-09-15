from fastapi import FastAPI, HTTPException, status, Query, Request
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum
from pathlib import Path
from typing import Annotated

from Models.index import ModelEnum

app = FastAPI()
handler = Mangum(app)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8000",
        "http://127.0.0.1:8000",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["Content-Type"],
)

@app.get("/api/model/{ModelName}")
async def model_response(request: Request, ModelName: str, san: list[str] = [], fen: str = ''):
    if not ModelName in [model.name for model in ModelEnum]:
        raise HTTPException (
            status_code = status.HTTP_400_BAD_REQUEST
        )

    try:
        prediction: list[float] = ModelEnum[ModelName].value.prediction(san, fen).tolist()[0]
        description: list[str] = ModelEnum[ModelName].value.description()
    except:
        raise HTTPException (
            status_code = status.HTTP_400_BAD_REQUEST
        )

    return {
        'type': ModelEnum[ModelName].value.type(),
        'prediction': {
            'psuedoSans': [ { 'psuedoSan': key, 'rating': value } for key, value in zip(description, prediction) ]
        }
    }