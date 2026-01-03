import { useState, useCallback } from "react";

export interface ToastOptions {
    message: string;
    type?: "error" | "success" | "info";
    duration?: number;
}

export function useToast() {
    const [toast, setToast] = useState<ToastOptions | null>(null);

    const showToast = useCallback((options: ToastOptions) => {
        setToast(options);
    }, []);

    const hideToast = useCallback(() => {
        setToast(null);
    }, []);

    const showError = useCallback((message: string) => {
        showToast({ message, type: "error" });
    }, [showToast]);

    const showSuccess = useCallback((message: string) => {
        showToast({ message, type: "success" });
    }, [showToast]);

    const showInfo = useCallback((message: string) => {
        showToast({ message, type: "info" });
    }, [showToast]);

    return {
        toast,
        showToast,
        hideToast,
        showError,
        showSuccess,
        showInfo,
    };
}