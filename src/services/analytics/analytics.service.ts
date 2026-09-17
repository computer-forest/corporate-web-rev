import { analyticsConfig } from "@/config/analytics.config";

type AnalyticsValue =
    | string
    | number
    | boolean
    | undefined;

type AnalyticsEvent = {
    event: string;
    app_environment: string;
    [key: string]: AnalyticsValue;
};

declare global {
    interface Window {
        dataLayer?: AnalyticsEvent[];
    }
}

export function trackAnalyticsEvent(
    eventName: string,
    eventData: Record<
        string,
        AnalyticsValue
    > = {}
): void {
    if (typeof window === "undefined") {
        return;
    }

    window.dataLayer =
        window.dataLayer || [];

    window.dataLayer.push({
        event: eventName,
        app_environment:
            analyticsConfig.appEnvironment,
        ...eventData,
    });
}

// Future Usage
// trackAnalyticsEvent(
//     "select_banner",
//     {
//         banner_name: "Home Banner",
//         banner_position: "1",
//         banner_button_name: "Get Started",
//     }
// );