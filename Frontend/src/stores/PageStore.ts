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

const usePageStore = create<State & Actions>()((set) => ({
	isVisible: false,
	currentPage: "Home",
	currentIndex: 0,
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

