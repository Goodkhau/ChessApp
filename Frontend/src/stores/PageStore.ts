import { create } from "zustand";

import { Pages } from "../pages/index.tsx";

interface State {
	isVisible: boolean;
    currentPage: keyof typeof Pages;
	currentIndex: number;
	previousIndex: number;
}

interface Actions {
	actions: {
		setIsVisible: (isVisible: boolean) => void,
		updatePage: (page: keyof typeof Pages) => void,
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
				currentIndex: Pages[page].index,
				previousIndex: state.currentIndex,
			};
		}),
	},
}));

const usePageStoreActions = () => usePageStore(state => state.actions);

export {
	usePageStore, usePageStoreActions
};

