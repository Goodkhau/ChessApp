// Navigation.tsx
import { useStore } from './Store.ts';

export default function Navigation() {
	const { currentPage, setPage } = useStore();
  
	const navItems = [
		{ id: 'home', label: 'Home' },
		{ id: 'dashboard', label: 'Dashboard' },
		{ id: 'about', label: 'About' },
	] as const;
  
	return (
		<nav className="flex z-100 sticky top-2 mx-auto justify-center">
			<div className="flex border-2 border-gray-800 rounded-full backdrop-blur-sm bg-black/60">
				{navItems.map((item) => (
					<button
						key={item.id}
						onClick={() => setPage(item.id)}
						className={`w-40 px-4 py-2 rounded-full font-medium transition-all ${
							currentPage === item.id
								? 'bg-gray-500 text-white shadow-md'
								: 'bg-black/5 text-gray-500'
						}`}
					>
						{item.label}
					</button>
				))}
			</div>
		</nav>
	);
}