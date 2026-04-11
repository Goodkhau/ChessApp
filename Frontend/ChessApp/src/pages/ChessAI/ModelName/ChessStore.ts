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
		createInstance: (id: string, details: ChessDetails) => void;
		deleteInstance: (id: string) => void;
		getInstanceChessEngine: (id: string) => Chess;
		getInstancePredictionList: (id: string) => Prediction[];
		setInstancePredictionList: (id: string, list: Prediction[]) => void;
	}
}


const useChessStore = create<State & Actions>()((set, get) => ({
	length: 0,
	instances: {
		board_00: {
			chessEngine: new Chess(),
			predictions: [],
		},
	},

	actions: {
		hasInstance: (id) => {
			return get().instances[id] !== undefined;
		},

		createInstance: (id, details) => set((state) => ({
			length: state.length++,
			instances: {
				...state.instances,
				[id]: details,
			},
		})),

		deleteInstance: (id) => set((state) => {
			const { [id]: removed, ...rest } = state.instances;
			console.log("ChessStore.ts: ", removed);
			return {
				length: state.length--,
				instances: rest,
			};
		}),

		getInstanceChessEngine: (id) => { return get().instances[id].chessEngine; },

		getInstancePredictionList: (id) => { return get().instances[id].predictions; },
		setInstancePredictionList: (id, list) => set((state) => ({
			length: state.length,
			instances: {
				...state.instances,
				[id]: {
					chessEngine: state.instances[id].chessEngine,
					predictions: list,
				},
			},
		})),
	},
}));

const useChessStoreActions = () => useChessStore((state) => state.actions);
const useInstanceKeys = () => useChessStore(useShallow((state) => Object.keys(state.instances)));


export {
	useChessStoreActions,
	useInstanceKeys
};

