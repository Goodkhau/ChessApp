import _ from "lodash";

import { useState } from "react";
import { useInstancePredictionList } from "../ChessStore";

export default function ExpandableListComponent({ instanceKey }: { instanceKey: string }) {
	const [isOpen, setIsOpen] = useState(false);
	const predictionList = useInstancePredictionList(instanceKey);

	return (
		<article className="h-10 w-full bg-blue-800/10 rounded-xl">
			<hgroup className="h-8 py-5" onClick={() => setIsOpen(!isOpen)}>Header</hgroup>
			<article className={`relative z-10 bg-gray-800/85 border-gray-700 rounded-xl
				transition-all duration-300 ease-linear overflow-y-scroll
				${isOpen ? `max-h-100 ${predictionList.length ? 'border-3' : ''}` : 'max-h-0 border-0'}
			`}>
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
		</article>
	);
}