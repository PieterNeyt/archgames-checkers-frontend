import React from "react";

import { BoardDto, SquareDto, PositionDto } from "@/model/gameDto";
import { MoveDto } from "@/model/moveDto";

interface Props {
  board: BoardDto;
  onSquareClick: (row: number, col: number) => void;
  selectedSquare: { row: number; col: number } | null;
  validMoves: MoveDto[];
  currentPlayerColor: "WHITE" | "BLACK";
  isMoving: boolean;
  highlightSquare?: { row: number; col: number } | null;
  activePieces: PositionDto[];
}

export function Board({
  board,
  onSquareClick,
  selectedSquare,
  validMoves,
  currentPlayerColor,
  isMoving,
  highlightSquare,
  activePieces,
}: Props) {
  const isSquareSelected = (row: number, col: number) => {
    return selectedSquare?.row === row && selectedSquare?.col === col;
  };

  const isHighlighted = (row: number, col: number) => {
    return highlightSquare?.row === row && highlightSquare?.col === col;
  };

  const isValidMoveTarget = (row: number, col: number) => {
    return validMoves.some((move) => move.toRow === row && move.toCol === col);
  };

  const isJumpTarget = (row: number, col: number) => {
    return validMoves.some(
      (move) => move.toRow === row && move.toCol === col && move.isJump,
    );
  };

  // Helper om te zien of een stuk mag bewegen
  const isActivePiece = (row: number, col: number) => {
    return activePieces.some((p) => p.row === row && p.col === col);
  };

  return (
    <div className="grid grid-cols-8 gap-0 border-4 border-gray-800 shadow-2xl select-none">
      {board.board.flat().map((square: SquareDto) => {
        const selected = isSquareSelected(square.row, square.col);
        const highlighted = isHighlighted(square.row, square.col);
        const validTarget = isValidMoveTarget(square.row, square.col);
        const jumpTarget = isJumpTarget(square.row, square.col);

        const isOwnPiece =
          square.piece && square.piece.color === currentPlayerColor;
        const isActive = isActivePiece(square.row, square.col);

        const canSelect = isOwnPiece && isActive;

        const isInteractive = (canSelect || validTarget) && !highlightSquare;

        const handleClick = () => {
          if (!isMoving) {
            if (isOwnPiece && !isActive) return;
            onSquareClick(square.row, square.col);
          }
        };

        const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
          if (
            (e.key === "Enter" || e.key === " ") &&
            isInteractive &&
            !isMoving
          ) {
            e.preventDefault();
            handleClick();
          }
        };

        return (
          <div
            key={`${square.row}-${square.col}`}
            className={`
              w-20 h-20 flex items-center justify-center relative
              transition-all duration-200
              ${square.color === "LIGHT_BROWN" ? "bg-amber-100" : "bg-amber-700"}
              ${isInteractive ? "cursor-pointer hover:brightness-110" : ""}
              ${!isInteractive && isOwnPiece && !isActive ? "opacity-90 cursor-not-allowed" : ""} 
              ${selected ? "ring-4 ring-blue-500 ring-inset" : ""}
              ${highlighted ? "bg-amber-600 opacity-80 ring-4 ring-amber-400 ring-inset" : ""}
              ${validTarget && !jumpTarget ? "ring-4 ring-green-400 ring-inset" : ""}
              ${jumpTarget ? "ring-4 ring-red-400 ring-inset animate-pulse" : ""}
              ${isMoving ? "cursor-wait" : ""}
            `}
            role={isInteractive ? "button" : undefined}
            tabIndex={isInteractive && !isMoving ? 0 : -1}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
          >
            {/* Coordinate labels */}
            <div className="absolute top-0 left-1 text-xs opacity-40 select-none pointer-events-none">
              {square.row},{square.col}
            </div>

            {validTarget && !square.piece && (
              <div
                className={`
                  w-6 h-6 rounded-full 
                  ${jumpTarget ? "bg-red-400 animate-pulse" : "bg-green-400"}
                  opacity-70 pointer-events-none
                `}
              />
            )}

            {square.piece && (
              <div
                className={`
                  w-16 h-16 rounded-full flex items-center justify-center
                  transition-transform duration-200
                  ${selected ? "scale-110" : "scale-100"}
                  ${canSelect && !highlightSquare ? "hover:scale-105" : ""}
                  ${!canSelect && isOwnPiece ? "opacity-50 grayscale-[0.5]" : ""} 
                  ${
                    square.piece.color === "WHITE"
                      ? "bg-gradient-to-br from-gray-100 to-gray-300 border-4 border-gray-400"
                      : "bg-gradient-to-br from-gray-700 to-gray-900 border-4 border-gray-950"
                  }
                  shadow-lg z-10
                `}
              >
                {/* Visual indicator  */}
                {isActive && !selected && !highlightSquare && (
                  <div className="absolute inset-0 rounded-full ring-2 ring-yellow-400 animate-pulse" />
                )}

                {square.piece.type === "KING" && (
                  <span
                    className={`
                      text-2xl font-bold
                      ${
                        square.piece.color === "WHITE"
                          ? "text-yellow-500"
                          : "text-yellow-300"
                      }
                    `}
                  >
                    ♔
                  </span>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
