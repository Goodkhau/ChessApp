import { Chess } from "chess.js";
import _ from "lodash";
import { useChessStoreActions, type ChessDetails, type Prediction } from "../ChessStore.ts";
import { ModelResponseHandler } from "../utils/apis/ModelResponse.ts";

const CHESS_MODELS = [
	{ id: 'Little_Blue', name: 'Little_Blue' },
];

export default function CreateForm() {
	const { setShowCreateForm, createInstance } = useChessStoreActions();
	
	async function handleCreation(event: React.SubmitEvent<HTMLFormElement>) {
		event.preventDefault();
		console.log("Creating game");

		const formData = new FormData(event.currentTarget);
		const id = String(formData.get("boardName"));
		const modelName = String(formData.get("chessModel"));
		const boardOrientation = String(formData.get("playerColor")) === "white" ? "white" : "black";
		const isWhite = boardOrientation === "white";
		const chessEngine = new Chess();
		let predictions: Prediction[] = [];

		if (!isWhite) {
			const handler = new ModelResponseHandler();
			const {
				selectedMove,
				newPredictionList,
			} = await handler.getParsedResponse({ chessGame: chessEngine, modelName });
			chessEngine.move(selectedMove.move);
			predictions = newPredictionList;
		}

		const details: ChessDetails = {
			modelName,
			boardOrientation,
			showDeleteForm: false,
			isWhite,
			chessEngine,
			predictions,
		};

		createInstance({ id, details });
		setShowCreateForm(false);
		event.currentTarget.reset();
	}
    
	return (
		<form onSubmit={handleCreation} className="space-y-4 p-6 bg-slate-800 rounded-2xl">
			<h3 className="text-gray-400 font-bold mb-4">Create New Chess Game</h3>

			<label htmlFor="board-name" className="text-gray-400 font-medium mb-1">Board Name</label>
			<input
				type="text" id="board-name" required
				name="boardName" placeholder="My Chess Game"
				className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
			/>
			<label className="text-gray-400 font-medium mb-2">Play As</label>

			<div className="flex gap-4">
				<label htmlFor="color-white" className="flex items-center cursor-pointer">
					<input
						type="radio" id="color-white" defaultChecked
						name="playerColor" value="white"
						className="mr-2 accent-gray-500"
					/>
					<span className="flex items-center gap-2">
						<span className="w-6 h-6 bg-gray-200 border-2 border-gray-300 rounded"></span>
						White
					</span>
				</label>
				<label htmlFor="color-black" className="flex items-center cursor-pointer">
					<input
						type="radio" id="color-black"
						name="playerColor" value="black"
						className="mr-2 accent-gray-500"
					/>
					<span className="flex items-center gap-2">
						<span className="w-6 h-6 bg-black rounded"></span>
						Black
					</span>
				</label>
			</div>

			<label htmlFor="chess-model" className="text-gray-400 font-medium mb-1">Opponent</label>
			<select
				id="chess-model" name="chessModel" required
				className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
			>
				<option value="">Select a chess ML model...</option>
				{_.map(CHESS_MODELS, model => (
					<option 
						key={model.id} value={model.id} 
						className="hover:bg-gray-500"
					>{model.name}</option>
				))}
			</select>

			<button
				type="submit"
				className="w-full bg-gray-500 text-white py-2 rounded-2xl hover:bg-gray-700 transition-colors font-medium"
			>Create Game</button>
		</form>
	);
}