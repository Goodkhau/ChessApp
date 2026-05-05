import { useChessStoreActions } from "../ChessStore.ts";

export default function DeleteForm ({ instanceKey }: { instanceKey: string }) {
	const { setShowDeleteForm, deleteInstance } = useChessStoreActions();

	const handleDelete = () => {
		deleteInstance(instanceKey);
		console.log("Deleted ", instanceKey);
	};

	return (
		<div className="bg-gray-800 rounded-lg p-6 max-w-sm w-full">
			<h2 className="text-lg font-semibold mb-2">Delete item?</h2>
			<p className="text-gray-600 mb-6">This action cannot be undone.</p>
			<div className="flex gap-3 justify-end">
				<button
					onClick={() => setShowDeleteForm(false)}
					className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
				>
                        Cancel
				</button>
				<button
					onClick={handleDelete}
					className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-md"
				>
                        Delete
				</button>
			</div>
		</div>
	);
}