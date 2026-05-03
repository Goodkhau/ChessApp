export default function CreateDeletePopup({ showCreateBoard, onClose, children }: {
	showCreateBoard: boolean;
	onClose: () => void;
	children: React.ReactNode;
}) {
	if (!showCreateBoard) return null;
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			<div 
				className="absolute inset-0 bg-black/50 backdrop-blur-sm"
				onClick={onClose}
			/>

			<div className="relative z-10 bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
				{children}
			</div>
		</div>
	);
}