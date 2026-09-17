
export type DematLeadRequest = {
  flag: "SaveLandingpagedetails";
  Mobile_number: string;
  name_submitted: string;
  Entry_type: "Manual";
  Country_code: string;
  IP_location_country: string;
  IP_location_pincode: string;
  Tabout_count: string;
  LP_link: string;
  utm_term: string;
  utm_remark: string;
  utm_placement: string;
  utm_os: string;
  utm_medium: string;
  utm_keyword: string;
  utm_devicemodel: string;
  utm_creative: string;
  utm_content: string;
  utm_campaign: string;
  utm_adgroup: string;
  network: string;
  gclid: string;
  fbclid: string;
  Appflyer_ID: string;
  extension: string;
  ad_position: string;
  UTM_source: string;
  Device_type: string;
};

export type DematLeadStatus =
  | "valid"
  | "exhausted"
  | "internal_server_error";

export type DematLeadApiData = {
  status?: boolean | string;
  messgae?: string;
  message?: string;
};

export type DematLeadSubmissionResult = {
  success: boolean;
  message: string;
  status?: DematLeadStatus;
};

export type DematAttributionData = {
  Country_code: string;
  IP_location_country: string;
  IP_location_pincode: string;
  utm_term: string;
  utm_remark: string;
  utm_placement: string;
  utm_os: string;
  utm_medium: string;
  utm_keyword: string;
  utm_devicemodel: string;
  utm_creative: string;
  utm_content: string;
  utm_campaign: string;
  utm_adgroup: string;
  network: string;
  gclid: string;
  fbclid: string;
  Appflyer_ID: string;
  extension: string;
  ad_position: string;
  UTM_source: string;
};
