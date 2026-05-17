import { NavLink, useLocation } from "react-router-dom";

import _ from "lodash";
import { Pages } from "../pages/index.tsx";

const PageKeys = Object.keys(Pages) as Array<keyof typeof Pages>;

export default function Navigation() {
	const location = useLocation();
	return (
	// <div className="sticky z-100 top-2 mx-auto justify-center">
	// 	<nav  aria-label="Main Navigation" className="flex border-2 border-gray-800 rounded-full backdrop-blur-sm bg-black/60">
	// 		{_.map(PageKeys, (key) => (
	// 			<NavLink
	// 				to={Pages[key].route}
	// 				className={`w-40 px-4 py-2 rounded-full font-medium transition-all text-center ${
	// 					location.pathname === Pages[key].route
	// 						? 'bg-gray-500 text-white shadow-md'
	// 						: 'bg-black/5 text-gray-500'
	// 				}`}
	// 			>{key}</NavLink>
	// 		))}
	// 	</nav>
	// </div>

		<nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-sm transition-all duration-1000`}>
			<div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
				<div className="text-2xl font-bold tracking-tighter">
					<span className="bg-linear-to-br from-amber-400 to-orange-500 bg-clip-text text-transparent">SENTINEL</span>
					<span className="text-white/60 ml-2 text-sm font-normal">CHESS AI</span>
				</div>
				<nav aria-label="Main Navigation" className="flex gap-2 justify-center mx-auto">
	 				{_.map(PageKeys, (key) => (
						<NavLink
							to={Pages[key].route}
							className={`w-40 px-4 py-2 text-sm transition-all text-center ${
								location.pathname === Pages[key].route
									? 'bg-white/10 border border-white/20 rounded text-white/40 hover:text-white/60 hover:bg-white/20'
									: 'bg-black/10 rounded text-white/60 hover:text-white/80'
							}`}
						>{key}</NavLink>
					))}
				</nav>
			</div>
		</nav>
	);
}