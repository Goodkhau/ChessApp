export default function CreateDeletePopup({ showForm, onClose, children }: {
	showForm: boolean;
	onClose: () => void;
	children: React.ReactNode;
}) {
	if (!showForm) return null;
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			<div 
				className="absolute inset-0 bg-black/50 backdrop-blur-sm"
				onClick={onClose}
			/>

			<div className="relative z-10 bg-slate-900 rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
				{children}
			</div>
		</div>
	);
}