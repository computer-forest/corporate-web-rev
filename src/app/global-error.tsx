
"use client";

import { useEffect } from "react";

type GlobalErrorPageProps = {
    error: Error & {
        digest?: string;
    };
    unstable_retry: () => void;
};

export default function GlobalErrorPage({
    error,
    unstable_retry,
}: Readonly<GlobalErrorPageProps>) {
    useEffect(() => {
        if (
            process.env.NODE_ENV === "development"
        ) {
            console.error(
                "Global application error:",
                error
            );
        }

        /*
         * TODO:
         * Send the error digest to the approved
         * production monitoring service later.
         */
    }, [error]);

    return (
        <html lang="en">
            <body>
                <main
                    id="main-content"
                    className="container py-5"
                    tabIndex={-1}
                >
                    <div
                        className="alert alert-danger"
                        role="alert"
                        aria-live="assertive"
                    >
                        <h1 className="h4">
                            The application could not be loaded
                        </h1>

                        <p>
                            We encountered an unexpected problem.
                            Please try loading the application again.
                        </p>

                        {error.digest && (
                            <p className="small">
                                Reference ID: {error.digest}
                            </p>
                        )}

                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => unstable_retry()}
                        >
                            Try Again
                        </button>
                    </div>
                </main>
            </body>
        </html>
    );
}




// 1- error.tsx
// → Handles errors inside routes and nested components
// → Uses the existing root layout

// 2- global-error.tsx
// → Handles errors in the root layout itself
// → Replaces the root layout
// → Must include html and bod

// This is the rare one.
// It catches errors involving the root layout/app shell itself, 
// because normal error.tsx cannot protect the root layout.
// Example:

// app/layout.tsx
// throw new Error(
//   "Layout crashed"
// );
// or 
{/* <AccessibilityProvider>
  crash...
</AccessibilityProvider> */}
// or s
{/* <ToastProvider>
  crash...
</ToastProvider> */}









