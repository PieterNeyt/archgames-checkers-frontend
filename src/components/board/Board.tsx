import { BoardDto, PositionDto } from "@/model/gameDto.ts";
import { MoveDto } from "@/model/moveDto.ts";
import { Square } from "./Square.tsx";

interface Props {
  board: BoardDto;
  onSquareClick: (row: number, col: number) => void;
  selectedSquare: { row: number; col: number } | null;
  validMoves: MoveDto[];
  currentPlayerColor: "W" | "B";
  isMoving: boolean;
  highlightSquare?: { row: number; col: number } | null;
  activePieces: PositionDto[];
  humanColor: "WHITE" | "BLACK";
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
    humanColor,
  } = props;

  return (
      <div className="grid grid-cols-8 gap-0 border-4 border-gray-800 shadow-2xl select-none">
        {board.board.flat().map((square) => (
            <Square
                key={`${square.row}-${square.col}`}
                square={square}
                onSquareClick={onSquareClick}
                selectedSquare={selectedSquare}
                validMoves={validMoves}
                currentPlayerColor={currentPlayerColor}
                isMoving={isMoving}
                highlightSquare={highlightSquare}
                activePieces={activePieces}
                humanColor={humanColor}
            />
        ))}
      </div>
  );
}