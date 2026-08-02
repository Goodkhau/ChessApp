import { create } from "zustand";

interface State {
    scrollProgress: number
}

interface Actions {
    setScrollProgress: (progress: number) => void;
}

const useScrollStore = create<State & Actions>()((set) => ({
	scrollProgress: 0,

	setScrollProgress: (progress) => set((state) => {
		return (progress === state.scrollProgress)
			? state
			: { scrollProgress: progress };

	}),
}));

export {
    useScrollStore
};

