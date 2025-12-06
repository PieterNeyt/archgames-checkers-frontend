import { useParams } from "react-router-dom";

import { Board } from "@/components/Board";
import { useGameData } from "@/hooks/useGameData";

export const GamePage = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const { data: game, isLoading, error } = useGameData(gameId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center mt-10">
        <div className="text-xl">Loading game...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center mt-10">
        <div className="text-xl text-red-500">Error loading game</div>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="flex items-center justify-center mt-10">
        <div className="text-xl">Game not found</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-2xl font-bold mb-4">Checkers Game</h1>
      <div className="mb-4">
        <p className="text-lg">Current Turn: {game.currentPlayerColor}</p>
        <p className="text-lg">Status: {game.state}</p>
      </div>
      <Board board={game.board} />
    </div>
  );
};
