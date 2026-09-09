import { environment, currentEnvironment } from "@/environments/environment";

export const isIndexableEnvironment = currentEnvironment === "production";

export const SITE_URL = environment.url.endsWith("/")
  ? environment.url
  : `${environment.url}/`;

export function canonicalUrl(path: string): string {
  return new URL(path.replace(/^\//, ""), SITE_URL).toString();
}

/** Standard metadata block for a marketing page. */
export function pageMetadata(opts: {
  path: string;
  title: string;
  description: string;
}) {
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: canonicalUrl(opts.path) },
    robots: isIndexableEnvironment
      ? { index: true, follow: true, googleBot: { index: true, follow: true } }
      : { index: false, follow: false },
    openGraph: {
      title: opts.title,
      description: opts.description,
      type: "website" as const,
      url: canonicalUrl(opts.path),
    },
  };
}
