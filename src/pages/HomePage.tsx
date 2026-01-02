import { GameStart } from "@/components/game/GameStart.tsx";
import { useCheckersGame } from "@/hooks/useCheckersGame";
import { useParams } from "react-router-dom";

export function HomePage() {
    const { sessionId, lobbyId } = useParams<{ sessionId: string; lobbyId: string }>();

    const { startAi, startPlayer, isStartingAi, isStartingPlayer } =
        useCheckersGame(sessionId!, lobbyId!);

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
            <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 animate-bgShift">
                {Array.from({ length: 64 }).map((_, idx) => {
                    const row = Math.floor(idx / 8);
                    const col = idx % 8;
                    const isDark = (row + col) % 2 === 1;

                    return (
                        <div
                            key={idx}
                            className={`w-full h-full ${
                                isDark ? "bg-amber-700/20" : "bg-amber-100/20"
                            }`}
                        />
                    );
                })}
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center gap-6 p-10 bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-amber-200">
                <h1 className="text-5xl font-extrabold text-amber-900 drop-shadow-lg">
                    Checkers
                </h1>
                <p className="text-gray-700 text-lg text-center max-w-md">
                    Choose the gamemode and challenge yourself with an exciting game of
                    checkers!
                </p>
                <GameStart
                    isStartingAi={isStartingAi}
                    isStartingPlayer={isStartingPlayer}
                    onStartAi={startAi}
                    onStartPlayer={startPlayer}
                />
            </div>
        </div>
    );
}