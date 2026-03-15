import { Chess, type Square } from "chess.js";
import { useRef, useState } from "react";
import { Chessboard, type PieceDropHandlerArgs, type SquareHandlerArgs } from "react-chessboard";
import "./ChessElement.css";


export default function ChessElement() {
  const chessGame = useRef(new Chess());

  const [chessPosition, setChessPosition] = useState<string>();
  const [status, setStatus] = useState("White to move");
  const [moveFrom, setMoveFrom] = useState("");
  const [optionSquares, setOptionSquares] = useState<Record<string, React.CSSProperties>>({});

  function updateStatus() {
    if (chessGame.current.isCheckmate()) {
      setStatus(`Checkmate! ${chessGame.current.turn() === "w" ? "Black" : "White"} wins`);
    } else if (chessGame.current.isDraw()) {
      setStatus("Draw!");
    } else if (chessGame.current.isCheck()) {
      setStatus(`${chessGame.current.turn() === "w" ? "White" : "Black"} is in check`);
    } else {
      setStatus(`${chessGame.current.turn() === "w" ? "White" : "Black"} to move`);
    }
  }

  function makeRandomMove() {
    const possibleMoves = chessGame.current.moves();
    if (chessGame.current.isGameOver()) return;
    const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    chessGame.current.move(randomMove);
    setChessPosition(chessGame.current.fen());
    updateStatus();
  }

  function getMoveOptions(square: Square): boolean {
    const moves = chessGame.current.moves({ square, verbose: true });
    if (moves.length === 0) {
      setOptionSquares({});
      return false;
    }

    const newSquares: Record<string, React.CSSProperties> = {};
    for (const move of moves) {
      const isCapture =
        chessGame.current.get(move.to) &&
        chessGame.current.get(move.to)?.color !== chessGame.current.get(square)?.color;
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
    if (!moveFrom && piece) {
      const hasMoveOptions = getMoveOptions(square as Square);
      if (hasMoveOptions) setMoveFrom(square);
      return;
    }
    
    const moves = chessGame.current.moves({ square: moveFrom as Square, verbose: true });
    const foundMove = moves.find((m) => m.from === moveFrom && m.to === square);

    if (!foundMove) {
      const hasMoveOptions = getMoveOptions(square as Square);
      setMoveFrom(hasMoveOptions ? square : "");
      return;
    }

    try {
      chessGame.current.move({ from: moveFrom, to: square, promotion: "q" });
    } catch {
      const hasMoveOptions = getMoveOptions(square as Square);
      if (hasMoveOptions) setMoveFrom(square);
      return;
    }

    setChessPosition(chessGame.current.fen());
    updateStatus();
    setTimeout(makeRandomMove, 300);
    setMoveFrom("");
    setOptionSquares({});
  }

  function onPieceDrop({ sourceSquare, targetSquare }: PieceDropHandlerArgs): boolean {
    if (!targetSquare) return false;

    try {
      chessGame.current.move({ from: sourceSquare, to: targetSquare, promotion: "q" });
      setChessPosition(chessGame.current.fen());
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
    chessGame.current = new Chess();
    setChessPosition(chessGame.current.fen());
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
