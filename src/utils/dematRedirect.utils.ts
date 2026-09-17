
import { appConfig } from "@/config/app.config";

import { encryptDiyRedirectValue } from "@/services/security/diyRedirectEncryption.service";

import type {
    DematAttributionData,
    DematLeadStatus,
} from "@/types/demat/dematAccount.types";

type BuildDematRedirectUrlOptions = {
    fullName: string;
    mobileNumber: string;
    status: DematLeadStatus;
    attribution: DematAttributionData;
};

function makeEncryptedValueUrlSafe(
    encryptedValue: string
): string {
    return encryptedValue
        .replace(/\//g, "/slash")
        .replace(/\+/g, "/plus")
        .replace(/==/g, "/equal");
}

function getRedirectParameter(
    value: string
): string {
    return value === "NA" ? "" : value;
}

export function buildDematRedirectUrl({
    fullName,
    mobileNumber,
    status,
    attribution,
}: BuildDematRedirectUrlOptions): string {
    const encryptedMobileNumber =
        makeEncryptedValueUrlSafe(
            encryptDiyRedirectValue(mobileNumber)
        );

    const encryptedFullName =
        makeEncryptedValueUrlSafe(
            encryptDiyRedirectValue(fullName)
        );

    const searchParams = new URLSearchParams({
        request: encryptedMobileNumber,
        name_submitted: encryptedFullName,

        utm_source: getRedirectParameter(
            attribution.UTM_source
        ),

        utm_medium: getRedirectParameter(
            attribution.utm_medium
        ),

        utm_campaign: getRedirectParameter(
            attribution.utm_campaign
        ),

        status,
    });

    return `${appConfig.dematRedirectUrl}?${searchParams.toString()}`;
}
