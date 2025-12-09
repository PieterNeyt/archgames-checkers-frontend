import { BoardDto } from "@/model/gameDto";
import { MoveDto } from "@/model/moveDto";

export const createPreviewBoard = (
  currentBoard: BoardDto,
  move: MoveDto,
): BoardDto => {

  const newBoardObj = JSON.parse(JSON.stringify(currentBoard)) as BoardDto;
  const boardGrid = newBoardObj.board;

  const piece = boardGrid[move.fromRow][move.fromCol].piece;

  boardGrid[move.fromRow][move.fromCol].piece = undefined;

  if (piece) {
    boardGrid[move.toRow][move.toCol].piece = piece;
  }

  if (move.capturedPositions && move.capturedPositions.length > 0) {
    move.capturedPositions.forEach((pos) => {
      boardGrid[pos.row][pos.col].piece = undefined;
    });
  }

  return newBoardObj;
};
