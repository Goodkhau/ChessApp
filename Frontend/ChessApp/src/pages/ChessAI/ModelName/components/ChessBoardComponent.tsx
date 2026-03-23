import { Square } from "chess.js";
import _ from "lodash";
import { useState } from "react";
import { Chessboard, SquareHandlerArgs } from "react-chessboard";

import { useParams } from "react-router-dom";
import { useChessStoreActions } from "../ChessStore";
import { getModelResponse } from "../utils/apis/ModelResponse.ts";
import { ModelResponseParser } from "../utils/ModelResponseParser.ts";
import "./ChessBoardComponent.css";


export default function ChessBoardComponent({ instanceID }: {instanceID: string}) {
	const { modelName } = useParams();

	const { getInstanceChessEngine, getInstancePredictionList, setInstancePredictionList } = useChessStoreActions();
	const chessEngine = getInstanceChessEngine(instanceID);
	const predictionList = getInstancePredictionList(instanceID);

	const [chessPosition, setChessPosition] = useState(chessEngine.fen());
	const [optionSquares, setOptionSquares] = useState({});
	const [moveFrom, setMoveFrom] = useState("");



	async function moveAI() {
		if (chessEngine.isGameOver()) {
			return;
		}

		const history = _.map(chessEngine.history({ verbose: true }), move => move.san);
		const parser = new ModelResponseParser( await getModelResponse({ modelName: modelName ?? "", sans: history }) );

		const newPredictionList = parser.getParsedResponse(history);
		setInstancePredictionList(instanceID, newPredictionList);

		const max = _.reduce(predictionList, (a, b) => Math.max(a, b.weight), -Infinity);
		const randomZeroToMax = Math.random() * max;

		const filteredList = _.filter(predictionList, ({ weight }) => weight >= randomZeroToMax);
		return filteredList[Math.floor(Math.random() * filteredList.length)];
	}

	/*
	 *	!!! This function has a side effect, OptionSquares is updated meaning the
	 *  !!! when you click a piece, the dots that appear are updated here.
	*/
	function hasMoveOption(square: Square): boolean {
		const moves = chessEngine.moves({ square, verbose: true });

		if (moves.length === 0) {
			setOptionSquares({});
			return false;
		}

		const newSquares: Record<string, React.CSSProperties> = {};

		for (const move of moves) {
			newSquares[move.to] = {
				background: chessEngine.get(move.to) && (chessEngine.get(move.to)?.color !== chessEngine.get(square)?.color) 
					? 'radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)'
					: 'radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)',
				borderRadius: '50%',
			};
		}

		newSquares[square] = {
			background: 'rgba(255, 255, 0, 0.4)',
		};

		setOptionSquares(newSquares);

		return true;
	}

	function onSquareClick({ square, piece }: SquareHandlerArgs) {
		if (!square && piece && hasMoveOption(square as Square)) {
			setMoveFrom(square);
			return;
		}

		if (!square && piece) {
			return;
		}

		const moves = chessEngine.moves({ square: moveFrom as Square, verbose: true });
		if (!_.find(moves, move => (move.from === moveFrom) && (move.to === square))) {
			setMoveFrom(hasMoveOption(square as Square) ? square : '');
			return;
		}

		try {
			chessEngine.move({ from: moveFrom, to: square, promotion: 'q' }); //Promotion needs to be implemented
		} catch {
			if (hasMoveOption(square as Square)) {
				setMoveFrom(square);
			}

			return;
		}

		setChessPosition(chessEngine.fen());
		setTimeout(moveAI, 10000);
		setMoveFrom('');
		setOptionSquares({});
	}

	function onPieceDrop() {
		return true;
	}

	const chessboardOptions = {
		onPieceDrop,
		onSquareClick,
		position: chessPosition,
		squareStyles: optionSquares,
		id: 'click-or-drag-to-move',
	};

	return <Chessboard options={chessboardOptions} />;
}