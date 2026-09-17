
"use client";

import Link from "next/link";
import { useEffect } from "react";

type ErrorPageProps = {
    error: Error & {
        digest?: string;
    };
    unstable_retry: () => void;
};

export default function ErrorPage({
    error,
    unstable_retry,
}: Readonly<ErrorPageProps>) {
    useEffect(() => {
        if (
            process.env.NODE_ENV === "development"
        ) {
            console.error(
                "Application route error:",
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
                    Something went wrong
                </h1>

                <p>
                    We could not load this page. Please try
                    again, or return to the home page.
                </p>

                {error.digest && (
                    <p className="small">
                        Reference ID: {error.digest}
                    </p>
                )}

                <div className="d-flex flex-wrap gap-2">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => unstable_retry()}
                    >
                        Try Again
                    </button>

                    <Link href="/">
                        Return Home
                    </Link>
                </div>
            </div>
        </main>
    );
}

// This catches runtime errors inside pages/components of a route segment. 
// Next.js wraps the route in an error boundary and shows the fallback UI when rendering throws.
// Example:

// export default function Page() {
//   throw new Error("API failed");
// }


// const data = undefined;

// return (
//   <div>
//     {data.name}
//   </div>
// );
