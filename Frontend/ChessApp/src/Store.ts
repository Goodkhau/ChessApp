import { Chess } from "chess.js";
import { create } from "zustand";
import { useShallow } from "zustand/shallow";

import { AboutPage, HomePage } from "./App";
import ChessPage from "./tabs/ChessAI/ModelName/ChessPage";

const Tabs = {
	Home: HomePage,
	Dashboard: ChessPage,
	About: AboutPage,
} as const;

interface Prediction {
    id?: number;
    move: string;
    weight: number;
    color?: string;
}

interface ChessDetails {
	modelName: string;
	boardOrientation: "white" | "black";
	showDeleteForm: boolean;
	isWhite: boolean;
	chessEngine: Chess;
	predictions: Prediction[];
}

interface State {
	length: number;
	showCreateForm: boolean;
	currentTab: keyof typeof Tabs;
	instances: {
		[id: string]: ChessDetails;
	}
}

interface Actions {
	actions: {
		setTab: (name: keyof typeof Tabs) => void;
		hasInstance: (id: string) => boolean;
		createInstance: ({ id, details } : {id: string, details: ChessDetails}) => void;
		deleteInstance: (id: string) => void;
		setInstancePredictionList: (id: string, list: Prediction[]) => void;
		setShowCreateForm: (show: boolean) => void;
		setShowDeleteForm: (id: string, show: boolean) => void;
	}
}


const useChessStore = create<State & Actions>()((set, get) => ({
	length: 0,
	showCreateForm: true,
	instances: {},
	currentTab: "Home",

	actions: {
		setTab: (name) => set(() => ({ currentTab: name })),

		hasInstance: (id) => {
			return get().instances[id] !== undefined;
		},

		createInstance: ({ id, details }) => set((state) => {
			return {
				length: state.length + 1,
				instances: {
					...state.instances,
					[id]: details,
				},
			};
		}),

		deleteInstance: (id) => set((state) => {
			const { [id]: removed, ...rest } = state.instances;
			console.log("ChessStore.ts: ", removed);
			return {
				length: state.length - 1,
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

		setShowCreateForm: (show) => set(() => ({
			showCreateForm: show,
		})),

		setShowDeleteForm: (id, show) => set((state) => ({
			instances: {
				...state.instances,
				[id]: {
					...state.instances[id],
					showDeleteForm: show,
				},
			},
		})),
	},
}));

const useChessStoreActions = () => useChessStore((state) => state.actions);

const useInstanceKeys = () => useChessStore(useShallow((state) => Object.keys(state.instances)));
const useCurrentTab = () => useChessStore((state) => state.currentTab);
const useShowCreateForm = () => useChessStore((state) => state.showCreateForm);

const useInstanceChessEngine = (id: string) => useChessStore((state) => state.instances[id].chessEngine);
const useInstancePredictionList = (id: string) => useChessStore((state) => state.instances[id].predictions);
const useInstancePlayerColor = (id: string) => useChessStore((state) => state.instances[id].isWhite);
const useInstanceBoardOrientation = (id: string) => useChessStore((state) => state.instances[id].boardOrientation);
const useShowDeleteForm = (id: string) => useChessStore((state) => state.instances[id].showDeleteForm);
const useInstanceModelName = (id: string) => useChessStore((state) => state.instances[id].modelName);

export {
	Tabs,
	useChessStoreActions,
	useCurrentTab,
	useInstanceBoardOrientation,
	useInstanceChessEngine,
	useInstanceKeys, useInstanceModelName, useInstancePlayerColor,
	useInstancePredictionList,
	useShowCreateForm,
	useShowDeleteForm,
	type ChessDetails,
	type Prediction
};

