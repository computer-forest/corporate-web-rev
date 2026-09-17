
import { apiClient } from "@/services/api/apiClient";

import type {
  DematAccountFormValues,
} from "@/validations/forms/dematAccountForm.schema";

import type {
  DematAttributionData,
  DematLeadApiData,
  DematLeadRequest,
  DematLeadStatus,
  DematLeadSubmissionResult,
} from "@/types/demat/dematAccount.types";

type SubmitDematLeadOptions = {
  formValues: DematAccountFormValues;
  attribution: DematAttributionData;
  landingPageLink: string;
  deviceType: string;
};

function getResponseMessage(
  responseData: DematLeadApiData
): string {
  return (
    responseData.messgae ??
    responseData.message ??
    ""
  );
}

function getDematLeadStatus(
  responseData: DematLeadApiData
): DematLeadStatus | undefined {
  const responseStatus = String(
    responseData.status
  ).toLowerCase();

  const responseMessage =
    getResponseMessage(responseData);

  if (
    responseStatus === "true" &&
    responseMessage === "Otp inserted"
  ) {
    return "valid";
  }

  if (
    responseStatus === "true" &&
    responseMessage ===
      "Your Mobile OTP request limit is exhausted, please retry to log in after 15 minutes"
  ) {
    return "exhausted";
  }

  if (
    responseStatus === "false" &&
    responseMessage === "Internal server error"
  ) {
    return "internal_server_error";
  }

  return undefined;
}

export async function submitDematLead({
  formValues,
  attribution,
  landingPageLink,
  deviceType,
}: SubmitDematLeadOptions): Promise<DematLeadSubmissionResult> {
  const requestPayload: DematLeadRequest = {
    flag: "SaveLandingpagedetails",
    Mobile_number: formValues.mobileNumber,
    name_submitted: formValues.fullName,
    Entry_type: "Manual",
    Country_code: attribution.Country_code,
    IP_location_country:
      attribution.IP_location_country,
    IP_location_pincode:
      attribution.IP_location_pincode,
    Tabout_count: "NA",
    LP_link: landingPageLink,
    utm_term: attribution.utm_term,
    utm_remark: attribution.utm_remark,
    utm_placement: attribution.utm_placement,
    utm_os: attribution.utm_os,
    utm_medium: attribution.utm_medium,
    utm_keyword: attribution.utm_keyword,
    utm_devicemodel:
      attribution.utm_devicemodel,
    utm_creative: attribution.utm_creative,
    utm_content: attribution.utm_content,
    utm_campaign: attribution.utm_campaign,
    utm_adgroup: attribution.utm_adgroup,
    network: attribution.network,
    gclid: attribution.gclid,
    fbclid: attribution.fbclid,
    Appflyer_ID: attribution.Appflyer_ID,
    extension: attribution.extension,
    ad_position: attribution.ad_position,
    UTM_source: attribution.UTM_source,
    Device_type: deviceType,
  };

  const response =
    await apiClient.post<DematLeadApiData>(
      "microsite/lead/savedetails",
      requestPayload,
      {
        encrypt: true,
        decrypt: true,
        withCredentials: true,
      }
    );

  const responseData = response.data;
  const status = getDematLeadStatus(responseData);

  if (!status) {
    return {
      success: false,
      message:
        getResponseMessage(responseData) ||
        "We could not continue the account-opening journey. Please try again.",
    };
  }

  if (status === "exhausted") {
    return {
      success: true,
      status,
      message:
        "Your OTP request limit is exhausted. Please try again after 15 minutes.",
    };
  }

  if (status === "internal_server_error") {
    return {
      success: true,
      status,
      message:
        "The account-opening service encountered an error.",
    };
  }

  return {
    success: true,
    status,
    message:
      "Your details were submitted successfully.",
  };
}
