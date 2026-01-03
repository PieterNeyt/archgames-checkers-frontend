import { GameDto } from "@/model/gameDto.ts";

interface GameInfoPanelProps {
  game: GameDto;
  isGameOver: boolean;
}
export function GameInfoPanel({ game, isGameOver }: GameInfoPanelProps) {

  if (!game.playerWhite || !game.playerBlack) {
    return (
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 w-full max-w-2xl border-2 border-amber-200">
          <div className="text-center py-8">
            <div className="animate-pulse mb-4">
              <div className="w-16 h-16 rounded-full bg-amber-200 mx-auto mb-4" />
            </div>
            <p className="text-2xl font-bold text-amber-800 mb-2">
              Waiting for players...
            </p>
            <p className="text-gray-600">
              The game will start once another player joins
            </p>
          </div>
        </div>
    );
  }


  const { playerWhite, playerBlack } = game;


  return (
      <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 w-full max-w-2xl border-2 border-amber-200">
        <div className="grid grid-cols-2 gap-6">
          <div className="text-center p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl">
            <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-2">
              Current Turn
            </p>
            <div className="flex items-center justify-center gap-2">
              <div
                  className={`w-4 h-4 rounded-full ${
                      game.currentPlayerColor === "WHITE"
                          ? "bg-gray-100 border-2 border-gray-800"
                          : "bg-gray-800"
                  }`}
              />
              <p className="text-2xl font-bold text-amber-800">
                {game.currentPlayerColor}
              </p>
            </div>
          </div>

          <div className="text-center p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl">
            <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-2">
              Status
            </p>
            <p
                className={`text-2xl font-bold ${
                    isGameOver ? "text-red-600" : "text-green-600"
                }`}
            >
              {isGameOver ? "Game Over" : "In Progress"}
            </p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t-2 border-amber-100">
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center p-4 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100">
              <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-gray-800 mx-auto mb-2" />
              <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-1">
                White Player
              </p>
              <p className="text-lg font-bold text-gray-800">
                {playerWhite.displayName}
              </p>
            </div>

            <div className="text-center p-4 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900">
              <div className="w-8 h-8 rounded-full bg-gray-800 border-2 border-white mx-auto mb-2" />
              <p className="text-xs uppercase tracking-wide text-gray-300 font-semibold mb-1">
                Black Player
              </p>
              <p className="text-lg font-bold text-white">
                {playerBlack.displayName}
              </p>
            </div>
          </div>
        </div>
      </div>
  );
}
