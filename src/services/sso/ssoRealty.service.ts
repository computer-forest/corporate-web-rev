import { apiClient } from "@/services/api/apiClient";

import type {SsoRealtyFormValues,} from "@/validations/forms/ssoRealtyForm.schema";

type SsoClientDetails = {
    mobileno?: string;
};

type SsoClientDetailsResponse = {
    status?: string;
    message?: string;
    messgae?: string;
    data?: SsoClientDetails[];
};

type GetSsoClientDetailsResult = {
    success: boolean;
    mobileNumber: string;
    message: string;
};

export type RealtyLocation = {
    id: number;
    name: string;
    count: string;
};

type RealtyLocationsResponse = {
    status?: string;
    message?: string;
    messgae?: string;
    data?: RealtyLocation[];
};

type GetRealtyLocationsResult = {
    success: boolean;
    locations: RealtyLocation[];
    message: string;
};

type RealtyCallbackRequest = {
    MobileNo: string;
    location: string;
    PropertyBudget: string;
    ClientID: string;
    source: string;
};

type RealtyCallbackApiResponse = {
    status?: string;
    message?: string;
    messgae?: string;
    data?: unknown;
};

export type RealtyCallbackResult = {
    success: boolean;
    recordAlreadyExists: boolean;
    message: string;
};

type SubmitRealtyCallbackOptions = {
    formValues: SsoRealtyFormValues;
    tcsToken: string;
    deviceType: string;
};

export async function getSsoClientDetails(
    tcsToken: string
): Promise<GetSsoClientDetailsResult> {
    const response =
        await apiClient.post<SsoClientDetailsResponse>(
            "sbirealty/getClientDetails",
            {
                ClientID: tcsToken,
            },
            {
                encrypt: true,
                decrypt: true,
                withCredentials: true,
            }
        );

    const responseData = response.data;

    const mobileNumber =
        responseData.data?.[0]?.mobileno?.trim() ?? "";

    if (
        responseData.status === "Success" &&
        mobileNumber
    ) {
        return {
            success: true,
            mobileNumber,
            message:
                "Client details retrieved successfully.",
        };
    }

    return {
        success: false,
        mobileNumber: "",
        message:
            responseData.message ??
            responseData.messgae ??
            "We could not retrieve your registered mobile number.",
    };
}

export async function getRealtyLocations():
    Promise<GetRealtyLocationsResult> {
    const response =
        await apiClient.post<RealtyLocationsResponse>(
            "sbirealty/getLocation",
            {},
            {
                encrypt: true,
                decrypt: true,
                withCredentials: true,
            }
        );

    const responseData = response.data;

    if (
        responseData.status !== "Success" ||
        !Array.isArray(responseData.data)
    ) {
        return {
            success: false,
            locations: [],
            message:
                responseData.message ??
                responseData.messgae ??
                "We could not retrieve the property locations.",
        };
    }

    const locations = responseData.data
        .filter(
            (location) =>
                typeof location.name === "string" &&
                location.name.trim().length > 0
        )
        .map((location) => ({
            ...location,
            name: location.name.trim(),
        }))
        .sort((firstLocation, secondLocation) =>
            firstLocation.name.localeCompare(
                secondLocation.name
            )
        );

    return {
        success: true,
        locations,
        message:
            "Property locations retrieved successfully.",
    };
}

export async function submitRealtyCallback({
    formValues,
    tcsToken,
    deviceType,
}: SubmitRealtyCallbackOptions): Promise<RealtyCallbackResult> {
    const requestPayload: RealtyCallbackRequest = {
        MobileNo: formValues.mobileNumber,
        location: formValues.propertyLocation,
        PropertyBudget: formValues.propertyBudget,
        ClientID: tcsToken,
        source: deviceType,
    };

    const response =
        await apiClient.post<RealtyCallbackApiResponse>(
            "sbirealty/requestCallback",
            requestPayload,
            {
                encrypt: true,
                decrypt: true,
                withCredentials: true,
            }
        );

    const responseData = response.data;

    const responseMessage =
        responseData.message ??
        responseData.messgae ??
        "";

    const recordAlreadyExists =
        responseMessage === "Record Already exist" ||
        responseMessage === "Downloads List Found";

    if (
        responseData.status === "Success" &&
        recordAlreadyExists
    ) {
        return {
            success: true,
            recordAlreadyExists: true,
            message:
                "Your request has already been registered. Our team will contact you.",
        };
    }

    if (responseData.status === "Success") {
        return {
            success: true,
            recordAlreadyExists: false,
            message:
                "Your callback request has been submitted successfully.",
        };
    }

    return {
        success: false,
        recordAlreadyExists: false,
        message:
            responseMessage ||
            "We could not submit your callback request. Please try again.",
    };
}