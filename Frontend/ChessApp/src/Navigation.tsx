import _ from "lodash";

import { Tabs, useChessStoreActions, useCurrentTab } from "./Store.ts";

export default function Navigation() {
	const { setTab } = useChessStoreActions();
	const currentTab = useCurrentTab();
	const tabNames = Object.keys(Tabs);
  
	return (
		<nav className="flex z-100 sticky top-2 mx-auto justify-center">
			<div className="flex border-2 border-gray-800 rounded-full backdrop-blur-sm bg-black/60">
				{_.map(tabNames, (tabName) => (
					<button
						key={tabName}
						onClick={() => setTab(tabName as keyof typeof Tabs)}
						className={`w-40 px-4 py-2 rounded-full font-medium transition-all ${
							currentTab === tabName
								? 'bg-gray-500 text-white shadow-md'
								: 'bg-black/5 text-gray-500'
						}`}
					>{tabName}</button>
				))}
			</div>
		</nav>
	);
}