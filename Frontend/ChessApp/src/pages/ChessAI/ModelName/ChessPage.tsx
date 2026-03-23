import _ from "lodash";

import { useInstanceKeys } from "./ChessStore.ts";
import ChessBoardComponent from "./components/ChessBoardComponent.tsx";
import ExpandableListComponent from "./components/ExpandableListComponent.tsx";

export default function ChessPage() {

	return (
		<div id="board_container">
			{_.map(useInstanceKeys(), instanceID => (
				<div id={instanceID}>
					<ChessBoardComponent instanceID={instanceID} />
					<ExpandableListComponent instanceID={instanceID} />
				</div>
			))}
		</div>
	);
}