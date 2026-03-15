import tensorflow as tf
import numpy as np
from pathlib import Path

from Models.ModelInterface import ModelInterface
from Models.Dependencies.DataFormatter import FormatBoard as formatter

class Little_Blue(ModelInterface):
    def __init__(self):
        self.model = tf.keras.models.load_model(f'{Path.cwd()}/Models/Little_Blue/Little_Blue.keras')

    def prediction(self, san: list[str], fen: str) -> np.array:
        format = formatter()
        for single_san in san:
            format.update_board(single_san=single_san)
        
        return self.model.predict(np.expand_dims(format.board, axis=0))
    
    def description(self):
        return [

        ]