"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";

type SessionStatus =
    | "checking"
    | "authenticated"
    | "missing";

function subscribeToSession(): () => void {
    return () => { };
}

function getSessionSnapshot(): SessionStatus {
    const tcsToken =
        window.sessionStorage.getItem("clientid");

    const sbiAccessToken =
        window.sessionStorage.getItem("token");

    return tcsToken && sbiAccessToken
        ? "authenticated"
        : "missing";
}

function getServerSnapshot(): SessionStatus {
    return "checking";
}

export default function CgsBondPage() {
    const sessionStatus = useSyncExternalStore(
        subscribeToSession,
        getSessionSnapshot,
        getServerSnapshot
    );

    if (sessionStatus === "checking") {
        return (
            <section className="section-padding">
                <div className="container text-center">
                    <div
                        role="status"
                        aria-live="polite"
                        aria-busy="true"
                    >
                        <div
                            className="spinner-border text-primary"
                            aria-hidden="true"
                        />

                        <p className="mt-3 mb-0">
                            Verifying your SSO session...
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    if (sessionStatus === "missing") {
        return (
            <section className="section-padding">
                <div className="container">
                    <div
                        className="alert alert-danger"
                        role="alert"
                        aria-live="assertive"
                    >
                        <h1 className="h4">
                            SSO session is unavailable
                        </h1>

                        <p>
                            Please access this page through the
                            approved SSO link.
                        </p>

                        <Link href="/">
                            Return to Home
                        </Link>
                    </div>
                </div>
            </section >
        );
    }

    return (
        <section className="section-padding">
            <div className="container">
                <h1>CGS Bond</h1>

                <div
                    className="alert alert-success"
                    role="status"
                >
                    Your secure SSO session is ready.
                </div>

                <p>
                    The final CGS Bond content and functionality
                    will be implemented separately.
                </p>
            </div>
        </section>
    );
}


// http://localhost:3000/sso-page/cgs-bond/FyN3O0SslashmNdq9ydEbuqf0Aequal/light


// TCS token decoded
// → oauth/token called
// → SBI access token stored in sessionStorage
// → Redirect to /cgs-bond
// → “Your secure SSO session is ready” displayed