import { Square } from "chess.js";
import _ from "lodash";
import { useState } from "react";
import { Chessboard, PieceDropHandlerArgs, SquareHandlerArgs } from "react-chessboard";

import { useChessStoreActions, useInstanceBoardOrientation, useInstanceChessEngine, useInstanceModelName } from "../ChessStore";
import { ModelResponseHandler } from "../utils/apis/ModelResponse.ts";

export default function ChessBoardComponent({ instanceKey }: {instanceKey: string}) {
	const { setInstancePredictionList } = useChessStoreActions();
	const chessEngine = useInstanceChessEngine(instanceKey);
	const modelName = useInstanceModelName(instanceKey);
	const boardOrientation = useInstanceBoardOrientation(instanceKey);

	const [chessPosition, setChessPosition] = useState(chessEngine.fen());
	const [optionSquares, setOptionSquares] = useState({});
	const [moveFrom, setMoveFrom] = useState("");


	async function moveAI(): Promise<void> {
		if (chessEngine.isGameOver()) {
			return;
		}

		const handler = new ModelResponseHandler();
		const {
			newPredictionList,
			selectedMove,
		} = await handler.getParsedResponse({ chessGame: chessEngine, modelName });
		
		setInstancePredictionList(instanceKey, newPredictionList);
		chessEngine.move(selectedMove.move);
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
		boardOrientation,
		position: chessPosition,
		squareStyles: optionSquares,
		id: 'click-or-drag-to-move',
	};

	return (
		<div className="aspect-square">
			<Chessboard options={chessboardOptions} />
		</div>
	);
}