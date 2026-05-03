import _ from "lodash";
import { useState } from "react";

import { useInstanceKeys } from "./ChessStore.ts";
import ChessBoardComponent from "./components/ChessBoardComponent.tsx";
import CreateDeletePopup from "./components/CreateDeletePopup.tsx";
import ExpandableListComponent from "./components/ExpandableListComponent.tsx";
import InstanceHeader from "./components/InstanceHeaderComponent.tsx";
import { CreateIcon } from "./components/icons/CreateIcon.tsx";

export default function ChessPage() {
	const [showCreateBoard, setShowCreateBoard] = useState(false);

	return (
		<section className="flex flex-wrap gap-5 justify-center">
			{_.map(useInstanceKeys(), instanceKey => (
				<div key={instanceKey} className="px-5 border-2 bg-gray-800 rounded-2xl border-yellow-200 
					flex items-center flex-col
					w-9/10 sm:w-124 md:w-148
					aspect-square"
				>
					<InstanceHeader instanceKey={instanceKey} />
					<ChessBoardComponent instanceKey={instanceKey} />
					<ExpandableListComponent instanceKey={instanceKey} />
				</div>
			))}

			<div className="px-5 border-2 bg-gray-800 rounded-2xl border-yellow-200 
				flex items-center justify-center flex-col
				w-9/10 sm:w-124 md:w-148 
				aspect-square
				cursor-pointer"
			onClick={() => setShowCreateBoard(!showCreateBoard)}>
				<CreateIcon size={120} color="gray" />
			</div>

			<CreateDeletePopup showCreateBoard={showCreateBoard} onClose={() => setShowCreateBoard(false)}>
				<p className="text-9xl text-black">{showCreateBoard ? "True" : "False"}</p>
			</CreateDeletePopup>
		</section>
	);
}