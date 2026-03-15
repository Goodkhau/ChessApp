from fastapi import FastAPI, HTTPException, status, Query
from pathlib import Path
from typing import Annotated

from Models.index import ModelEnum

app = FastAPI()

@app.get("/model/{ModelName}")
async def model_response(ModelName: str, san: list[str] = [], fen: str = ''):
    if not ModelName in [model.name for model in ModelEnum]:
        raise HTTPException (
            status_code = status.HTTP_404_NOT_FOUND,
            detail = f"Model: \"{ModelName}\" does not exist."
        )

    prediction: list[float] = ModelEnum[ModelName].value.prediction(san, fen).tolist()[0]
    description: list[str] = ModelEnum[ModelName].value.description()

    return {
        'prediction': [ {key: value} for key, value in zip(description, prediction) ]
    }