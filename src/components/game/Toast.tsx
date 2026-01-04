import { useEffect } from "react";
import { X } from "lucide-react";

interface ToastProps {
    message: string;
    type?: "error" | "success" | "info";
    onClose: () => void;
    duration?: number;
}

export function Toast({ message, type = "error", onClose, duration = 5000 }: ToastProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const bgColor = {
        error: "bg-red-500",
        success: "bg-green-500",
        info: "bg-blue-500",
    }[type];

    return (
        <div
            className={`
        fixed top-4 right-4 z-50
        ${bgColor}
        text-white
        px-6 py-4
        rounded-lg
        shadow-2xl
        flex items-center gap-3
        min-w-[300px] max-w-md
        animate-slideIn
      `}
        >
            <div className="flex-1">
                <p className="font-medium text-sm leading-relaxed">{message}</p>
            </div>
            <button
                onClick={onClose}
                className="
          flex-shrink-0
          hover:bg-white/20
          rounded-full
          p-1
          transition-colors
        "
                aria-label="Close notification"
            >
                <X size={18} />
            </button>
        </div>
    );
}