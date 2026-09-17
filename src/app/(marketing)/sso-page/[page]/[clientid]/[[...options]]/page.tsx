"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { getApiErrorMessage } from "@/services/api/apiErrorHandler";
import { generateSsoToken } from "@/services/sso/sso.service";

type SsoRouteParams = {
    page: string;
    clientid: string;
    options?: string[];
};

const ALLOWED_SSO_DESTINATIONS: Record<
    string,
    string
> = {
    "sso-realty": "/sso-realty",
    "cgs-bond": "/cgs-bond",
};

function decodeTcsToken(
    encodedTcsToken: string
): string {
    return decodeURIComponent(encodedTcsToken)
        .replace(/slash/g, "/")
        .replace(/plus/g, "+")
        .replace(/equal/g, "==");
}

function detectDeviceType(): string {
    const userAgent = window.navigator.userAgent;

    if (/tablet|ipad/i.test(userAgent)) {
        return "Tablet";
    }

    if (/mobile|iphone|android/i.test(userAgent)) {
        return "Mobile";
    }

    return "Web/Desktop";
}

export default function SsoBridgePage() {
    const params = useParams<SsoRouteParams>();
    const router = useRouter();

    const hasStarted = useRef(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (hasStarted.current) {
            return;
        }

        hasStarted.current = true;

        const initializeSso = async () => {
            try {
                const destinationSlug = params.page;
                const encodedTcsToken = params.clientid;

                const theme =
                    params.options?.[0] || "light";

                const deviceType =
                    params.options?.[1] ||
                    detectDeviceType();

                const destination =
                    ALLOWED_SSO_DESTINATIONS[
                    destinationSlug
                    ];

                if (!destination) {
                    setError(
                        "The requested SSO destination is not supported."
                    );

                    return;
                }

                if (!encodedTcsToken) {
                    setError(
                        "The SSO token is missing."
                    );

                    return;
                }

                const tcsToken =
                    decodeTcsToken(encodedTcsToken);

                if (!tcsToken) {
                    setError(
                        "The SSO token is invalid."
                    );

                    return;
                }

                /*
                 * Keep the legacy storage keys because the
                 * existing Axios interceptor and destination
                 * pages currently depend on them.
                 *
                 * clientid-encoded → Encoded TCS token
                 * clientid         → Decoded TCS token
                 * token            → SBI access token
                 */
                window.sessionStorage.setItem(
                    "clientid-encoded",
                    encodedTcsToken
                );

                window.sessionStorage.setItem(
                    "clientid",
                    tcsToken
                );

                window.sessionStorage.setItem(
                    "theme",
                    theme
                );

                window.sessionStorage.setItem(
                    "DeviceType",
                    deviceType
                );

                window.sessionStorage.removeItem(
                    "token"
                );

                const tokenResult =
                    await generateSsoToken(tcsToken);

                if (
                    !tokenResult.success ||
                    !tokenResult.token
                ) {
                    setError(tokenResult.message);

                    return;
                }

                const sbiAccessToken =
                    tokenResult.token;

                window.sessionStorage.setItem(
                    "token",
                    sbiAccessToken
                );

                router.replace(destination);
            } catch (error: unknown) {
                setError(getApiErrorMessage(error));
            }
        };

        void initializeSso();
    }, [params, router]);

    if (error) {
        return (
            <section className="section-padding">
                <div className="container">
                    <div
                        className="alert alert-danger"
                        role="alert"
                        aria-live="assertive"
                    >
                        <h1 className="h4">
                            SSO session could not be initialized
                        </h1>

                        <p>{error}</p>

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

                    <h1 className="h4 mt-3">
                        Initializing secure SSO session
                    </h1>

                    <p className="mb-0">
                        Please wait while we securely redirect
                        you.
                    </p>
                </div>
            </div>
        </section>
    );
}

// this works only like this
// http://localhost:3000/sso-page/sso-realty/FyN3O0SslashmNdq9ydEbuqf0Aequal/light
// https://www.sbisecurities.in/sso-page/sso-realty/FyN3O0SslashmNdq9ydEbuqf0Aequal/light

// This works ✅
// SSO bridge:
// https://www.sbisecurities.in/sso-page/sso-realty/<clientid>/light
// Destination:
// https://www.sbisecurities.in/sso-realty

// These do not work ❌
// Different subdomain
// Bridge:
// https://www.sbisecurities.in/sso-page/...
// Destination:
// https://realty.sbisecurities.in/

// these 3 should be same
// Protocol: https
// Hostname: www.sbisecurities.in
// Port: 443 (implicit HTTPS port)


// decrypt folder 
// page → sso-realty
// clientid → FyN3O0SslashmNdq9ydEbuqf0Aequal
// options → ["light"]


// this file performs
// Validate page against allowed destinations
// → Decode TCS token
// → Save decoded TCS token in sessionStorage
// → Save theme/device in sessionStorage
// → Remove any previous SBI access token
// → Call generateSsoToken()


// Post-login application
//         ↓
// Generic SSO bridge URL
//         ↓
// Decode TCS token
//         ↓
// oauth/token
//         ↓
// Store SBI access token in sessionStorage
//         ↓
// Redirect to /sso-realty
//         ↓
// Verify session
//         ↓
// getClientDetails + getLocation
//         ↓
// Render SsoRealtyForm
//         ↓
// React Hook Form
//         ↓
// Zod validation
//         ↓
// requestCallback API
//         ↓
// Toast result