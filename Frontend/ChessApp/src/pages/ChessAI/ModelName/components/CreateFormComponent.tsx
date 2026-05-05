import { Chess } from "chess.js";
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

		createInstance(id, details);
		setShowCreateForm(false);
		event.currentTarget.reset();
	}
    
	return (
		<form onSubmit={handleCreation} className="space-y-4 max-w-md p-6 bg-slate-800 rounded-lg shadow">
			<h2 className="text-2xl text-gray-400 font-bold mb-4">Create New Chess Game</h2>
			<label htmlFor="board-name" className="block text-sm text-gray-400 font-medium mb-1">Board Name</label>
			<input
				type="text"
				id="board-name"
				name="boardName"
				placeholder="My Chess Game"
				required
				className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
			<label className="text-sm text-gray-400 font-medium mb-2">Play as</label>
			<div className="flex gap-4">
				<label htmlFor="color-white" className="flex items-center cursor-pointer">
					<input
						type="radio"
						id="color-white"
						name="playerColor"
						value="white"
						defaultChecked
						className="mr-2"
					/>
					<span className="flex items-center gap-2">
						<span className="w-6 h-6 bg-gray-200 border-2 border-gray-300 rounded"></span>
								White
					</span>
				</label>
				<label htmlFor="color-black" className="flex items-center cursor-pointer">
					<input
						type="radio"
						id="color-black"
						name="playerColor"
						value="black"
						className="mr-2"
					/>
					<span className="flex items-center gap-2">
						<span className="w-6 h-6 bg-black rounded"></span>
						Black
					</span>
				</label>
			</div>
			<label htmlFor="chess-model" className="block text-sm font-medium mb-1">Opponent</label>
			<select
				id="chess-model"
				name="chessModel"
				required
				className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
			>
				<option value="">Select a chess ML model...</option>
				{CHESS_MODELS.map(model => (
					<option key={model.id} value={model.id}>
						{model.name}
					</option>
				))}
			</select>
			<button
				type="submit"
				className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
			>
        		Create Game
			</button>
		</form>
	);
}