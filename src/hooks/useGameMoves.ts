import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {getValidMoves, makeAiMove, makeMove} from "@/service/checkersService";
import { MakeMoveRequest } from "@/model/moveDto";

export function useGameMoves(gameId: string | undefined) {
  const queryClient = useQueryClient();

  const validMovesQuery = useQuery({
    queryKey: ["validMoves", gameId],
    queryFn: () => getValidMoves(gameId!, 0, 0),
    enabled: false,
  });

  const makeMoveMutation = useMutation({
    mutationFn: (request: MakeMoveRequest & { gameId: string }) =>
        makeMove(request.gameId, request),
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
    if (!gameId) return;
    makeMoveMutation.mutate({ ...request, gameId });
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
