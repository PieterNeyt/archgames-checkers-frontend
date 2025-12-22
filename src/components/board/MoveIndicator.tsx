import { SquareDto } from "@/model/gameDto.ts";
import { MoveDto } from "@/model/moveDto.ts";
import { findMove } from "@/utils/boardLogic.ts";

interface MoveIndicatorProps {
    square: SquareDto;
    validMoves: MoveDto[];
}

export function renderMoveIndicator(props: MoveIndicatorProps) {
    const { square, validMoves } = props;
    const move = findMove(validMoves, square.row, square.col);

    if (!move || square.piece) return null;

    return (
        <div
            className={`w-6 h-6 rounded-full opacity-70 pointer-events-none ${
                move.isJump ? "bg-red-400 animate-pulse" : "bg-green-400"
            }`}
        />
    );
}