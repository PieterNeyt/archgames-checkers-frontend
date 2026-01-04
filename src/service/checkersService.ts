import axios from "axios";

import {AiDifficulty, GameDto} from "@/model/gameDto.ts";
import { MakeMoveRequest, MoveDto } from "@/model/moveDto.ts";

export async function startGameVsAi(
    sessionId: string,
    lobbyId: string,
    difficulty: AiDifficulty
): Promise<GameDto> {
  const { data } = await axios.post<GameDto>(
      `/api/checkers/${sessionId}/start-singleplayer`,
      null,
      {
        params: {
          lobbyId,
          difficulty
        }
      }
  );
  return data;
}


export async function startGameVsPlayer(
    sessionId: string,
    lobbyId: string
): Promise<GameDto> {
  const { data } = await axios.post<GameDto>(
      `/api/checkers/${sessionId}/start-multiplayer`,
      null,
      {
        params: {
          lobbyId
        }
      }
  );
  return data;
}

export async function getGame(gameId: string): Promise<GameDto> {
  const { data } = await axios.get<GameDto>(`/api/checkers/${gameId}`);
  return data;
}

export async function getValidMoves(
    gameId: string,
    row: number,
    col: number
): Promise<MoveDto[]> {
  const { data } = await axios.get<MoveDto[]>(
      `/api/checkers/${gameId}/valid-moves/${row}/${col}`
  );
  return data;
}

export async function makeMove(
    sessionId: string,
    gameId: string,
    request: MakeMoveRequest
): Promise<GameDto> {
  const { data } = await axios.post<GameDto>(
      `/api/checkers/${sessionId}/${gameId}/move`,
      request
  );
  return data;
}

export async function makeAiMove(gameId: string): Promise<GameDto> {
  const { data } = await axios.post<GameDto>(
      `/api/checkers/${gameId}/move/ai`
  );
  return data;
}