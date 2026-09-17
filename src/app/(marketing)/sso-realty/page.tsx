"use client";

import Link from "next/link";
import {
    useEffect,
    useRef,
    useState,
} from "react";

import SsoRealtyForm from "@/components/forms/SsoRealtyForm/SsoRealtyForm";

import { getApiErrorMessage } from "@/services/api/apiErrorHandler";
import {
    getRealtyLocations,
    getSsoClientDetails,
    type RealtyLocation,
} from "@/services/sso/ssoRealty.service";

type PageStatus =
    | "loading"
    | "authenticated"
    | "missing-session"
    | "error";

export default function SsoRealtyPage() {
    const hasStarted = useRef(false);

    const [pageStatus, setPageStatus] =
        useState<PageStatus>("loading");

    const [mobileNumber, setMobileNumber] =
        useState("");

    const [tcsToken, setTcsToken] =
        useState("");

    const [deviceType, setDeviceType] =
        useState("Web/Desktop");

    const [locations, setLocations] =
        useState<RealtyLocation[]>([]);

    const [errorMessage, setErrorMessage] =
        useState("");

    useEffect(() => {
        if (hasStarted.current) {
            return;
        }

        hasStarted.current = true;

        const loadRealtyPageData = async () => {
            const storedTcsToken =
                window.sessionStorage.getItem(
                    "clientid"
                );

            const sbiAccessToken =
                window.sessionStorage.getItem(
                    "token"
                );

            const storedDeviceType =
                window.sessionStorage.getItem(
                    "DeviceType"
                ) || "Web/Desktop";

            if (
                !storedTcsToken ||
                !sbiAccessToken
            ) {
                setPageStatus("missing-session");
                return;
            }

            try {
                const [
                    clientDetailsResult,
                    locationsResult,
                ] = await Promise.all([
                    getSsoClientDetails(
                        storedTcsToken
                    ),
                    getRealtyLocations(),
                ]);

                if (!clientDetailsResult.success) {
                    setErrorMessage(
                        clientDetailsResult.message
                    );

                    setPageStatus("error");
                    return;
                }

                if (!locationsResult.success) {
                    setErrorMessage(
                        locationsResult.message
                    );

                    setPageStatus("error");
                    return;
                }

                setTcsToken(storedTcsToken);

                setDeviceType(storedDeviceType);

                setMobileNumber(
                    clientDetailsResult.mobileNumber
                );

                setLocations(
                    locationsResult.locations
                );

                setPageStatus("authenticated");
            } catch (error: unknown) {
                setErrorMessage(
                    getApiErrorMessage(error)
                );

                setPageStatus("error");
            }
        };

        void loadRealtyPageData();
    }, []);

    if (pageStatus === "loading") {
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
                            Loading SBI Realty
                        </h1>

                        <p className="mb-0">
                            Please wait while we retrieve your
                            registered details and property
                            locations.
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    if (pageStatus === "missing-session") {
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

                        <Link href="/" >
                            Return to Home
                        </Link>
                    </div>
                </div>
            </section >
        );
    }

    if (pageStatus === "error") {
        return (
            <section className="section-padding">
                <div className="container">
                    <div
                        className="alert alert-danger"
                        role="alert"
                        aria-live="assertive"
                    >
                        <h1 className="h4">
                            SBI Realty could not be loaded
                        </h1>

                        <p>
                            {errorMessage ||
                                "Please try accessing the Realty page again through the approved SSO link."}
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
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6">
                        <h1>SBI Realty</h1>

                        <p className="mb-4">
                            Enter your property requirements and
                            request a callback from our Realty
                            team.
                        </p>

                        <SsoRealtyForm
                            mobileNumber={mobileNumber}
                            locations={locations}
                            tcsToken={tcsToken}
                            deviceType={deviceType}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}