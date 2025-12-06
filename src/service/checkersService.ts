import axios from "axios";

import { GameDto } from "@/model/gameDto.ts";

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
