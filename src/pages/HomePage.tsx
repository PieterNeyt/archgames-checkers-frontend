import { GameStart } from "@/components/GameStart";
import { useCheckersGame } from "@/hooks/useCheckersGame";

export const HomePage=  () => {
  const { startAi, startPlayer, isStartingAi, isStartingPlayer } =
    useCheckersGame();

  return (
    <div className="flex flex-col items-center mt-10">
      <GameStart
        isStartingAi={isStartingAi}
        isStartingPlayer={isStartingPlayer}
        onStartAi={startAi}
        onStartPlayer={startPlayer}
      />
    </div>
  );
};
