from fastapi import FastAPI, HTTPException, status, Query, Request
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
from typing import Annotated

from Models.index import ModelEnum

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/model/{ModelName}")
async def model_response(request: Request, ModelName: str, san: list[str] = [], fen: str = ''):
    print(str(request.url))

    if not ModelName in [model.name for model in ModelEnum]:
        raise HTTPException (
            status_code = status.HTTP_404_NOT_FOUND,
            detail = f"Model: \"{ModelName}\" does not exist."
        )

    prediction: list[float] = ModelEnum[ModelName].value.prediction(san, fen).tolist()[0]
    description: list[str] = ModelEnum[ModelName].value.description()

    return {
        'type': ModelEnum[ModelName].value.type(),
        'prediction': {
            'psuedoSans': [ { 'psuedoSan': key, 'rating': value} for key, value in zip(description, prediction) ]
        }
    }