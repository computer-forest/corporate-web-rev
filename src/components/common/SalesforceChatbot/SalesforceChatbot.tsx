"use client";

import Script from "next/script";
import {
    useCallback,
    useEffect,
    useRef,
} from "react";

import { salesforceChatbotConfig } from "@/config/salesforceChatbot.config";

type SalesforceConversationEntry = {
    entryType?: string;
    sessionStatus?: string;
    sessionEndedByRole?: string;
    entries?: Array<{
        operation?: string;
        participant?: {
            role?: string;
        };
    }>;
};

type SalesforceMessagingEventDetail = {
    conversationEntry?: {
        entryPayload?: string;
    };
};

type SalesforceMessagingEvent =
    CustomEvent<SalesforceMessagingEventDetail>;

type SalesforceBootstrap = {
    settings: {
        language?: string;
        shouldShowParticipantChgEvntInConvHist?: boolean;
    };

    userVerificationAPI?: {
        clearSession: (
            shouldEndSession: boolean
        ) => Promise<void>;
    };

    prechatAPI?: {
        setHiddenPrechatFields: (
            fields: Record<string, string>
        ) => void;
    };

    init: (
        organizationId: string,
        deploymentName: string,
        deploymentUrl: string,
        options: {
            scrt2URL: string;
        }
    ) => void;
};

declare global {
    interface Window {
        embeddedservice_bootstrap?: SalesforceBootstrap;
    }
}

function parseConversationEntry(
    event: SalesforceMessagingEvent
): SalesforceConversationEntry | null {
    const entryPayload =
        event.detail?.conversationEntry?.entryPayload;

    if (!entryPayload) {
        return null;
    }

    try {
        return JSON.parse(
            entryPayload
        ) as SalesforceConversationEntry;
    } catch {
        return null;
    }
}

async function clearMessagingSession():
    Promise<void> {
    const userVerificationApi =
        window.embeddedservice_bootstrap
            ?.userVerificationAPI;

    if (!userVerificationApi) {
        return;
    }

    try {
        await userVerificationApi.clearSession(
            true
        );
    } catch {
        /*
         * Salesforce failure should not interrupt
         * the rest of the marketing website.
         */
    }
}

export default function SalesforceChatbot() {
    const isInitialized = useRef(false);

    const agentClosedConversation =
        useRef(false);

    const handleMessagingReady =
        useCallback(() => {
            void clearMessagingSession();

            window.embeddedservice_bootstrap
                ?.prechatAPI
                ?.setHiddenPrechatFields(
                    salesforceChatbotConfig
                        .hiddenPreChatFields
                );
        }, []);

    const handleParticipantChanged =
        useCallback((event: Event) => {
            const conversationEntry =
                parseConversationEntry(
                    event as SalesforceMessagingEvent
                );

            const firstEntry =
                conversationEntry?.entries?.[0];

            if (
                firstEntry?.participant?.role ===
                "Agent" &&
                firstEntry.operation === "remove"
            ) {
                agentClosedConversation.current =
                    true;
            }
        }, []);

    const handleConversationClosed =
        useCallback(() => {
            if (
                agentClosedConversation.current
            ) {
                agentClosedConversation.current =
                    false;

                return;
            }

            void clearMessagingSession();
        }, []);

    const handleSessionStatusUpdate =
        useCallback((event: Event) => {
            const conversationEntry =
                parseConversationEntry(
                    event as SalesforceMessagingEvent
                );

            if (
                conversationEntry?.entryType ===
                "SessionStatusChanged" &&
                conversationEntry.sessionStatus ===
                "Ended" &&
                conversationEntry
                    .sessionEndedByRole === "Agent"
            ) {
                agentClosedConversation.current =
                    true;
            }
        }, []);

    useEffect(() => {
        window.addEventListener(
            "onEmbeddedMessagingReady",
            handleMessagingReady
        );

        window.addEventListener(
            "onEmbeddedMessagingConversationParticipantChanged",
            handleParticipantChanged
        );

        window.addEventListener(
            "onEmbeddedMessagingConversationClosed",
            handleConversationClosed
        );

        window.addEventListener(
            "onEmbeddedMessagingSessionStatusUpdate",
            handleSessionStatusUpdate
        );

        return () => {
            window.removeEventListener(
                "onEmbeddedMessagingReady",
                handleMessagingReady
            );

            window.removeEventListener(
                "onEmbeddedMessagingConversationParticipantChanged",
                handleParticipantChanged
            );

            window.removeEventListener(
                "onEmbeddedMessagingConversationClosed",
                handleConversationClosed
            );

            window.removeEventListener(
                "onEmbeddedMessagingSessionStatusUpdate",
                handleSessionStatusUpdate
            );
        };
    }, [
        handleConversationClosed,
        handleMessagingReady,
        handleParticipantChanged,
        handleSessionStatusUpdate,
    ]);

    const initializeChatbot =
        useCallback(() => {
            if (isInitialized.current) {
                return;
            }

            const embeddedMessaging =
                window.embeddedservice_bootstrap;

            if (!embeddedMessaging) {
                return;
            }

            try {
                embeddedMessaging.settings.language =
                    salesforceChatbotConfig.language;

                embeddedMessaging.settings
                    .shouldShowParticipantChgEvntInConvHist =
                    false;

                embeddedMessaging.init(
                    salesforceChatbotConfig
                        .organizationId,
                    salesforceChatbotConfig
                        .deploymentName,
                    salesforceChatbotConfig
                        .deploymentUrl,
                    {
                        scrt2URL:
                            salesforceChatbotConfig
                                .scrt2Url,
                    }
                );

                isInitialized.current = true;
            } catch {
                /*
                 * Chatbot initialization failure must
                 * not prevent the website from loading.
                 */
            }
        }, []);

    return (
        <Script
            id="salesforce-embedded-messaging"
            src={
                salesforceChatbotConfig.scriptUrl
            }
            strategy="lazyOnload"
            onReady={initializeChatbot}
            onError={() => {
                /*
                 * Keep the website usable when
                 * Salesforce is unavailable.
                 */
            }}
        />
    );
}


// Hi Team,

// The Salesforce Embedded Messaging deployment is loading, but its configuration API is rejecting the Next.js local origin with a CORS error.

// Deployment:
// SFDC_Test_ESD

// Salesforce SCRT domain:
// https://sbicapsec.my.salesforce-scrt.com

// Please add/verify these approved website origins in the Embedded Messaging deployment CORS/trusted-domain configuration:

// http://localhost:3000
// https://awsuat.sbisecurities.in
// https://www.sbisecurities.in

// Current blocked origin:
// http://localhost:3000

// Please confirm once the deployment configuration is published.