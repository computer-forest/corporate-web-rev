import { SEARCH_PLACEHOLDER, TOP_NAV } from "@/constants/sbi-home";

import { safeHref, safeImageSrc } from "./safeUrl";

/**
 * The header's content, read server-side from the CMS.
 *
 * Separate from homeContent because the header is not part of the home page:
 * it renders on every marketing route, so it reads /api/public/site rather
 * than the home page's payload. A /blogs page should not have to fetch
 * fifteen home-page sections to find out what the wordmark says.
 *
 * Same three properties as homeContent — no browser access, the constants
 * remain the contract, and anything doubtful resolves to the shipped copy.
 */

if (typeof window !== "undefined") {
  throw new Error(
    "src/server/cms/siteChrome.ts is server-only and was imported into the browser bundle.",
  );
}

export interface HeaderLink {
  label: string;
  href: string;
  newTab: boolean;
}

export interface HeaderContent {
  /** Read out for the logo link and used as the wordmark's alt text. */
  brandName: string;
  logoUrl: string;
  searchPlaceholder: string;
  nav: HeaderLink[];
  source: "cms" | "fallback";
}

/** What the header renders with no CMS, byte for byte what it renders today. */
const FALLBACK: HeaderContent = {
  brandName: "SBI Securities",
  logoUrl: "/figma/header/logo-main.svg",
  searchPlaceholder: SEARCH_PLACEHOLDER,
  nav: TOP_NAV.map((item) => ({ label: item.label, href: item.href, newTab: false })),
  source: "fallback",
};

const TIMEOUT_MS = 4000;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function str(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim() !== "" ? value : fallback;
}

export async function getHeaderContent(): Promise<HeaderContent> {
  const url = process.env.HOME_CMS_URL?.trim();
  const bearer = process.env.HOME_CMS_TOKEN?.trim();

  if (!url || !bearer) return FALLBACK;

  try {
    const response = await fetch(`${url}/api/public/site`, {
      headers: { authorization: `Bearer ${bearer}`, accept: "application/json" },
      signal: AbortSignal.timeout(TIMEOUT_MS),
      /* No caching while this is a spike, so an edit shows on the next
         refresh. The full integration replaces this with the approved
         revalidate window and a tag the CMS can invalidate on publish. */
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(`[cms] site payload returned ${response.status}; using fallback chrome`);
      return FALLBACK;
    }

    const body: unknown = await response.json();
    const data = isRecord(body) && isRecord(body.data) ? body.data : null;

    if (!data) return FALLBACK;

    const settings = isRecord(data.settings) ? data.settings : {};
    const menus = isRecord(data.menus) ? data.menus : {};
    const primary = isRecord(menus["header-primary"]) ? menus["header-primary"] : {};

    const nav = (Array.isArray(primary.items) ? primary.items : [])
      .filter(isRecord)
      .map((item) => ({
        label: str(item.label, ""),
        /* Scheme-checked: a stored `javascript:` href would otherwise render
           into every marketing page's navigation. See safeUrl.ts. */
        href: safeHref(str(item.href, "#")),
        newTab: item.newTab === true,
      }))
      .filter((item) => item.label !== "");

    return {
      brandName: str(settings.brandName, FALLBACK.brandName),
      logoUrl: safeImageSrc(
        str(isRecord(settings.logo) ? settings.logo.url : undefined, FALLBACK.logoUrl),
        FALLBACK.logoUrl,
      ),
      searchPlaceholder: str(settings.searchPlaceholder, FALLBACK.searchPlaceholder),
      /* An empty menu is a header with no navigation, which is more likely a
         mistake in the dashboard than an intention. Keep the shipped links. */
      nav: nav.length > 0 ? nav : FALLBACK.nav,
      source: "cms",
    };
  } catch (error) {
    console.error("[cms] site payload unavailable:", (error as Error).message);
    return FALLBACK;
  }
}
