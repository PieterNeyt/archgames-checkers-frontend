import { SquareDto, PositionDto } from "@/model/gameDto.ts";
import {
    isSquareSelected,
    canSelectPiece,
    isActivePiece,
} from "@/utils/boardLogic.ts";

interface PieceProps {
    square: SquareDto;
    selectedSquare: { row: number; col: number } | null;
    currentPlayerColor: "WHITE" | "BLACK";
    activePieces: PositionDto[];
    highlightSquare?: { row: number; col: number } | null;
    humanColor: "WHITE" | "BLACK";
}

export function renderPiece(props: PieceProps) {
    const {
        square,
        selectedSquare,
        currentPlayerColor,
        activePieces,
        highlightSquare,
        humanColor,
    } = props;

    if (!square.piece) return null;

    const selected = isSquareSelected(selectedSquare, square.row, square.col);
    const canSelect = canSelectPiece(square, currentPlayerColor, activePieces);
    const active = isActivePiece(activePieces, square.row, square.col);

    const isHumanTurn =
        (currentPlayerColor === "WHITE" && humanColor === "WHITE") ||
        (currentPlayerColor === "BLACK" && humanColor === "BLACK");

    return (
        <div
            className={[
                "w-16 h-16 rounded-full flex items-center justify-center shadow-lg z-10 transition-transform duration-200",
                selected ? "scale-110" : "scale-100",
                isHumanTurn && canSelect && !highlightSquare ? "hover:scale-105" : "",
                (!isHumanTurn || !canSelect) &&
                square.piece.color === currentPlayerColor
                    ? "opacity-60 grayscale-[0.3]"
                    : "",
                square.piece.color === "WHITE"
                    ? "bg-gradient-to-br from-gray-100 to-gray-300 border-4 border-gray-400"
                    : "bg-gradient-to-br from-gray-700 to-gray-900 border-4 border-gray-950",
            ].join(" ")}
        >
            {isHumanTurn && active && !selected && !highlightSquare && (
                <div className="absolute inset-0 rounded-full ring-2 ring-yellow-400 animate-pulse" />
            )}

            {square.piece.type === "KING" && (
                <span
                    className={`text-2xl font-bold ${
                        square.piece.color === "WHITE" ? "text-yellow-500" : "text-yellow-300"
                    }`}
                >
          ♔
        </span>
            )}
        </div>
    );
}