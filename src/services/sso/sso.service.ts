import { apiClient } from "@/services/api/apiClient";

type SsoTokenApiResponse = {
    status?: string;
    data?: string;
    message?: string;
    messgae?: string;
};

type GenerateSsoTokenResult = {
    success: boolean;
    token?: string;
    message: string;
};

export async function generateSsoToken(
    clientId: string
): Promise<GenerateSsoTokenResult> {
    const response =
        await apiClient.post<SsoTokenApiResponse>(
            "oauth/token",
            {
                client_id: clientId,
            },
            {
                encrypt: true,
                decrypt: true,
                withCredentials: true,
            }
        );

    const responseData = response.data;

    if (
        responseData.status === "Success" &&
        typeof responseData.data === "string" &&
        responseData.data.length > 0
    ) {
        return {
            success: true,
            token: responseData.data,
            message:
                "SSO session initialized successfully.",
        };
    }

    return {
        success: false,
        message:
            responseData.message ??
            responseData.messgae ??
            "We could not initialize the SSO session.",
    };
}