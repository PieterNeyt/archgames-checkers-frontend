import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getValidMoves, makeAiMove, makeMove } from "@/service/checkersService";
import { MakeMoveRequest } from "@/model/moveDto";

export function useGameMoves(
  sessionId: string | undefined,
  gameId: string | undefined,
) {
  const queryClient = useQueryClient();

  const validMovesQuery = useQuery({
    queryKey: ["validMoves", gameId],
    queryFn: () => getValidMoves(gameId!, 0, 0),
    enabled: false,
  });

  const makeMoveMutation = useMutation({
    mutationFn: (
      request: MakeMoveRequest & { gameId: string; sessionId: string },
    ) => makeMove(request.sessionId, request.gameId, request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["game", gameId] });
    },
  });

  const makeAiMoveMutation = useMutation({
    mutationFn: (gameId: string) => makeAiMove(gameId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["game", gameId] });
    },
  });
  const fetchValidMoves = async (row: number, col: number) => {
    if (!gameId) return [];

    return await getValidMoves(gameId, row, col);
  };

  const executeMoveAction = (request: MakeMoveRequest) => {
    if (!gameId || !sessionId) return;
    makeMoveMutation.mutate({ ...request, gameId, sessionId });
  };

  const executeAiMoveAction = () => {
    if (!gameId || makeAiMoveMutation.isPending) return;
    makeAiMoveMutation.mutate(gameId);
  };

  return {
    fetchValidMoves,
    executeMove: executeMoveAction,
    executeAiMove: executeAiMoveAction,
    isMoving: makeMoveMutation.isPending,
    isAiMoving: makeAiMoveMutation.isPending,
    isSuccess: makeAiMoveMutation.isSuccess,
    validMovesQuery,
  };
}
