interface Props {
  onStartAi: () => void;
  onStartPlayer: () => void;
  isStartingAi?: boolean;
  isStartingPlayer?: boolean;
}

export function GameStart({
  onStartAi,
  onStartPlayer,
  isStartingAi,
  isStartingPlayer,
}: Props) {
  return (
    <div className="flex flex-col items-center gap-4 mt-10">
      <h1 className="text-3xl font-bold">Checkers</h1>
      <button
        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        disabled={isStartingAi || isStartingPlayer}
        onClick={onStartAi}
      >
        {isStartingAi ? "Starting..." : "Start Game vs AI"}
      </button>
      <button
        className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
        disabled={isStartingAi || isStartingPlayer}
        onClick={onStartPlayer}
      >
        {isStartingPlayer ? "Starting..." : "Start Game vs Player"}
      </button>
    </div>
  );
}
