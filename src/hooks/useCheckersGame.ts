import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { startGameVsAi, startGameVsPlayer } from "@/service/checkersService";
import {AiDifficulty} from "@/model/gameDto.ts";

export function useCheckersGame(sessionId: string) {
  const navigate = useNavigate();

  const startAiMutation = useMutation({
    mutationFn: (difficulty: AiDifficulty) =>
        startGameVsAi(sessionId, difficulty),
    onSuccess: (game) => navigate(`/game/${game.gameId}`),
  });


  const startPlayerMutation = useMutation({
    mutationFn: () => startGameVsPlayer(sessionId),
    onSuccess: (game) => navigate(`/game/${game.gameId}`),
  });

  return {
    startAi: startAiMutation.mutate,
    startPlayer: startPlayerMutation.mutate,
    isStartingAi: startAiMutation.isPending,
    isStartingPlayer: startPlayerMutation.isPending,
  };
}
