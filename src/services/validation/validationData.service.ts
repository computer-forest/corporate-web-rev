import { apiClient } from "@/services/api/apiClient";
import { decryptJunkData } from "@/services/security/decryption.service";

type JunkValueApiResponse = {
    status?: boolean | string;
    data?: string | string[];
    message?: string;
    messgae?: string;
};

let cachedJunkNames: string[] | null = null;

let pendingJunkNamesRequest: Promise<string[]> | null = null;

function getStoredClientId(): string {
    return (
        window.sessionStorage.getItem("clientid") ??
        window.localStorage.getItem("clientid") ??
        ""
    );
}

function normalizeJunkNames(values: unknown): string[] {
    if (!Array.isArray(values)) {
        return [];
    }

    return Array.from(
        new Set(
            values
                .filter(
                    (value): value is string =>
                        typeof value === "string"
                )
                .map((value) =>
                    value.trim().toLowerCase()
                )
                .filter(Boolean)
        )
    );
}

function parseJunkNames(
    responseData: JunkValueApiResponse,
    clientId: string
): string[] {
    if (Array.isArray(responseData.data)) {
        return normalizeJunkNames(
            responseData.data
        );
    }

    if (typeof responseData.data !== "string") {
        return [];
    }

    const rawData = responseData.data.trim();

    if (!rawData) {
        return [];
    }

    try {
        const parsedData = JSON.parse(rawData);
        return normalizeJunkNames(parsedData);
    } catch {
        const decryptedData = decryptJunkData(rawData, clientId);

        if (!decryptedData) {
            return [];
        }

        try {
            return normalizeJunkNames(JSON.parse(decryptedData));
        } catch {
            return [];
        }
    }
}

async function fetchJunkNames():
    Promise<string[]> {
    const clientId = getStoredClientId();

    if (!clientId) {
        return [];
    }

    const response =
        await apiClient.post<JunkValueApiResponse>(
            "masters/getjunkvalue",
            {
                flag: "Junkvalue",
            },
            {
                encrypt: true,
                decrypt: false,
                withCredentials: true,
            }
        );

    const responseData = response.data;

    const responseStatus = String(responseData.status).toLowerCase();

    if (responseStatus !== "true") {
        return [];
    }

    return parseJunkNames(
        responseData,
        clientId
    );
}

export function getJunkNames():
    Promise<string[]> {
    if (cachedJunkNames) {
        return Promise.resolve(
            cachedJunkNames
        );
    }

    if (pendingJunkNamesRequest) {
        return pendingJunkNamesRequest;
    }

    pendingJunkNamesRequest = fetchJunkNames()
            .then((junkNames) => {
                cachedJunkNames = junkNames;
                return junkNames;
            })
            .finally(() => {
                pendingJunkNamesRequest = null;
            });

    return pendingJunkNamesRequest;
}


// How Caching Works

// First form calls getJunkNames()
// → API request starts

// Another form calls while request is pending
// → Reuses the same Promise
// → No duplicate API request

// API succeeds
// → Normalized list cached in memory

// Future form calls
// → Cached list returned immediately

// Full browser refresh
// → Memory cache resets
// → API is called again