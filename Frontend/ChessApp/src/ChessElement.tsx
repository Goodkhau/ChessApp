import { Chess, type Square } from "chess.js";
import { useRef, useState } from "react";
import { Chessboard, type PieceDropHandlerArgs, type SquareHandlerArgs } from "react-chessboard";
import "./ChessElement.css";


export default function ChessElement() {
  const chessGameRef = useRef(new Chess());
  const chessGame = chessGameRef.current;

  const [chessPosition, setChessPosition] = useState();
  const [status, setStatus] = useState("White to move");
  const [moveFrom, setMoveFrom] = useState("");
  const [optionSquares, setOptionSquares] = useState<Record<string, React.CSSProperties>>({});

  function updateStatus() {
    if (chessGame.isCheckmate()) {
      setStatus(`Checkmate! ${chessGame.turn() === "w" ? "Black" : "White"} wins`);
    } else if (chessGame.isDraw()) {
      setStatus("Draw!");
    } else if (chessGame.isCheck()) {
      setStatus(`${chessGame.turn() === "w" ? "White" : "Black"} is in check`);
    } else {
      setStatus(`${chessGame.turn() === "w" ? "White" : "Black"} to move`);
    }
  }

  function makeRandomMove() {
    const possibleMoves = chessGame.moves();
    if (chessGame.isGameOver()) return;
    const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    chessGame.move(randomMove);
    setChessPosition(chessGame.fen());
    updateStatus();
  }

  function getMoveOptions(square: Square): boolean {
    const moves = chessGame.moves({ square, verbose: true });
    if (moves.length === 0) {
      setOptionSquares({});
      return false;
    }

    const newSquares: Record<string, React.CSSProperties> = {};
    for (const move of moves) {
      const isCapture =
        chessGame.get(move.to) &&
        chessGame.get(move.to)?.color !== chessGame.get(square)?.color;
      newSquares[move.to] = {
        background: isCapture
          ? "radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)"
          : "radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)",
        borderRadius: "50%",
      };
    }
    newSquares[square] = { background: "rgba(255, 255, 0, 0.4)" };
    setOptionSquares(newSquares);
    return true;
  }

  function onSquareClick({ square, piece }: SquareHandlerArgs) {
    // First click — select a piece
    if (!moveFrom && piece) {
      const hasMoveOptions = getMoveOptions(square as Square);
      if (hasMoveOptions) setMoveFrom(square);
      return;
    }

    // Second click — attempt the move
    const moves = chessGame.moves({ square: moveFrom as Square, verbose: true });
    const foundMove = moves.find((m) => m.from === moveFrom && m.to === square);

    if (!foundMove) {
      const hasMoveOptions = getMoveOptions(square as Square);
      setMoveFrom(hasMoveOptions ? square : "");
      return;
    }

    try {
      chessGame.move({ from: moveFrom, to: square, promotion: "q" });
    } catch {
      const hasMoveOptions = getMoveOptions(square as Square);
      if (hasMoveOptions) setMoveFrom(square);
      return;
    }

    setChessPosition(chessGame.fen());
    updateStatus();
    setTimeout(makeRandomMove, 300);
    setMoveFrom("");
    setOptionSquares({});
  }

  function onPieceDrop({ sourceSquare, targetSquare }: PieceDropHandlerArgs): boolean {
    if (!targetSquare) return false;

    try {
      chessGame.move({ from: sourceSquare, to: targetSquare, promotion: "q" });
      setChessPosition(chessGame.fen());
      updateStatus();
      setMoveFrom("");
      setOptionSquares({});
      setTimeout(makeRandomMove, 500);
      return true;
    } catch {
      return false;
    }
  }

  function resetGame() {
    chessGameRef.current = new Chess();
    setChessPosition(chessGameRef.current.fen());
    setStatus("White to move");
    setMoveFrom("");
    setOptionSquares({});
  }

  const chessboardOptions = {
      onPieceDrop,
      onSquareClick,
      position: chessPosition,
      squareStyles: optionSquares,
      id: 'click-or-drag-to-move'
    };

  return (
    <div className="app">
      <h1 className="title">Chess</h1>
      <p className="status">{status}</p>
      <div className="board-wrapper">
        <Chessboard options={chessboardOptions}/>
      </div>
      <button className="reset-btn" onClick={resetGame}>
        New Game
      </button>
    </div>
  );
}
