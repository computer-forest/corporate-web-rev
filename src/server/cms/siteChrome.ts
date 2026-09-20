import {
  BRAND,
  FOOTER_LEGAL,
  FOOTER_PRIMARY,
  FOOTER_SECONDARY,
  SEARCH_PLACEHOLDER,
  STOCK_INDEX_LETTERS,
  STOCK_LINKS,
  TOP_NAV,
} from "@/constants/sbi-home";

import { safeHref, safeImageSrc } from "./safeUrl";

/**
 * The chrome every marketing route renders — header and footer — read
 * server-side from the CMS.
 *
 * One call, not two. Both are in /api/public/site because neither belongs to
 * any one page, and fetching it twice per render would double the CMS's load
 * for a document it already returns whole.
 *
 * The three properties that matter are homeContent's:
 *
 *   1. The browser never talks to the CMS. HOME_CMS_TOKEN has no
 *      NEXT_PUBLIC_ prefix so it is never inlined into a client bundle, and
 *      the guard below throws if this module reaches a browser. Installing
 *      `server-only` would make that a build error instead — one file, no
 *      dependencies — but adding a package here is not mine to decide.
 *
 *   2. sbi-home.ts stays the contract and the fallback.
 *
 *   3. Anything doubtful resolves to the shipped copy, field by field. An
 *      unreachable CMS must not be able to empty the footer of a regulated
 *      financial site: those legal blocks are not decoration.
 */

if (typeof window !== "undefined") {
  throw new Error(
    "src/server/cms/siteChrome.ts is server-only and was imported into the browser bundle.",
  );
}

/* --- shapes --------------------------------------------------------------- */

export interface HeaderLink {
  label: string;
  href: string;
  newTab: boolean;
  /** Rendered as a dropdown under this link. Empty for a plain link. */
  children: HeaderLink[];
}

export interface HeaderContent {
  brandName: string;
  logoUrl: string;
  searchPlaceholder: string;
  nav: HeaderLink[];
}

export interface FooterLink {
  label: string;
  href: string;
  newTab: boolean;
}

export interface FooterGroup {
  title: string;
  links: FooterLink[];
}

export interface FooterSocial {
  label: string;
  href: string;
  iconUrl: string;
}

export interface FooterContent {
  brandName: string;
  logoUrl: string;
  address: string;
  phone: string;
  email: string;
  connectLabel: string;
  stocksHeading: string;
  socials: FooterSocial[];
  support: FooterLink | null;
  /** The two wide columns beside the contact block. */
  primary: FooterGroup[];
  /** The five-column band. Each entry is one rendered column. */
  columns: FooterGroup[][];
  letters: FooterLink[];
  chips: FooterLink[];
  legal: {
    registration: [string, string];
    trading: string;
    authorization: string;
    warning: string;
    copyright: string;
  };
}

export interface SiteChrome {
  header: HeaderContent;
  footer: FooterContent;
  source: "cms" | "fallback";
}

/* --- the fallback --------------------------------------------------------- */

/** FooterLinkGroup.tsx's rule, reproduced so fallback hrefs match today's. */
const FOOTER_ROUTES: Record<string, string> = {
  "54EC Bonds": "/cgs-bond",
  "SBI Realty": "/sso-realty",
  Blogs: "/blogs",
  "Open Demat & Trading Account": "/open-account",
};

function fallbackHref(label: string, group: string): string {
  if (FOOTER_ROUTES[label]) return FOOTER_ROUTES[label];
  if (label.endsWith("Calculator")) return "/calculators";

  const slug = label
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  if (group === "LOANS") return `/loans/${slug}`;
  if (group === "INSURANCES") return `/insurance/${slug}`;
  if (group === "MARKETS") return `/markets/${slug}`;
  return `/${slug}`;
}

const toFallbackGroup = (group: { title: string; links: readonly string[] }): FooterGroup => ({
  title: group.title,
  links: group.links.map((label) => ({
    label,
    href: fallbackHref(label, group.title),
    newTab: false,
  })),
});

const FALLBACK: SiteChrome = {
  header: {
    brandName: BRAND.name,
    logoUrl: "/figma/header/logo-main.svg",
    searchPlaceholder: SEARCH_PLACEHOLDER,
    nav: TOP_NAV.map((item) => ({
      label: item.label,
      href: item.href,
      newTab: false,
      children: [],
    })),
  },
  footer: {
    brandName: BRAND.name,
    logoUrl: "/figma/footer/logo-a.svg",
    address: BRAND.address,
    phone: BRAND.phone,
    email: BRAND.email,
    connectLabel: "Connect with us",
    stocksHeading: "Stocks directory",
    socials: [
      { label: "Instagram", href: "https://www.instagram.com/", iconUrl: "/figma/footer/social-1.svg" },
      { label: "X", href: "https://x.com/", iconUrl: "/figma/footer/social-2.svg" },
      { label: "Facebook", href: "https://www.facebook.com/", iconUrl: "/figma/footer/social-3.svg" },
      { label: "LinkedIn", href: "https://www.linkedin.com/", iconUrl: "/figma/footer/social-4.svg" },
      { label: "YouTube", href: "https://www.youtube.com/", iconUrl: "/figma/footer/social-5.svg" },
    ],
    support: { label: "Help & Support", href: "/support", newTab: false },
    primary: FOOTER_PRIMARY.map(toFallbackGroup),
    columns: FOOTER_SECONDARY.map((column) => column.map(toFallbackGroup)),
    letters: STOCK_INDEX_LETTERS.map((letter) => ({
      label: letter,
      href: `/stocks/${letter.toLowerCase()}`,
      newTab: false,
    })),
    chips: STOCK_LINKS.map((label) => ({ label, href: "/stocks", newTab: false })),
    legal: {
      registration: [FOOTER_LEGAL.registration[0], FOOTER_LEGAL.registration[1]],
      trading: FOOTER_LEGAL.trading,
      authorization: FOOTER_LEGAL.authorization,
      warning: FOOTER_LEGAL.warning,
      copyright: FOOTER_LEGAL.copyright,
    },
  },
  source: "fallback",
};

/* --- reading -------------------------------------------------------------- */

const TIMEOUT_MS = 4000;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function str(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim() !== "" ? value : fallback;
}

function menuItems(menus: Record<string, unknown>, key: string): Record<string, unknown>[] {
  const menu = isRecord(menus[key]) ? menus[key] : {};
  return Array.isArray(menu.items) ? menu.items.filter(isRecord) : [];
}

function toLink(item: Record<string, unknown>): FooterLink {
  return {
    label: str(item.label, ""),
    href: safeHref(str(item.href, "#")),
    newTab: item.newTab === true,
  };
}

/** A menu shaped as headings-with-children becomes a column of groups. */
function toGroups(items: Record<string, unknown>[]): FooterGroup[] {
  return items
    .map((item) => ({
      title: str(item.label, ""),
      links: (Array.isArray(item.children) ? item.children.filter(isRecord) : [])
        .map(toLink)
        .filter((link) => link.label !== ""),
    }))
    .filter((group) => group.title !== "");
}

export async function getSiteChrome(): Promise<SiteChrome> {
  const url = process.env.HOME_CMS_URL?.trim();
  const bearer = process.env.HOME_CMS_TOKEN?.trim();

  if (!url || !bearer) return FALLBACK;

  try {
    const response = await fetch(`${url}/api/public/site`, {
      headers: { authorization: `Bearer ${bearer}`, accept: "application/json" },
      signal: AbortSignal.timeout(TIMEOUT_MS),
      /* Not `no-store`. The chrome renders on every marketing route, and
         no-store opts each one out of static rendering — at build time the
         fetch then fails and the page is generated with the fallback copy
         baked in, so a static route would ignore the CMS entirely.
         Revalidating keeps the pages static and refreshes them on a window;
         development uses 0 so an edit shows on the next refresh. */
      next: { revalidate: process.env.NODE_ENV === "development" ? 0 : 60 },
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
    const footerData = isRecord(data.footer) ? data.footer : {};

    /* Recursive, because the header menu is a tree. Depth is capped at one
       level of dropdown — the header renders no more, and reading a deeper
       tree only to discard it would misrepresent what is editable. */
    const toHeaderLinks = (raw: unknown, depth = 0): HeaderLink[] =>
      (Array.isArray(raw) ? raw : [])
        .filter(isRecord)
        .map((item) => ({
          ...toLink(item),
          children: depth < 1 ? toHeaderLinks(item.children, depth + 1) : [],
        }))
        .filter((item) => item.label !== "");

    const nav = toHeaderLinks(menuItems(menus, "header-primary"));

    const socials = menuItems(menus, "social")
      .map((item) => ({
        label: str(item.label, ""),
        href: safeHref(str(item.href, "#")),
        iconUrl: safeImageSrc(str(isRecord(item.icon) ? item.icon.url : undefined, ""), ""),
      }))
      .filter((s) => s.label !== "" && s.iconUrl !== "");

    const support = menuItems(menus, "footer-utility").map(toLink)[0] ?? null;

    const primary = toGroups(menuItems(menus, "footer-primary"));
    const columns = [1, 2, 3, 4, 5]
      .map((n) => toGroups(menuItems(menus, `footer-col-${n}`)))
      .filter((column) => column.length > 0);

    const letters = (Array.isArray(footerData.stockLetters) ? footerData.stockLetters : [])
      .filter(isRecord)
      .map((row) => ({
        label: str(row.letter, ""),
        href: safeHref(str(row.href, "#")),
        newTab: false,
      }))
      .filter((row) => row.label !== "");

    const chips = (Array.isArray(footerData.stockLinks) ? footerData.stockLinks : [])
      .filter(isRecord)
      .map(toLink)
      .filter((row) => row.label !== "");

    const legalRows = isRecord(footerData.legal) ? footerData.legal : {};
    const legalText = (key: string, fallback: string) => str(legalRows[key], fallback);

    return {
      header: {
        brandName: str(settings.brandName, FALLBACK.header.brandName),
        logoUrl: safeImageSrc(
          str(isRecord(settings.logo) ? settings.logo.url : undefined, FALLBACK.header.logoUrl),
          FALLBACK.header.logoUrl,
        ),
        searchPlaceholder: str(settings.searchPlaceholder, FALLBACK.header.searchPlaceholder),
        /* An empty menu is more likely a mistake in the dashboard than an
           intention, so the shipped links stand. Same reasoning below. */
        nav: nav.length > 0 ? nav : FALLBACK.header.nav,
      },
      footer: {
        brandName: str(settings.brandName, FALLBACK.footer.brandName),
        logoUrl: safeImageSrc(
          str(
            isRecord(settings.footerLogo) ? settings.footerLogo.url : undefined,
            FALLBACK.footer.logoUrl,
          ),
          FALLBACK.footer.logoUrl,
        ),
        address: str(settings.address, FALLBACK.footer.address),
        phone: str(settings.phone, FALLBACK.footer.phone),
        email: str(settings.email, FALLBACK.footer.email),
        connectLabel: str(settings.connectLabel, FALLBACK.footer.connectLabel),
        stocksHeading: str(settings.stocksHeading, FALLBACK.footer.stocksHeading),
        socials: socials.length > 0 ? socials : FALLBACK.footer.socials,
        support: support ?? FALLBACK.footer.support,
        primary: primary.length > 0 ? primary : FALLBACK.footer.primary,
        columns: columns.length > 0 ? columns : FALLBACK.footer.columns,
        letters: letters.length > 0 ? letters : FALLBACK.footer.letters,
        chips: chips.length > 0 ? chips : FALLBACK.footer.chips,
        legal: {
          registration: [
            legalText("registration-1", FALLBACK.footer.legal.registration[0]),
            legalText("registration-2", FALLBACK.footer.legal.registration[1]),
          ],
          trading: legalText("trading", FALLBACK.footer.legal.trading),
          authorization: legalText("authorization", FALLBACK.footer.legal.authorization),
          warning: legalText("warning", FALLBACK.footer.legal.warning),
          copyright: legalText("copyright", FALLBACK.footer.legal.copyright),
        },
      },
      source: "cms",
    };
  } catch (error) {
    console.error("[cms] site payload unavailable:", (error as Error).message);
    return FALLBACK;
  }
}
