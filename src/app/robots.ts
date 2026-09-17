
import type { MetadataRoute } from "next";

import {
    appConfig,
    isProduction,
} from "@/config/app.config";

export default function robots():
    MetadataRoute.Robots {
    if (!isProduction) {
        return {
            rules: {
                userAgent: "*",
                disallow: "/",
            },
        };
    }

    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: [
                "/dashboard/",
                "/form-test/",
                "/demat-form-test/",
                "/api/",
            ],
        },

        sitemap: `${appConfig.siteUrl.replace(
            /\/$/,
            ""
        )}/sitemap.xml`,

        host: appConfig.siteUrl,
    };
}
