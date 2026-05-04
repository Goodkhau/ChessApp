import { useChessStoreActions } from "../ChessStore.ts";

const CHESS_MODELS = [
	{ id: 'stockfish-16', name: 'Stockfish 16', difficulty: 'Expert' },
	{ id: 'stockfish-15', name: 'Stockfish 15', difficulty: 'Advanced' },
	{ id: 'komodo-14', name: 'Komodo 14', difficulty: 'Advanced' },
	{ id: 'leela-chess', name: 'Leela Chess Zero', difficulty: 'Expert' },
	{ id: 'fairy-stockfish', name: 'Fairy Stockfish', difficulty: 'Intermediate' },
	{ id: 'beginner-bot', name: 'Beginner Bot', difficulty: 'Beginner' },
];

export default function CreateForm() {
	const { setShowCreateForm } = useChessStoreActions();
	async function handleCreation(event: React.SubmitEvent<HTMLFormElement>) {
		// Get whether black or white, get the first move if black and we should have everything for creating an instance.
		event.preventDefault();
		console.log("Creating game");

		setShowCreateForm(false);
	}
    
	return (
		<form onSubmit={handleCreation} className="space-y-4 max-w-md p-6 bg-slate-800 rounded-lg shadow">
			<h2 className="text-2xl text-gray-400 font-bold mb-4">Create New Chess Game</h2>
			<label htmlFor="board-name" className="block text-sm text-gray-400 font-medium mb-1">Board Name</label>
			<input
				type="text"
				id="board-name"
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
				<option value="">Select a chess engine...</option>
				{CHESS_MODELS.map(model => (
					<option key={model.id} value={model.id}>
						{model.name} ({model.difficulty})
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