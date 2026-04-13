import _ from "lodash";

import { useInstanceKeys } from "./ChessStore.ts";
import ChessBoardComponent from "./components/ChessBoardComponent.tsx";
import ExpandableListComponent from "./components/ExpandableListComponent.tsx";

export default function ChessPage() {

	return (
		<>
			{_.map(useInstanceKeys(), instanceKey => (
				<section id={instanceKey} className="flex items-center flex-col gap-5 w-9/10 sm:w-124 md:w-148">
					<ChessBoardComponent instanceKey={instanceKey} />
					<ExpandableListComponent instanceKey={instanceKey} />
				</section>
			))}
		</>
	);
}