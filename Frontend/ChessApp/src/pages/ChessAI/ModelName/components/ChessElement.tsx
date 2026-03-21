import { type Dispatch, type SetStateAction } from "react";

import "./ChessElement.css";

import { type PredictionListItem } from "./ExpandableList.tsx";

interface ChessElementProp {
  setPredictionList: Dispatch<SetStateAction<PredictionListItem[]>>
}

export default function ChessElement({ setPredictionList }: ChessElementProp) {
	
}