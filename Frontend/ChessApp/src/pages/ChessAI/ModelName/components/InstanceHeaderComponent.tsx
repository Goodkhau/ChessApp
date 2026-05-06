import { useChessStoreActions, useShowDeleteForm } from "../ChessStore.ts";
import DeleteForm from "./DeleteFormComponent.tsx";
import CreateDeletePopup from "./FormPopupComponent.tsx";
import { DotsIcon } from './icons/DotsIcon.tsx';
import { XIcon } from './icons/XIcon.tsx';

export default function InstanceHeader({ instanceKey }: {instanceKey: string}) {
	const { setShowDeleteForm } = useChessStoreActions();
	const showDeleteForm = useShowDeleteForm(instanceKey);
	
	return (
		<>
			<hgroup className="my-1 w-full flex justify-between">
				<div>
					<h2 className="text-yellow-200/80 line-clamp-1 break-all">{instanceKey}</h2>
				</div>
				<div className="flex flex-row gap-2 items-center">
					{DotsIcon({ size: 24 })}
					<div onClick={() => setShowDeleteForm(instanceKey, true) }>
						{XIcon({ size: 24 })}
					</div>
				</div>
			</hgroup>

			<CreateDeletePopup showForm={showDeleteForm} onClose={() => setShowDeleteForm(instanceKey, false)}>
				<DeleteForm instanceKey={instanceKey} />
			</CreateDeletePopup>
		</>
	);
}