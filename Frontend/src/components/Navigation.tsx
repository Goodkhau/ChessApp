import { NavLink, useLocation } from "react-router-dom";

import _ from "lodash";
import { Pages } from "../pages/index.tsx";

const PageKeys = Object.keys(Pages) as Array<keyof typeof Pages>;

export default function Navigation() {
	const location = useLocation();
	
	return (
		<nav className={`fixed left-0 right-0 z-50 backdrop-blur-sm`}>
			<div className="flex items-center justify-between max-w-7xl w-9/10 mx-auto p-6">
				<div className="flex gap-2 items-center">
					<span className="bg-linear-to-br from-amber-400 to-orange-500 bg-clip-text text-transparent text-2xl font-bold">SENTINEL</span>
					<span className="text-white/60 text-sm font-normal">CHESS AI</span>
				</div>
				<nav aria-label="Main Navigation" className="flex gap-2 justify-center mx-auto">
	 				{_.map(PageKeys, (key) => (
						<NavLink to={Pages[key].route}
							className={`w-40 px-4 py-2 text-sm text-center ${
								location.pathname === Pages[key].route
									? "bg-white/10 border border-white/20 rounded text-white/40 hover:text-white/60 hover:bg-white/20"
									: "bg-black/10 rounded text-white/60 hover:text-white/80"
							}`}
						>{key}</NavLink>
					))}
				</nav>
			</div>
		</nav>
	);
}