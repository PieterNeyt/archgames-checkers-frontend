import { BoardDto, SquareDto } from "@/model/gameDto";

interface Props {
  board: BoardDto;
}

export const Board = ({ board }: Props) => {
  return (
    <div className="grid grid-cols-8 gap-0 border-4 border-black">
      {board.board.flat().map((square: SquareDto) => (
        <div
          key={`${square.row}-${square.col}`}
          className={`w-16 h-16 flex items-center justify-center ${
            square.color === "LIGHT_BROWN" ? "bg-yellow-200" : "bg-yellow-700"
          }`}
        >
          {square.piece && (
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                square.piece.color === "WHITE" ? "bg-white" : "bg-black"
              }`}
            >
              {square.piece.type === "KING" && (
                <span className="text-red-500 font-bold">K</span>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
