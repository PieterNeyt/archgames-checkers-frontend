export function GameInstructions({
  currentPlayerColor,
}: {
  currentPlayerColor: string;
}) {
  return (
    <div className="mt-6 bg-white rounded-2xl shadow-xl p-6 w-full max-w-2xl border-2 border-amber-200">
      <h2 className="text-2xl font-bold mb-4 text-amber-900 flex items-center gap-2">
        <span>📖</span>
        How to Play
      </h2>
      <div className="space-y-3">
        <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-50">
          <span className="text-xl">1️⃣</span>
          <p className="text-gray-700 flex-1">
            Click on one of your{" "}
            <span className="font-bold">
              {currentPlayerColor === "WHITE" ? "white" : "black"}
            </span>{" "}
            pieces to select it
          </p>
        </div>
        <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50">
          <span className="text-xl">2️⃣</span>
          <p className="text-gray-700 flex-1">
            <span className="font-bold text-green-600">Green highlights</span>{" "}
            show valid moves
          </p>
        </div>
        <div className="flex items-start gap-3 p-3 rounded-lg bg-red-50">
          <span className="text-xl">3️⃣</span>
          <p className="text-gray-700 flex-1">
            <span className="font-bold text-red-600">Red pulsing</span>{" "}
            highlights show mandatory jumps
          </p>
        </div>
        <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50">
          <span className="text-xl">4️⃣</span>
          <p className="text-gray-700 flex-1">
            Click on a highlighted square to preview your move
          </p>
        </div>
        <div className="flex items-start gap-3 p-3 rounded-lg bg-purple-50">
          <span className="text-xl">5️⃣</span>
          <p className="text-gray-700 flex-1">
            Confirm the move to complete your turn
          </p>
        </div>
      </div>
    </div>
  );
}
