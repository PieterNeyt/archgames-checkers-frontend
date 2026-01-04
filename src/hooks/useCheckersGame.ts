import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { startGameVsAi, startGameVsPlayer } from "@/service/checkersService";
import { AiDifficulty } from "@/model/gameDto.ts";

export function useCheckersGame(
    sessionId: string,
    lobbyId: string,
    onError?: (message: string) => void
) {
  const navigate = useNavigate();

  const handleError = (error: unknown) => {
    let errorMessage = "An unexpected error occurred";
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    if (onError) {
      onError(errorMessage);
    }
  };

  const startAiMutation = useMutation({
    mutationFn: (difficulty: AiDifficulty) =>
        startGameVsAi(sessionId, lobbyId, difficulty),
    onSuccess: (game) => {
      navigate(`/${lobbyId}/${sessionId}/play/${game.gameId}`);
    },
    onError: handleError,
  });

  const startPlayerMutation = useMutation({
    mutationFn: () => startGameVsPlayer(sessionId, lobbyId),
    onSuccess: (game) => {
      navigate(`/${lobbyId}/${sessionId}/play/${game.gameId}`);
    },
    onError: handleError,
  });

  return {
    startAi: startAiMutation.mutate,
    startPlayer: startPlayerMutation.mutate,
    isStartingAi: startAiMutation.isPending,
    isStartingPlayer: startPlayerMutation.isPending,
    error: startAiMutation.error || startPlayerMutation.error,
  };
}