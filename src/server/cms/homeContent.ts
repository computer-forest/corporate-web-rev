import { HERO } from "@/constants/sbi-home";

/**
 * Reads the home page's content from the CMS, server-side.
 *
 * Scope: the hero only, for now. This is the first slice through the whole
 * pipe — database, API, site — so that the shape of the integration can be
 * judged before the other fourteen folds follow it.
 *
 * Three properties matter more than the code:
 *
 *   1. The browser never talks to the CMS. Two things hold that: the bearer
 *      token is read from HOME_CMS_TOKEN, which has no NEXT_PUBLIC_ prefix
 *      and so is never inlined into a client bundle; and the guard below
 *      throws if this module is ever evaluated in a browser.
 *
 *      The `server-only` package would turn that runtime throw into a build
 *      error, which is better — it is one file with no dependencies. It is
 *      not used here only because adding a package to this repository is not
 *      mine to decide. `npm i server-only` and an `import "server-only"` at
 *      the top of this file is the whole change.
 *
 *   2. `sbi-home.ts` is still the contract. `HeroContent` is `typeof HERO`,
 *      so the CMS cannot introduce a field the component does not already
 *      render, and the fallback is the constants object itself — not a
 *      reconstruction of it.
 *
 *   3. Any doubt resolves to the constants. Unreachable CMS, timeout, wrong
 *      token, malformed payload, a missing hero — every one of them returns
 *      the hardcoded copy, so the page renders exactly what it renders today.
 *      A content system that can take the marketing page down is worse than
 *      no content system.
 */

/* The runtime half of the boundary above. A Client Component that imports
   this module fails on first render rather than quietly sending a request
   from the browser with an undefined token. */
if (typeof window !== "undefined") {
  throw new Error(
    "src/server/cms/homeContent.ts is server-only and was imported into the browser bundle.",
  );
}

export type HeroContent = typeof HERO;

export interface HomeContent {
  hero: HeroContent;
  /** Where the copy came from, so a page can be checked without guessing. */
  source: "cms" | "fallback";
}

const TIMEOUT_MS = 4000;

function baseUrl(): string | null {
  return process.env.HOME_CMS_URL?.trim() || null;
}

function token(): string | null {
  return process.env.HOME_CMS_TOKEN?.trim() || null;
}

/* --- validation ----------------------------------------------------------- */

function str(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim() !== "" ? value : fallback;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Maps the payload onto the constants' own shape, field by field.
 *
 * Deliberately not a spread or a cast. Every field is named here and every
 * one falls back to its hardcoded value, so a payload that is missing a key,
 * or has it as the wrong type, degrades to today's copy for that one field
 * rather than rendering `undefined` into the page.
 */
function toHero(raw: unknown): HeroContent | null {
  if (!isRecord(raw)) return null;

  const form = isRecord(raw.form) ? raw.form : {};
  const formMobile = isRecord(raw.formMobile) ? raw.formMobile : {};

  /* The CMS keys its KPI tiles; the component reads three named ones. Looking
     them up by key rather than by position means reordering the tiles in the
     dashboard cannot silently swap the rating onto the downloads tile. */
  const kpis = Array.isArray(raw.kpis) ? raw.kpis.filter(isRecord) : [];
  const kpi = (key: string) => kpis.find((k) => k.key === key);

  const rotating = Array.isArray(raw.lines)
    ? raw.lines
        .filter((pair): pair is unknown[] => Array.isArray(pair))
        .map((pair) => pair.map((line) => (typeof line === "string" ? line : "")))
        .filter((pair) => pair[0])
    : [];

  const subtext = Array.isArray(raw.subtext) ? raw.subtext : [];

  return {
    titleLead: str(raw.titleLead, HERO.titleLead),
    /* The rotator indexes [0] and builds a 4-item track from 3 lines, so an
       empty list would break it. Below one line, keep the shipped set. */
    rotatingLines: rotating.length > 0 ? rotating : HERO.rotatingLines,
    subtext: [str(subtext[0], HERO.subtext[0]), str(subtext[1], HERO.subtext[1])],
    watermarkLeft: str(raw.watermarkLeft, HERO.watermarkLeft),
    watermarkRight: str(raw.watermarkRight, HERO.watermarkRight),
    form: {
      mobileLabel: str(form.mobileLabel, HERO.form.mobileLabel),
      mobilePlaceholder: str(form.mobilePlaceholder, HERO.form.mobilePlaceholder),
      mobileHelp: str(form.mobileHelp, HERO.form.mobileHelp),
      nameLabel: str(form.nameLabel, HERO.form.nameLabel),
      namePlaceholder: str(form.namePlaceholder, HERO.form.namePlaceholder),
      consent: str(form.consentLabel, HERO.form.consent),
      submit: str(form.submitLabel, HERO.form.submit),
    },
    formMobile: {
      mobileLabel: str(formMobile.mobileLabel, HERO.formMobile.mobileLabel),
      mobilePlaceholder: str(formMobile.mobilePlaceholder, HERO.formMobile.mobilePlaceholder),
      nameLabel: str(formMobile.nameLabel, HERO.formMobile.nameLabel),
      namePlaceholder: str(formMobile.namePlaceholder, HERO.formMobile.namePlaceholder),
    },
    kpis: {
      downloads: {
        value: str(kpi("downloads")?.value, HERO.kpis.downloads.value),
        label: str(kpi("downloads")?.label, HERO.kpis.downloads.label),
      },
      rating: {
        value: str(kpi("rating")?.value, HERO.kpis.rating.value),
        label: str(kpi("rating")?.label, HERO.kpis.rating.label),
      },
      /* The backing tile is a logo: it has a label and no value. */
      backing: { label: str(kpi("backing")?.label, HERO.kpis.backing.label) },
    },
  };
}

/* --- the read -------------------------------------------------------------- */

export async function getHomeContent(): Promise<HomeContent> {
  const url = baseUrl();
  const bearer = token();

  /* Not configured is the normal state on a machine that has not set the CMS
     up, and it is not an error worth logging on every request. */
  if (!url || !bearer) return { hero: HERO, source: "fallback" };

  try {
    const response = await fetch(`${url}/api/public/pages/home`, {
      headers: { authorization: `Bearer ${bearer}`, accept: "application/json" },
      signal: AbortSignal.timeout(TIMEOUT_MS),
      /* Not `no-store`. The header renders on every marketing route, and
         no-store opts each one out of static rendering — at build time the
         fetch then fails and the page is generated with the fallback copy
         baked in, so a static route would ignore the CMS entirely.
         Revalidating keeps the pages static and refreshes them on a window;
         development uses 0 so an edit shows on the next refresh. */
      next: { revalidate: process.env.NODE_ENV === "development" ? 0 : 60 },
    });

    if (!response.ok) {
      console.error(`[cms] home payload returned ${response.status}; using fallback copy`);
      return { hero: HERO, source: "fallback" };
    }

    const body: unknown = await response.json();

    const sections =
      isRecord(body) && isRecord(body.data) && Array.isArray(body.data.sections)
        ? body.data.sections
        : null;

    if (!sections) {
      console.error("[cms] home payload had no sections array; using fallback copy");
      return { hero: HERO, source: "fallback" };
    }

    const heroSection = sections.filter(isRecord).find((s) => s.key === "hero");
    const hero = toHero(heroSection?.hero);

    if (!hero) {
      console.error("[cms] home payload had no hero; using fallback copy");
      return { hero: HERO, source: "fallback" };
    }

    return { hero, source: "cms" };
  } catch (error) {
    /* Timeout, DNS, connection refused, bad JSON. The page still renders. */
    console.error("[cms] home payload unavailable:", (error as Error).message);
    return { hero: HERO, source: "fallback" };
  }
}
