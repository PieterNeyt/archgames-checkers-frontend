import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { startGameVsAi, startGameVsPlayer } from "@/service/checkersService";

export function useCheckersGame(){
  const navigate = useNavigate();

  const startAiMutation = useMutation({
    mutationFn: startGameVsAi,
    onSuccess: (game) => {
      navigate(`/game/${game.gameId}`);
    },
  });

  const startPlayerMutation = useMutation({
    mutationFn: startGameVsPlayer,
    onSuccess: (game) => {
      navigate(`/game/${game.gameId}`);
    },
  });

  return {
    startAi: startAiMutation.mutate,
    startPlayer: startPlayerMutation.mutate,
    isStartingAi: startAiMutation.isPending,
    isStartingPlayer: startPlayerMutation.isPending,
  };
}
