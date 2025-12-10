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
        <div className="flex flex-col gap-4 w-full max-w-xs">
            <button
                className="w-full px-6 py-3 bg-amber-700 text-white font-semibold rounded-xl shadow-lg hover:bg-amber-800 transition-colors disabled:opacity-50"
                disabled={isStartingAi || isStartingPlayer}
                onClick={onStartAi}
            >
                {isStartingAi ? "Starting..." : "Start Game vs AI"}
            </button>
            <button
                className="w-full px-6 py-3 bg-amber-500 text-white font-semibold rounded-xl shadow-lg hover:bg-amber-600 transition-colors disabled:opacity-50"
                disabled={isStartingAi || isStartingPlayer}
                onClick={onStartPlayer}
            >
                {isStartingPlayer ? "Starting..." : "Start Game vs Player"}
            </button>
        </div>
    );
}