import { appConfig } from "@/config/app.config";

export const analyticsConfig = {
    googleTagManagerId: "GTM-WZ2F44N",

    appEnvironment: appConfig.env,
} as const;

// Why keep this separate?
// GoogleTagManager component
// → Loads the GTM container

// Analytics service
// → Pushes dataLayer events

// Analytics configuration
// → Stores the GTM ID and current environment