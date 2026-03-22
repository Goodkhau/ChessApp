import { Chess, Move } from "chess.js";
import _ from "lodash";
import { create } from "zustand";
import { ModelResponseParser } from "./ModelResponseParser";
import { getModelResponse } from "./apis/ModelResponse";


interface ChessState {
	modelName: string;
	chessEngine: Chess;
    predictions: Prediction[];
	setPredictionList: (list: Prediction[]) => void;
}

interface Prediction {
    id?: number;
    move: string;
    weight: number;
    color?: string;
}


const _movesToSanArray = (moves: Move[]) => {return _.map(moves, (move) => move.san);};

const useChessStore = create<ChessState>()((set) => ({
	modelName: "Random_Model",
	chessEngine: new Chess,
	predictions: [],
	setPredictionList: (list) => set({ predictions: list }),
}));

const useGetPredictions = () => useChessStore((state) => state.predictions);

const useNextPredictions = () => useChessStore((state) => {
	const setPredictions = state.setPredictionList;
	const sanHistory = _movesToSanArray(state.chessEngine.history({ verbose: true }));
	const sanPossible = _movesToSanArray(state.chessEngine.moves({ verbose: true }));
	const modelName = state.modelName;

	(async () => {
		const parser = new ModelResponseParser(await getModelResponse({ modelName: modelName, sans: sanHistory }));
		setPredictions(parser.getParsedResponse(sanPossible));
	})();
});

const useNewWeightedMove = () => useChessStore((state) => {
	const predictions = state.predictions;
	const max = _.reduce(predictions, (a, b) => Math.max(a, b.weight), -Infinity);
	const randomZeroToMax = Math.random() * max;

	_.filter(predictions, ({ weight }) => weight >= randomZeroToMax);
	 
	return predictions[Math.floor(Math.random() * predictions.length)];
});

export {
	useGetPredictions,
	useNewWeightedMove,
	useNextPredictions
};

