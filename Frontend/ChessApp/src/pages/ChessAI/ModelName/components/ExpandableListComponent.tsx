import _ from "lodash";

import { useInstancePredictionList } from "../ChessStore";

export default function ExpandableListComponent({ instanceKey }: { instanceKey: string }) {
	const predictionList = useInstancePredictionList(instanceKey);
	return (
		<>
			{_.map(predictionList, prediction => (
				<p>{prediction.move}</p>
			))}
		</>
	);
}