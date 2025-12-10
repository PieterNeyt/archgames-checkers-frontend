import { SquareDto, PositionDto } from "@/model/gameDto";
import { MoveDto } from "@/model/moveDto";

export const isSquareSelected = (sel: any, r: number, c: number) =>
  sel?.row === r && sel?.col === c;

export const isHighlighted = (h: any, r: number, c: number) =>
  h?.row === r && h?.col === c;

export const findMove = (validMoves: MoveDto[], r: number, c: number) =>
  validMoves.find((m) => m.toRow === r && m.toCol === c);

export const isActivePiece = (active: PositionDto[], r: number, c: number) =>
  active.some((p) => p.row === r && p.col === c);

export const canSelectPiece = (
  square: SquareDto,
  currentPlayer: "WHITE" | "BLACK",
  active: PositionDto[],
) =>
  square.piece &&
  square.piece.color === currentPlayer &&
  isActivePiece(active, square.row, square.col);
