import { create } from 'zustand';

type Page = 'home' | 'dashboard' | 'settings' | 'profile';

interface AppState {
  // Your existing store data
  user: string;
  count: number;
  
  // Page navigation
  currentPage: Page;
  setPage: (page: Page) => void;
  
  // Your existing actions
  increment: () => void;
}

export const useStore = create<AppState>((set) => ({
	user: '',
	count: 0,
	currentPage: 'home',
  
	setPage: (page) => set({ currentPage: page }),
	increment: () => set((state) => ({ count: state.count + 1 })),
}));