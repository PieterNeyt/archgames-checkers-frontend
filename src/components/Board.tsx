import { BoardDto, SquareDto, PositionDto } from "@/model/gameDto";
import { MoveDto } from "@/model/moveDto";
import {
  isSquareSelected,
  isHighlighted,
  findMove,
  isActivePiece,
  canSelectPiece,
} from "@/utils/boardLogic";

interface Props {
  board: BoardDto;
  onSquareClick: (row: number, col: number) => void;
  selectedSquare: { row: number; col: number } | null;
  validMoves: MoveDto[];
  currentPlayerColor: "W" | "B";
  isMoving: boolean;
  highlightSquare?: { row: number; col: number } | null;
  activePieces: PositionDto[];
}

export function Board(props: Props) {
  const {
    board,
    onSquareClick,
    selectedSquare,
    validMoves,
    currentPlayerColor,
    isMoving,
    highlightSquare,
    activePieces,
  } = props;

  // Helpers

  const getSquareClasses = (square: SquareDto) => {
    const { row, col, color } = square;
    const selected = isSquareSelected(selectedSquare, row, col);
    const highlighted = isHighlighted(highlightSquare, row, col);
    const move = findMove(validMoves, row, col);
    const isOwnPiece = square.piece?.color === currentPlayerColor;
    const active = isActivePiece(activePieces, row, col);
    const canSelect = canSelectPiece(square, currentPlayerColor, activePieces);

    const isInteractive = (canSelect || !!move) && !highlightSquare;

    return [
      "w-20 h-20 flex items-center justify-center relative transition-all duration-200 select-none",
      color === "LIGHT_BROWN" ? "bg-amber-100" : "bg-amber-700",
      isInteractive && !isMoving ? "cursor-pointer hover:brightness-110" : "",
      !isInteractive && isOwnPiece && !active ? "opacity-90 cursor-not-allowed" : "",
      selected ? "ring-4 ring-blue-500 ring-inset" : "",
      highlighted ? "bg-amber-600 opacity-80 ring-4 ring-amber-400 ring-inset" : "",
      move && !move.isJump ? "ring-4 ring-green-400 ring-inset" : "",
      move?.isJump ? "ring-4 ring-red-400 ring-inset animate-pulse" : "",
      isMoving ? "cursor-wait" : "",
    ].join(" ");
  };

  const renderMoveIndicator = (square: SquareDto) => {
    const move = findMove(validMoves, square.row, square.col);

    if (!move || square.piece) return null;

    return (
      <div
        className={`w-6 h-6 rounded-full opacity-70 pointer-events-none ${
          move.isJump ? "bg-red-400 animate-pulse" : "bg-green-400"
        }`}
      />
    );
  };

  const renderPiece = (square: SquareDto) => {
    if (!square.piece) return null;

    const selected = isSquareSelected(selectedSquare, square.row, square.col);
    const canSelect = canSelectPiece(square, currentPlayerColor, activePieces);
    const active = isActivePiece(activePieces, square.row, square.col);

    return (
      <div
        className={[
          "w-16 h-16 rounded-full flex items-center justify-center shadow-lg z-10 transition-transform duration-200",
          selected ? "scale-110" : "scale-100",
          canSelect && !highlightSquare ? "hover:scale-105" : "",
          !canSelect && square.piece.color === currentPlayerColor ? "opacity-50 grayscale-[0.5]" : "",
          square.piece.color === "W" ? "bg-gradient-to-br from-gray-100 to-gray-300 border-4 border-gray-400" : "bg-gradient-to-br from-gray-700 to-gray-900 border-4 border-gray-950",
        ].join(" ")}
      >
        {active && !selected && !highlightSquare && (
          <div className="absolute inset-0 rounded-full ring-2 ring-yellow-400 animate-pulse" />
        )}

        {square.piece.type === "KING" && (
          <span
            className={`text-2xl font-bold ${
              square.piece.color === "W" ? "text-yellow-500" : "text-yellow-300"
            }`}
          >
            ♔
          </span>
        )}
      </div>
    );
  };

  const handleClick = (square: SquareDto) => {
    if (isMoving) return;

    const isOwnPiece = square.piece?.color === currentPlayerColor;

    if (isOwnPiece && !isActivePiece(activePieces, square.row, square.col))
      return;

    onSquareClick(square.row, square.col);
  };

  return (
    <div className="grid grid-cols-8 gap-0 border-4 border-gray-800 shadow-2xl select-none">
      {board.board.flat().map((square) => {
        const interactive =
          (canSelectPiece(square, currentPlayerColor, activePieces) ||
            findMove(validMoves, square.row, square.col)) &&
          !highlightSquare;

        return (
          <div
            key={`${square.row}-${square.col}`}
            className={getSquareClasses(square)}
            role={interactive ? "button" : undefined}
            tabIndex={interactive && !isMoving ? 0 : -1}
            onClick={() => handleClick(square)}
            onKeyDown={(e) => {
              if (
                (e.key === "Enter" || e.key === " ") &&
                interactive &&
                !isMoving
              ) {
                e.preventDefault();
                handleClick(square);
              }
            }}
          >
            <div className="absolute top-0 left-1 text-xs opacity-40 pointer-events-none">
              {square.row},{square.col}
            </div>

            {renderMoveIndicator(square)}
            {renderPiece(square)}
          </div>
        );
      })}
    </div>
  );
}
