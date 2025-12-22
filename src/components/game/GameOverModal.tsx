import { Trophy, X } from "lucide-react";

import { GameDto } from "@/model/gameDto.ts";

interface GameOverModalProps {
  game: GameDto;
  onClose: () => void;
  onHome: () => void;
}

export function GameOverModal({ game, onClose, onHome }: GameOverModalProps) {
  const getGameOverMessage = () => {
    if (game.state === "WHITE_WON")
      return `${game.playerWhite.displayName} Wins!`;
    if (game.state === "BLACK_WON")
      return `${game.playerBlack.displayName} Wins!`;
    if (game.state === "DRAW") return "It's a Draw!";

    return "";
  };

  const isDraw = game.state === "DRAW";

  return (
    <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-[100] animate-in slide-in-from-top-10 fade-in duration-500">
      <div className="bg-white rounded-3xl shadow-2xl border-4 border-amber-300 p-8 max-w-md w-full mx-4 relative">
        <button
          aria-label="Close"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center">
          <div className="mb-6">
            {isDraw ? (
              <div className="text-7xl">🤝</div>
            ) : (
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg animate-bounce">
                <Trophy className="w-12 h-12 text-white" />
              </div>
            )}
          </div>

          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            {isDraw ? "Draw!" : "Victory!"}
          </h2>

          <p className="text-2xl font-semibold text-gray-800 mb-6">
            {getGameOverMessage()}
          </p>

          <div className="h-1 w-24 mx-auto bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mb-6" />

          <div className="flex gap-3">
            <button
              className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 text-lg font-bold rounded-xl shadow-lg hover:bg-gray-300 transition-all active:scale-95"
              onClick={onClose}
            >
              Stay Here
            </button>
            <button
              className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white text-lg font-bold rounded-xl shadow-lg hover:from-amber-700 hover:to-orange-700 transition-all active:scale-95"
              onClick={onHome}
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
