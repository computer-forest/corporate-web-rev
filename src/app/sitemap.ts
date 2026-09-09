import type { MetadataRoute } from "next";
import { canonicalUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["home", "about", "leaderboard"].map((path) => ({
    url: canonicalUrl(path),
    lastModified: new Date(),
  }));
}
