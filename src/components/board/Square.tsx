import { renderMoveIndicator } from "./MoveIndicator.tsx";
import { renderPiece } from "./Piece.tsx";
import { SquareDto, PositionDto } from "@/model/gameDto.ts";
import { MoveDto } from "@/model/moveDto.ts";
import { getSquareClasses } from "@/styles/squarestyles.ts";

interface SquareProps {
  square: SquareDto;
  onSquareClick: (row: number, col: number) => void;
  selectedSquare: { row: number; col: number } | null;
  validMoves: MoveDto[];
  currentPlayerColor: "WHITE" | "BLACK";
  isMoving: boolean;
  highlightSquare?: { row: number; col: number } | null;
  activePieces: PositionDto[];
  humanColor: "WHITE" | "BLACK";
}

export function Square(props: SquareProps) {
  const {
    square,
    onSquareClick,
    selectedSquare,
    validMoves,
    currentPlayerColor,
    isMoving,
    highlightSquare,
    activePieces,
    humanColor,
  } = props;

  const squareClasses = getSquareClasses({
    square,
    selectedSquare,
    validMoves,
    currentPlayerColor,
    isMoving,
    highlightSquare,
    activePieces,
    humanColor,
  });

  return (
    <button
      key={`${square.row}-${square.col}`}
      className={squareClasses}
      type="button"
      onClick={() => onSquareClick(square.row, square.col)}
    >
      <div className="absolute top-0 left-1 text-[10px] opacity-30 pointer-events-none">
        {square.row},{square.col}
      </div>

      {renderMoveIndicator({ square, validMoves })}
      {renderPiece({
        square,
        selectedSquare,
        currentPlayerColor,
        activePieces,
        highlightSquare,
        humanColor,
      })}
    </button>
  );
}
