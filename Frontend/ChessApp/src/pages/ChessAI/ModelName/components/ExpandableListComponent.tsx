import _ from "lodash";

import { useInstancePredictionList } from "../ChessStore";

export default function ExpandableListComponent({ instanceKey }: { instanceKey: string }) {
	const predictionList = useInstancePredictionList(instanceKey);
	return (
		<article className="max-h-40 w-full overflow-y-auto bg-blue-800/10 rounded-xl">
			{_.map(predictionList, prediction => (
				<article className="flex flex-row items-center m-2 px-2 bg-teal-800/20 hover:bg-teal-600/20 rounded-xl">
					<h2 className="w-2/15 p-0.5 text-1xl text-gray-400">{prediction.move}</h2>
					<div className="w-full">
						<div className="h-2 bg-green-500 rounded-xl" style={{ width: `${(100 * prediction.weight).toFixed(2)}%` }}></div>
					</div>
					<h2 className="w-1/15 ml-2 text-green-700">{prediction.weight.toFixed(2)}</h2>
				</article>
			))}
		</article>
	);
}