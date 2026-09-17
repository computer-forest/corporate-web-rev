
import type {
    DematAttributionData,
} from "@/types/demat/dematAccount.types";

function getQueryParam(
    searchParams: URLSearchParams,
    name: string,
    fallback = "NA"
): string {
    const value = searchParams.get(name)?.trim();

    return value || fallback;
}

function getEmptyAttributionData():
    DematAttributionData {
    return {
        Country_code: "NA",
        IP_location_country: "NA",
        IP_location_pincode: "NA",
        utm_term: "NA",
        utm_remark: "NA",
        utm_placement: "NA",
        utm_os: "NA",
        utm_medium: "NA",
        utm_keyword: "NA",
        utm_devicemodel: "NA",
        utm_creative: "NA",
        utm_content: "NA",
        utm_campaign: "NA",
        utm_adgroup: "NA",
        network: "NA",
        gclid: "NA",
        fbclid: "NA",
        Appflyer_ID: "NA",
        extension: "NA",
        ad_position: "NA",
        UTM_source: "NA",
    };
}

export function getDeviceType(): string {
    if (typeof navigator === "undefined") {
        return "";
    }

    const userAgent = navigator.userAgent;

    if (/tablet|ipad/i.test(userAgent)) {
        return "Tablet";
    }

    if (/mobile|iphone|android/i.test(userAgent)) {
        return "Mobile";
    }

    return "Desktop";
}

export function getDematAttributionData():
    DematAttributionData {
    if (typeof window === "undefined") {
        return getEmptyAttributionData();
    }

    const searchParams = new URLSearchParams(
        window.location.search
    );

    return {
        Country_code: getQueryParam(
            searchParams,
            "Country_code"
        ),

        IP_location_country: getQueryParam(
            searchParams,
            "IP_location_country"
        ),

        IP_location_pincode: getQueryParam(
            searchParams,
            "IP_location_pincode"
        ),

        utm_term: getQueryParam(
            searchParams,
            "utm_term"
        ),

        utm_remark: getQueryParam(
            searchParams,
            "utm_remarks"
        ),

        utm_placement: getQueryParam(
            searchParams,
            "utm_placement"
        ),

        utm_os: getQueryParam(
            searchParams,
            "utm_os"
        ),

        utm_medium: getQueryParam(
            searchParams,
            "utm_medium",
            window.location.pathname || "NA"
        ),

        utm_keyword: getQueryParam(
            searchParams,
            "utm_keyword"
        ),

        utm_devicemodel: getQueryParam(
            searchParams,
            "utm_devicemodel"
        ),

        utm_creative: getQueryParam(
            searchParams,
            "utm_creative"
        ),

        utm_content: getQueryParam(
            searchParams,
            "utm_content"
        ),

        utm_campaign: getQueryParam(
            searchParams,
            "utm_campaign"
        ),

        utm_adgroup: getQueryParam(
            searchParams,
            "utm_adgroup"
        ),

        network: getQueryParam(
            searchParams,
            "network"
        ),

        gclid: getQueryParam(
            searchParams,
            "gclid"
        ),

        fbclid: getQueryParam(
            searchParams,
            "fbclid"
        ),

        Appflyer_ID: getQueryParam(
            searchParams,
            "Appflyer_ID"
        ),

        extension: getQueryParam(
            searchParams,
            "extension"
        ),

        ad_position: getQueryParam(
            searchParams,
            "ad_position"
        ),

        UTM_source: getQueryParam(
            searchParams,
            "utm_source"
        ),
    };
}
