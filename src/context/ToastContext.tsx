
"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react";

import {
    registerToastHandler,
} from "@/services/toast/toast.service";

export type ToastType =
    | "success"
    | "error"
    | "info"
    | "warning";

export type ToastItem = {
    id: number;
    message: string;
    type: ToastType;
};

type ToastContextValue = {
    toasts: ToastItem[];
    showToast: (
        message: string,
        type: ToastType
    ) => void;
    removeToast: (id: number) => void;
};

const ToastContext =
    createContext<ToastContextValue | null>(null);

export function ToastProvider({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    const [toasts, setToasts] = useState<
        ToastItem[]
    >([]);

    const removeToast = useCallback((id: number) => {
        setToasts((currentToasts) =>
            currentToasts.filter(
                (toast) => toast.id !== id
            )
        );
    }, []);


    const showToast = useCallback(
        (
            message: string,
            type: ToastType
        ) => {
            setToasts((currentToasts) => {
                const existingToast = currentToasts.find(
                    (toast) =>
                        toast.message === message &&
                        toast.type === type
                );

                if (existingToast) {
                    return currentToasts;
                }

                const id = Date.now();

                return [
                    ...currentToasts,
                    {
                        id,
                        message,
                        type,
                    },
                ];
            });
        },
        []
    );


    useEffect(() => {
        registerToastHandler(showToast);
    }, [showToast]);

    const value = useMemo(
        () => ({
            toasts,
            showToast,
            removeToast,
        }),
        [toasts, showToast, removeToast]
    );

    return (
        <ToastContext.Provider value={value}>
            {children}
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error(
            "useToast must be used within ToastProvider"
        );
    }

    return context;
}
