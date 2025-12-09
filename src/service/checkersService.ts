import axios from "axios";

import { GameDto } from "@/model/gameDto.ts";
import { MakeMoveRequest, MoveDto } from "@/model/moveDto.ts";

export async function startGameVsAi(): Promise<GameDto> {
  const { data } = await axios.post<GameDto>("/api/checkers/start-ai");

  return data;
}

export async function startGameVsPlayer(): Promise<GameDto> {
  const { data } = await axios.post<GameDto>("/api/checkers/start-player");

  return data;
}

export async function getGame(gameId: string): Promise<GameDto> {
  const { data } = await axios.get<GameDto>(`/api/checkers/${gameId}`);

  return data;
}

export async function getValidMoves(
  gameId: string,
  row: number,
  col: number,
): Promise<MoveDto[]> {
  const { data } = await axios.get<MoveDto[]>(
    `/api/checkers/${gameId}/valid-moves/${row}/${col}`,
  );

  return data;
}

export async function makeMove(
  gameId: string,
  request: MakeMoveRequest,
): Promise<GameDto> {
  const { data } = await axios.post<GameDto>(
    `/api/checkers/${gameId}/move`,
    request,
  );

  return data;
}
