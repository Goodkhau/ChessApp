import _ from "lodash";
import { NavLink, useLocation } from "react-router-dom";

import { Pages } from "../pages/index.tsx";
import { usePageStoreActions } from "../stores/PageStore.ts";
import { useScrollStore } from "../stores/ScollStore.ts";

const PageKeys = Object.keys(Pages) as Array<keyof typeof Pages>;

export default function Navigation() {
	const location = useLocation();
	const { updatePage } = usePageStoreActions();
	const { setScrollProgress } = useScrollStore();
	return (
		<nav className="fixed left-0 right-0 z-50 backdrop-blur-sm">
			<div className="flex flex-wrap items-center md:justify-between justify-center max-w-7xl w-9/10 p-6 mx-auto">
				<div className="flex gap-2 items-center">
					<span className="bg-linear-to-br from-amber-400 to-orange-500 bg-clip-text 
						text-transparent text-2xl font-bold">SAN-TIENT</span>
					<span className="text-white/60 text-sm font-normal">CHESS AI</span>
				</div>
				<nav aria-label="Main Navigation" className="flex flex-wrap gap-2 justify-center">
	 				{_.map(PageKeys, (key) => (
						<NavLink
							key={key}
							to={Pages[key].route}
							onClick={() => {
								updatePage(key);
								setScrollProgress(0);
							}}
							className={`w-40 px-4 py-2 text-sm text-center ${
								location.pathname === Pages[key].route
									? "bg-white/5 rounded text-white/40 hover:text-white/60 hover:bg-white/10"
									: "bg-black/5 rounded text-white/60 hover:text-white/80 hover:bg-white/3"
							}`}
						>{key}</NavLink>
					))}
				</nav>
			</div>
		</nav>
	);
}