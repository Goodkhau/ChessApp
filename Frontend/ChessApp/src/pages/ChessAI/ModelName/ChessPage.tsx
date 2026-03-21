import { useState } from "react";

import ChessElement from "./components/ChessElement.tsx";
import ExpandableList, { type PredictionListItem } from "./components/ExpandableList.tsx";

export default function ChessPage() {
	const [predictionList, setPredictionList] = useState<PredictionListItem[]>([]);

	return (
		<div>
			<ChessElement setPredictionList={setPredictionList} />
			<ExpandableList predictionList={predictionList}/>
		</div>
	);
}