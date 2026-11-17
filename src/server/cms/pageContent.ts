import { safeHref, safeImageSrc } from "./safeUrl";

/**
 * Reads one page's content from the CMS, server-side — the shared half of the
 * About, Leadership and Sector mappers.
 *
 * The same three properties as homeContent.ts, and for the same reasons:
 *
 *   1. The browser never talks to the CMS. HOME_CMS_TOKEN has no NEXT_PUBLIC_
 *      prefix, so it is never inlined into a client bundle, and the guard
 *      below throws if this module ever reaches one.
 *   2. The constants in src/constants are the contract and the fallback. A
 *      mapper names every field and gives each its built-in value, so a
 *      missing key degrades to today's copy for that one field.
 *   3. Anything doubtful resolves to the built-in content: unreachable CMS,
 *      timeout, wrong token, malformed payload, a page with no sections. A
 *      content system that can take a regulated site's pages down is worse
 *      than none.
 */

if (typeof window !== "undefined") {
  throw new Error("src/server/cms/pageContent.ts is server-only and was imported into the browser bundle.");
}

export type Json = Record<string, unknown>;

const TIMEOUT_MS = 4000;

export const isRecord = (value: unknown): value is Json =>
  typeof value === "object" && value !== null && !Array.isArray(value);

/* --- field readers: each takes the CMS value and the built-in fallback ----- */

export const str = (value: unknown, fallback: string): string =>
  typeof value === "string" && value.trim() !== "" ? value : fallback;

export const num = (value: unknown, fallback: number): number => {
  const n = typeof value === "string" && value.trim() !== "" ? Number(value) : value;
  return typeof n === "number" && Number.isFinite(n) ? n : fallback;
};

/** A non-empty list of non-empty strings, or the fallback. */
export const strs = (value: unknown, fallback: readonly string[]): string[] => {
  if (!Array.isArray(value)) return [...fallback];
  const out = value.filter((v): v is string => typeof v === "string" && v.trim() !== "");
  return out.length > 0 ? out : [...fallback];
};

/** A link, vetted: javascript: and friends become the fallback. */
export const link = (value: unknown, fallback: string): string =>
  typeof value === "string" && value.trim() !== "" ? safeHref(value) : fallback;

/** A media object `{url}` from the payload, vetted, or the built-in image. */
export const image = (value: unknown, fallback: string): string =>
  isRecord(value) && typeof value.url === "string" ? safeImageSrc(value.url, fallback) : fallback;

export const rows = (value: unknown): Json[] => (Array.isArray(value) ? value.filter(isRecord) : []);

/* --- the page ------------------------------------------------------------- */

export interface SectionView {
  /** The section's own fields. */
  block: Json;
  /** The active rows of a collection, in order; empty when there are none. */
  items(collection: string): Json[];
  /** The whole section object, for reused home folds (faq, banner, nudge). */
  raw: Json;
}

export interface PageView {
  section(key: string): SectionView | null;
  seo: Json | null;
}

function toSection(raw: Json): SectionView {
  const content = isRecord(raw.content) ? raw.content : {};
  const collections = isRecord(content.collections) ? content.collections : {};
  return {
    block: isRecord(content.block) ? content.block : {},
    items: (collection) => rows(collections[collection]),
    raw,
  };
}

/**
 * The page's payload, or null when the CMS is not configured or cannot be
 * reached. Callers treat null as "render the built-in content".
 */
export async function getPageView(slug: string): Promise<PageView | null> {
  const url = process.env.HOME_CMS_URL?.trim();
  const bearer = process.env.HOME_CMS_TOKEN?.trim();

  /* Not configured is the normal state on a machine that has not set the CMS
     up, and not worth logging on every request. */
  if (!url || !bearer) return null;

  try {
    const response = await fetch(`${url}/api/public/pages/${slug}`, {
      headers: { authorization: `Bearer ${bearer}`, accept: "application/json" },
      signal: AbortSignal.timeout(TIMEOUT_MS),
      /* Not `no-store`: that would opt every route out of static rendering, and
         at build time the fetch would fail and bake the fallback in. Revalidate
         on a window instead; development uses 0 so an edit shows on refresh. */
      next: { revalidate: process.env.NODE_ENV === "development" ? 0 : 60, tags: [`cms:${slug}`] },
    });

    if (!response.ok) {
      console.error(`[cms] ${slug} payload returned ${response.status}; using built-in content`);
      return null;
    }

    const body: unknown = await response.json();
    const data = isRecord(body) && isRecord(body.data) ? body.data : null;
    const sections = data && Array.isArray(data.sections) ? data.sections.filter(isRecord) : null;

    if (!data || !sections) {
      console.error(`[cms] ${slug} payload had no sections array; using built-in content`);
      return null;
    }

    const byKey = new Map(sections.map((s) => [String(s.key), s]));

    return {
      section: (key) => {
        const raw = byKey.get(key);
        return raw ? toSection(raw) : null;
      },
      seo: isRecord(data.seo) ? data.seo : null,
    };
  } catch (error) {
    /* Timeout, DNS, connection refused, bad JSON. The page still renders. */
    console.error(`[cms] ${slug} payload unavailable:`, (error as Error).message);
    return null;
  }
}
