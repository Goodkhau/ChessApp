import { create } from "zustand";

import { Pages, pageTitles } from "../pages/index.tsx";

interface State {
	isVisible: boolean;
    currentPage: string;
	currentIndex: number;
	previousIndex: number;
}

interface Actions {
	actions: {
		setIsVisible: (isVisible: boolean) => void,
		updatePage: (page: pageTitles) => void,
	}
}

function setInitalPage() {
	const path = window.location.pathname;
	switch (path) {
		case "/":
			return "Home";
		default:
			return path.substring(1, path.length);
	}
}

function setInitialIndex() {
	const path = window.location.pathname;
	switch (path.substring(1, path.length)) {
		case "Home":
			return 0;
		case "ChessAI":
			return 1;
		case "About":
			return 2;
		default:
			return 0;
	}
}

const usePageStore = create<State & Actions>()((set) => ({
	isVisible: false,
	currentPage: setInitalPage(),
	currentIndex: setInitialIndex(),
	previousIndex: -1,

	actions: {
		setIsVisible: (isVisible) => set(state => {
			return {
				...state,
				isVisible,
			};
		}),

		updatePage: (page) => set(state => {
			if (page === state.currentPage)
				return { ...state };
			
			return {
				isVisible: false,
				currentPage: page,
				currentIndex: Pages[page as pageTitles].index,
				previousIndex: state.currentIndex,
			};
		}),
	},
}));

const usePageStoreActions = () => usePageStore(state => state.actions);

const useCurrentIndex = () => usePageStore(state => state.currentIndex);
const usePreviousIndex = () => usePageStore(state => state.previousIndex);

export { useCurrentIndex, usePageStore, usePageStoreActions, usePreviousIndex };

