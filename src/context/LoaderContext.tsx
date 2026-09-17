
"use client";

import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
    type ReactNode,
} from "react";

type LoaderContextValue = {
    isLoading: boolean;
    showLoader: () => void;
    hideLoader: () => void;
};

const LoaderContext = createContext<LoaderContextValue | null>(null);

export function LoaderProvider({
    children,
}: Readonly<{
    children: ReactNode;
}>) {

    const [loadingCount, setLoadingCount] = useState(0);

    const isLoading = loadingCount > 0;


    const showLoader = useCallback(() => {
        setLoadingCount((current) => current + 1);
    }, []);


    const hideLoader = useCallback(() => {
        setLoadingCount((current) => Math.max(current - 1, 0));
    }, []);


    const value = useMemo(
        () => ({
            isLoading,
            showLoader,
            hideLoader,
        }),
        [isLoading, showLoader, hideLoader]
    );

    return (
        <LoaderContext.Provider value={value}>
            {children}
        </LoaderContext.Provider>
    );
}

export function useLoader() {
    const context = useContext(LoaderContext);

    if (!context) {
        throw new Error("useLoader must be used within LoaderProvider");
    }

    return context;
}
