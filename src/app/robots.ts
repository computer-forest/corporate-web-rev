import type { MetadataRoute } from "next";
import { SITE_URL, isIndexableEnvironment } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: isIndexableEnvironment
      ? { userAgent: "*", allow: "/" }
      : { userAgent: "*", disallow: "/" },
    sitemap: `${SITE_URL}sitemap.xml`,
  };
}
