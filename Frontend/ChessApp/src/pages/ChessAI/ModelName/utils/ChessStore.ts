import { Chess } from "chess.js";
import { create } from "zustand";


interface Prediction {
    id?: number;
    move: string;
    weight: number;
    color?: string;
}

interface ChessDetails {
	modelName: string;
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
	hasInstance: (id: string) => boolean;
	createInstance: (id: string, details: ChessDetails) => void;
	deleteInstance: (id: string) => void;
	getChessInstance: (id: string) => ChessDetails | undefined;
}


const useChessStore = create<State & {actions: Actions}>()((set, get) => ({
	length: 0,
	instances: {},

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

		getChessInstance: (id) => { return get().instances[id]; },	
	},
}));

const useChessStoreActions = () => useChessStore((state) => state.actions);


export {
	useChessStoreActions
};

