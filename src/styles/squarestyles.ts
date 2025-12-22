import { SquareDto, PositionDto } from "@/model/gameDto";
import { MoveDto } from "@/model/moveDto";
import {
  isSquareSelected,
  isHighlighted,
  findMove,
  isActivePiece,
  canSelectPiece,
} from "@/utils/boardLogic";

interface SquareStylesParams {
  square: SquareDto;
  selectedSquare: { row: number; col: number } | null;
  validMoves: MoveDto[];
  currentPlayerColor: "W" | "B";
  isMoving: boolean;
  highlightSquare?: { row: number; col: number } | null;
  activePieces: PositionDto[];
  humanColor: "WHITE" | "BLACK";
}

export function getSquareClasses(params: SquareStylesParams): string {
  const {
    square,
    selectedSquare,
    validMoves,
    currentPlayerColor,
    isMoving,
    highlightSquare,
    activePieces,
    humanColor,
  } = params;

  const { row, col, color } = square;
  const selected = isSquareSelected(selectedSquare, row, col);
  const highlighted = isHighlighted(highlightSquare, row, col);
  const move = findMove(validMoves, row, col);

  const isOwnPiece = square.piece?.color === currentPlayerColor;

  const isHumanTurn =
    (currentPlayerColor === "W" && humanColor === "WHITE") ||
    (currentPlayerColor === "B" && humanColor === "BLACK");

  const active = isActivePiece(activePieces, row, col);
  const canSelect = canSelectPiece(square, currentPlayerColor, activePieces);

  const isInteractive =
    isHumanTurn && (canSelect || !!move) && !highlightSquare;

  return [
    "w-20 h-20 flex items-center justify-center relative transition-all duration-200 select-none",
    color === "LIGHT_BROWN" ? "bg-amber-100" : "bg-amber-700",
    isInteractive && !isMoving ? "cursor-pointer hover:brightness-110" : "",
    !isInteractive && isOwnPiece && !active ? "opacity-90" : "",
    selected ? "ring-4 ring-blue-500 ring-inset" : "",
    highlighted
      ? "bg-amber-600 opacity-80 ring-4 ring-amber-400 ring-inset"
      : "",
    move && !move.isJump ? "ring-4 ring-green-400 ring-inset" : "",
    move?.isJump ? "ring-4 ring-red-400 ring-inset animate-pulse" : "",
    isMoving ? "cursor-wait" : "",
  ].join(" ");
}
