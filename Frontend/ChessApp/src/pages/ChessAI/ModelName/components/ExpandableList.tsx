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
}
