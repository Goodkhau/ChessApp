import _ from "lodash";
import { NavLink } from "react-router-dom";

import { Pages } from "./pages/index.tsx";

const PageKeys = Object.keys(Pages) as Array<keyof typeof Pages>;

export default function Navigation() {
	return (
		<div className="flex z-100 sticky top-2 mx-auto justify-center">
			<nav className="flex border-2 border-gray-800 rounded-full backdrop-blur-sm bg-black/60">
				{_.map(PageKeys, (key) => (
					<NavLink
						to={Pages[key].route}
						className={`w-40 px-4 py-2 rounded-full font-medium transition-all text-center ${
							'Home' === `/${key}`
								? 'bg-gray-500 text-white shadow-md'
								: 'bg-black/5 text-gray-500'
						}`}
					>{key}</NavLink>
				))}
			</nav>
		</div>
	);
}