import { MoveDto } from "@/model/moveDto";

interface MoveConfirmationBarProps {
  pendingMove: MoveDto;
  isMoving: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function MoveConfirmationBar({
  pendingMove,
  isMoving,
  onConfirm,
  onCancel,
}: MoveConfirmationBarProps) {
  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white p-6 rounded-2xl shadow-2xl border-2 border-amber-300 flex items-center gap-6 animate-in slide-in-from-bottom-10 fade-in duration-300 z-50 w-full max-w-xl mx-4">
      <div className="flex-1">
        <div className="text-lg font-bold text-gray-800 mb-1">
          Confirm your move?
        </div>
        {pendingMove.isJump && (
          <div className="inline-flex items-center gap-1 text-sm text-red-600 font-bold bg-red-50 px-3 py-1 rounded-full animate-pulse">
            <span>JUMP ATTACK!</span>
          </div>
        )}
      </div>
      <div className="flex gap-3">
        <button
          className="px-6 py-2.5 rounded-xl bg-gray-200 text-gray-700 hover:bg-gray-300 font-bold transition-all shadow-md hover:shadow-lg active:scale-95"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="px-8 py-2.5 rounded-xl bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 font-bold shadow-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isMoving}
          onClick={onConfirm}
        >
          {isMoving ? (
            <span className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Sending...
            </span>
          ) : (
            "✓ Confirm"
          )}
        </button>
      </div>
    </div>
  );
}
