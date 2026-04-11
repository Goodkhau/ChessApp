import { Square } from "chess.js";
import _ from "lodash";
import { useState } from "react";
import { Chessboard, PieceDropHandlerArgs, SquareHandlerArgs } from "react-chessboard";
import { useParams } from "react-router-dom";

import { useChessStoreActions, useInstanceChessEngine } from "../ChessStore";
import { getModelResponse } from "../utils/apis/ModelResponse.ts";
import { ModelResponseParser } from "../utils/ModelResponseParser.ts";

export default function ChessBoardComponent({ instanceKey }: {instanceKey: string}) {
	const { modelName } = useParams();

	const { setInstancePredictionList } = useChessStoreActions();
	const chessEngine = useInstanceChessEngine(instanceKey);

	const [chessPosition, setChessPosition] = useState(chessEngine.fen());
	const [optionSquares, setOptionSquares] = useState({});
	const [moveFrom, setMoveFrom] = useState("");


	async function moveAI(): Promise<void> {
		if (chessEngine.isGameOver()) {
			return;
		}

		const history = _.map(chessEngine.history({ verbose: true }), move => move.san);
		const parser = new ModelResponseParser( await getModelResponse({ modelName: modelName ?? "Little_Blue", sans: history }) );

		const possibleMoves = _.map(chessEngine.moves({ verbose: true }), move => move.san );
		const newPredictionList = parser.getParsedResponse(possibleMoves);
		setInstancePredictionList(instanceKey, newPredictionList);

		const max = _.maxBy(newPredictionList, "weight");
		const randomZeroToMax = Math.random() * (max?.weight ?? 1);

		const filteredList = _.filter(newPredictionList, ({ weight }) => { return weight >= randomZeroToMax; } );
		const mv = filteredList[Math.floor(Math.random() * filteredList.length)];
		console.log(filteredList);
		console.log(mv);
		chessEngine.move(mv.move);
		setChessPosition(chessEngine.fen());
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

			setChessPosition(chessEngine.fen());
			setMoveFrom('');
			setOptionSquares({});
			setTimeout(moveAI, 10000);
		} catch {
			if (hasMoveOption(square as Square)) {
				setMoveFrom(square);
			}
			return;
		}
	}

	function onPieceDrop({
		sourceSquare,
		targetSquare,
	}: PieceDropHandlerArgs) {
		if (!targetSquare) {
			return false;
		}

		try {
			chessEngine.move({
				from: sourceSquare,
				to: targetSquare,
			});

			setChessPosition(chessEngine.fen());
			setMoveFrom('');
			setOptionSquares({});
			setTimeout(moveAI, 10000);

			return true;
		} catch {
			return false;
		}
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