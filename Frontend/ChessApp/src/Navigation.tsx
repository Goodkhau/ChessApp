// Navigation.tsx
import { useStore } from './Store.ts';

function Navigation() {
	const { currentPage, setPage } = useStore();
  
	const navItems = [
		{ id: 'home', label: 'Home' },
		{ id: 'dashboard', label: 'Dashboard' },
		{ id: 'settings', label: 'Settings' },
		{ id: 'profile', label: 'Profile' },
	] as const;
  
	return (
		<nav className="">
			<div className="max-w-7xl mx-auto px-4 py-4">
				<div className="flex space-x-2 border-2 border-gray-800 rounded-full">
					{navItems.map((item) => (
						<button
							key={item.id}
							onClick={() => setPage(item.id)}
							className={`px-4 py-2 rounded-full font-medium transition-all ${
								currentPage === item.id
									? 'bg-gray-500 text-white shadow-md'
									: 'text-gray-700'
							}`}
						>
							{item.label}
						</button>
					))}
				</div>
			</div>
		</nav>
	);
}

export default Navigation;