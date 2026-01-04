import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { getValidMoves, makeAiMove, makeMove } from "@/service/checkersService";
import { MakeMoveRequest } from "@/model/moveDto";

export function useGameMoves(
    sessionId: string | undefined,
    gameId: string | undefined,
    onError?: (message: string) => void
) {
  const queryClient = useQueryClient();

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
    onError: handleError,
  });

  const makeAiMoveMutation = useMutation({
    mutationFn: (gameId: string) => makeAiMove(gameId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["game", gameId] });
    },
    onError: handleError,
  });

  const fetchValidMoves = async (row: number, col: number) => {
    if (!gameId) return [];

    try {
      return await getValidMoves(gameId, row, col);
    } catch (error) {
      handleError(error);
      return [];
    }
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