import { useChessStoreActions } from "../ChessStore.ts";

export default function DeleteForm ({ instanceKey }: { instanceKey: string }) {
	const { setShowDeleteForm, deleteInstance } = useChessStoreActions();

	const handleDelete = () => {
		deleteInstance(instanceKey);
	};

	return (
		<div className="bg-gray-800 rounded-2xl p-6 w-full">
			<h2 className="text-gray-300 font-semibold mb-2">Delete {instanceKey}?</h2>
			<p className="text-gray-500 mb-6">This action cannot be undone.</p>
			<div className="flex gap-3 justify-end">
				<button
					onClick={() => setShowDeleteForm(instanceKey, false)}
					className="px-4 py-2 text-gray-400 bg-gray-600 hover:bg-gray-100 rounded-2xl"
				>Cancel</button>

				<button
					onClick={handleDelete}
					className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-2xl"
				>Delete</button>
			</div>
		</div>
	);
}