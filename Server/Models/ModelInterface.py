from abc import ABC, abstractmethod
import numpy as np

class ModelInterface(ABC):
    @abstractmethod
    def prediction(san: list[str], fen: str) -> np.array:
        pass

    @abstractmethod
    def description() -> list[str]:
        pass
