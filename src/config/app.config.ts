
export const appConfig = {
  env: process.env.NEXT_PUBLIC_APP_ENV || "local",

  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000",

  apiBaseUrl:
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "http://localhost:8080/api/v1/",

  cmsBaseUrl:
    process.env.NEXT_PUBLIC_CMS_BASE_URL ||
    "https://awsuat.sbisecurities.in/services/",

  redirectionUrl:
    process.env.NEXT_PUBLIC_REDIRECTION_URL ||
    "http://localhost:3000",

  dematRedirectUrl:
    process.env.NEXT_PUBLIC_DEMAT_REDIRECT_URL ||
    "https://udn.sbisecurities.in/diy/mobile-home-otp",
};

export const isProduction =
  appConfig.env === "production";

export const isUat =
  appConfig.env === "uat";

export const isLocal =
  appConfig.env === "local";
