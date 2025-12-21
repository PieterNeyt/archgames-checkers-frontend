import { PieceDto } from "@/model/pieceDto.ts";

export interface SquareDto {
  row: number;
  col: number;
  color: "LIGHT_BROWN" | "DARK_BROWN";
  piece?: PieceDto;
}

export interface BoardDto {
  board: SquareDto[][];
}

export interface PlayerDto {
  displayName: string;
  color: "WHITE" | "BLACK";
  type: "HUMAN" | "AI";
}

export interface PositionDto {
  row: number;
  col: number;
}

export interface GameDto {
  gameId: string;
  board: BoardDto;
  playerWhite: PlayerDto;
  playerBlack: PlayerDto;
  currentPlayerColor: "W" | "B";
  state: "IN_PROGRESS" | "FINISHED" | "WHITE_WON" | "BLACK_WON" | "DRAW";
  activePieces: PositionDto[];
}

export type AiDifficulty =
    | "BEGINNER"
    | "EASY"
    | "MEDIUM"
    | "HARD"
    | "EXTREME";
