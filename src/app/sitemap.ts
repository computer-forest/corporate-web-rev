
import type { MetadataRoute } from "next";

import { appConfig } from "@/config/app.config";

function createPublicUrl(path = ""): string {
    const siteUrl = appConfig.siteUrl.replace(
        /\/$/,
        ""
    );

    const normalizedPath = path.startsWith("/")
        ? path
        : `/${path}`;

    return path
        ? `${siteUrl}${normalizedPath}`
        : siteUrl;
}

export default function sitemap():
    MetadataRoute.Sitemap {
    return [
        {
            url: createPublicUrl(),
            changeFrequency: "daily",
            priority: 1,
        },
        {
            url: createPublicUrl("/products"),
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: createPublicUrl("/calculators"),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: createPublicUrl("/blogs"),
            changeFrequency: "daily",
            priority: 0.9,
        },
    ];
}
