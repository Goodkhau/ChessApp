import _ from "lodash";
import { useState } from "react";

import "./ExpandableList.css";

export interface PredictionListItem {
  id?: string;
  move: string;
  weight: number;
  color?: string;
}

interface ExpandableListProps {
  icon?: string;
  predictionList: PredictionListItem[];
}

export default function ExpandableList({
	icon = ">>",
	predictionList,
}: ExpandableListProps) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="expandable-demo">
			<div className={`expandable ${isOpen ? "is-open" : ""}`}>
				<button
					className="expandable__toggle"
					onClick={() => setIsOpen((openState) => !openState)}
					aria-expanded={isOpen}
					aria-move={isOpen ? "Collapse" : "Expand"}
				>
					<span className={`expandable__toggle-icon ${isOpen ? "is-open" : ""}`}>
						{icon}
					</span>
				</button>
				<div className="expandable__content">
					<div className="expandable__list">
						{
							_.map(predictionList, ({
								id = "unknown",
								move = "unknown",
								weight = Number.NEGATIVE_INFINITY,
								color = "#FFFFFF",
							}: PredictionListItem, index: number) => (
								<div
									key={id}
									className="expandable__item"
									style={{ animationDelay: `${index * 50}ms` }}
								>
									<div
										className="expandable__item-dot"
										style={{ background: color }}
									/>
									<div className="expandable__item-content">
										<div className="expandable__item-move">{move}</div>
										<div className="expandable__item-progress-bar-container">
											<div
												className="expandable__item-progress-bar"
												style={{ width: (weight * 100) + "%" }}
											/>
										</div>
									</div>
									<div className="expandable__item-weight">{weight.toFixed(3)}</div>
								</div>
							))
						}
					</div>
				</div>
			</div>
		</div>
	);
}
