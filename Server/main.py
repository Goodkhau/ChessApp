from fastapi import FastAPI, HTTPException, status, Query, Request
from pathlib import Path
from typing import Annotated

from Models.index import ModelEnum

app = FastAPI()

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
        'prediction': [ { 'psuedoSan': key, 'rating': value} for key, value in zip(description, prediction) ]
    }