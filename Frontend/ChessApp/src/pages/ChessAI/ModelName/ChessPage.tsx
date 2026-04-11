import _ from "lodash";

import { useInstanceKeys } from "./ChessStore.ts";
import ChessBoardComponent from "./components/ChessBoardComponent.tsx";
import ExpandableListComponent from "./components/ExpandableListComponent.tsx";

export default function ChessPage() {

	return (
		<main>
			{_.map(useInstanceKeys(), instanceKey => (
				<section id={instanceKey}>
					<ChessBoardComponent instanceKey={instanceKey} />
					<ExpandableListComponent instanceKey={instanceKey} />
				</section>
			))}
		</main>
	);
}