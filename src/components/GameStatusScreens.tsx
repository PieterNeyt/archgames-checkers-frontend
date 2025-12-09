import { useNavigate } from "react-router-dom";

export function LoadingScreen() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
      <div className="text-center">
        <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-amber-600 border-r-transparent mb-4" />
        <div className="text-2xl font-semibold text-amber-800">
          Loading game...
        </div>
      </div>
    </div>
  );
}

export function ErrorScreen({ hasError }: { hasError: boolean }) {
  const navigate = useNavigate();

  const title = hasError ? "Error Loading Game" : "Game Not Found";
  const icon = hasError ? "❌" : "🔍";
  const bgClass = hasError
    ? "from-red-50 to-red-100"
    : "from-gray-50 to-gray-100";
  const btnClass = hasError
    ? "bg-red-600 hover:bg-red-700"
    : "bg-gray-600 hover:bg-gray-700";

  return (
    <div
      className={`flex items-center justify-center min-h-screen bg-gradient-to-br ${bgClass}`}
    >
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md">
        <div className="text-center">
          <div className="text-6xl mb-4">{icon}</div>
          <div
            className={`text-2xl font-bold mb-4 ${hasError ? "text-red-600" : "text-gray-600"}`}
          >
            {title}
          </div>
          <button
            className={`px-6 py-3 text-white rounded-lg font-semibold transition-colors ${btnClass}`}
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
