import { useQuery } from "@tanstack/react-query";

import { getGame } from "@/service/checkersService";

export function useGameData(gameId: string | undefined) {
  return useQuery({
    queryKey: ["game", gameId],
    queryFn: () => getGame(gameId!),
    enabled: !!gameId,
    refetchInterval: 2000,
    refetchIntervalInBackground: true,
  });
}
