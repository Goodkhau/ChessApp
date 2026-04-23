import _ from "lodash";

import { useState } from "react";
import { useInstancePredictionList } from "../ChessStore";
import { CloseIcon, OpenIcon } from "./icons/OpenCloseIcon";

export default function ExpandableListComponent({ instanceKey }: { instanceKey: string }) {
	const [isOpen, setIsOpen] = useState(false);
	const predictionList = useInstancePredictionList(instanceKey);

	return (
		<article className="h-10 w-full rounded-xl">
			<hgroup className="flex flex-col items-center justify-center h-6 my-2 bg-blue-800/10 border-3 rounded-xl border-yellow-200/40"
				onClick={() => setIsOpen(!isOpen)}>
				{isOpen ? OpenIcon : CloseIcon}
			</hgroup>
			<article className={`relative z-10 mt-4 overflow-y-scroll rounded-xl border-gray-700 bg-gray-800/85 border-3
				transition-all duration-500 ease-out
				${isOpen ? 'h-100' : 'h-0 opacity-0'}
			`}>
				{_.map(predictionList, prediction => (
					<article key={prediction.move} className="flex flex-row items-center m-2 px-2 bg-teal-800/20 hover:bg-teal-600/20 rounded-xl">
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