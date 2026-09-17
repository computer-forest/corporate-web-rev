
import type { ToastType } from "@/context/ToastContext";

let toastHandler:
    | ((
        message: string,
        type: ToastType
    ) => void)
    | null = null;

export function registerToastHandler(
    handler: (
        message: string,
        type: ToastType
    ) => void
) {
    toastHandler = handler;
}

export function showToast(
    message: string,
    type: ToastType
) {
    toastHandler?.(message, type);
}

export function showSuccessToast(
    message: string
) {
    showToast(message, "success");
}

export function showErrorToast(
    message: string
) {
    showToast(message, "error");
}

export function showInfoToast(
    message: string
) {
    showToast(message, "info");
}

export function showWarningToast(
    message: string
) {
    showToast(message, "warning");
}
