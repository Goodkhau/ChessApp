import { Chess } from "chess.js";
import { create } from "zustand";
import { useShallow } from "zustand/shallow";

interface Prediction {
    id?: number;
    move: string;
    weight: number;
    color?: string;
}

interface ChessDetails {
	modelName?: string;
	boardOrientation: "white" | "black";
	isWhite: boolean;
	chessEngine: Chess;
	predictions: Prediction[];
}

interface State {
	length: number;
	instances: {
		[id: string]: ChessDetails;
	}
}

interface Actions {
	actions: {
		hasInstance: (id: string) => boolean;
		createInstance: (id: string, isWhite: boolean) => void;
		deleteInstance: (id: string) => void;
		setInstancePredictionList: (id: string, list: Prediction[]) => void;
	}
}


const useChessStore = create<State & Actions>()((set, get) => ({
	length: 0,
	instances: {
		board_00: {
			boardOrientation: 'black',
			isWhite: true,
			chessEngine: new Chess(),
			predictions: [],
		},
	},

	actions: {
		hasInstance: (id) => {
			return get().instances[id] !== undefined;
		},

		createInstance: (id, isWhite) => set((state) => {
			const chessEngine = new Chess();
			const predictions: Prediction[] = [];
			return {
				length: state.length++,
				instances: {
					...state.instances,
					[id]: {
						boardOrientation: isWhite ? "white" : "black",
						isWhite,
						chessEngine,
						predictions,
					},
				},
			};
		}),

		deleteInstance: (id) => set((state) => {
			const { [id]: removed, ...rest } = state.instances;
			console.log("ChessStore.ts: ", removed);
			return {
				length: state.length--,
				instances: rest,
			};
		}),
		
		setInstancePredictionList: (id, list) => set((state) => ({
			instances: {
				...state.instances,
				[id]: {
					...state.instances[id],
					predictions: list,
				},
			},
		})),
	},
}));

const useChessStoreActions = () => useChessStore((state) => state.actions);
const useInstanceKeys = () => useChessStore(useShallow((state) => Object.keys(state.instances)));

const useInstanceChessEngine = (id: string) => useChessStore((state) => state.instances[id].chessEngine);
const useInstancePredictionList = (id: string) => useChessStore((state) => state.instances[id].predictions);
const useInstancePlayerColor = (id: string) => useChessStore((state) => state.instances[id].isWhite);
const useInstanceBoardOrientation = (id: string) => useChessStore((state) => state.instances[id].boardOrientation);

export { useChessStoreActions, useInstanceBoardOrientation, useInstanceChessEngine, useInstanceKeys, useInstancePlayerColor, useInstancePredictionList };

