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
  profileId: string;
  sessionId: string;
}

export interface PositionDto {
  row: number;
  col: number;
}

export interface GameDto {
  gameId: string;
  board: BoardDto;
  playerWhite: PlayerDto | null;
  playerBlack: PlayerDto | null;
  currentPlayerColor: "WHITE" | "BLACK";
  state: "IN_PROGRESS" | "FINISHED" | "WHITE_WON" | "BLACK_WON" | "DRAW" | "WAITING_FOR_OPPONENT";
  activePieces: PositionDto[];
}

export type AiDifficulty = "BEGINNER" | "EASY" | "MEDIUM" | "HARD" | "EXTREME";