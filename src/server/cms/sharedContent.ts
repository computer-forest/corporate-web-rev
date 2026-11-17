import { FAQS, FOOTER_CTA, STICKY_NUDGE } from "@/constants/sbi-home";
import type { Crumb, FaqContent, NudgeContent, PromoContent, SeoContent } from "@/types/pages";

import { image, isRecord, link, rows, str, strs, type PageView } from "./pageContent";

/**
 * Mappers for what every inner page has: SEO, breadcrumbs, and the home folds
 * it reuses (FAQ, app promo, sticky nudge). Each takes the page view, which may
 * be null, and the page's own fallback.
 */

export function toSeo(view: PageView | null, fallback: SeoContent): SeoContent {
  const raw = view?.seo;
  if (!raw) return fallback;
  return {
    title: str(raw.title, fallback.title),
    description: str(raw.description, fallback.description),
    keywords: strs(raw.keywords, fallback.keywords),
    canonical: link(raw.canonical, fallback.canonical),
    ogTitle: str(raw.ogTitle, fallback.ogTitle),
    ogDescription: str(raw.ogDescription, fallback.ogDescription),
    ogImage: image(raw.ogImage, fallback.ogImage),
    robots: str(raw.robots, fallback.robots),
  };
}

/** `breadcrumbs`-style sections: a list of `{label, href}`; the last is the current page. */
export function toCrumbs(view: PageView | null, section: string, fallback: readonly Crumb[]): Crumb[] {
  const list = view?.section(section)?.items("items") ?? [];
  const crumbs = list
    .filter((row) => typeof row.label === "string" && row.label.trim() !== "")
    .map((row): Crumb => {
      const href = typeof row.href === "string" && row.href.trim() !== "" ? link(row.href, "") : "";
      return href ? { label: String(row.label), href } : { label: String(row.label) };
    });
  return crumbs.length > 0 ? crumbs : [...fallback];
}

export const DEFAULT_FAQ: FaqContent = {
  title: "Frequently Asked Questions",
  ctaLabel: "View All FAQs",
  ctaHref: "#faqs",
  items: FAQS.map((f) => ({ question: f.question, answer: f.answer })),
};

export const DEFAULT_PROMO: PromoContent = {
  title: FOOTER_CTA.title,
  body: FOOTER_CTA.body,
  cta: FOOTER_CTA.cta,
  ctaHref: "/download-app",
};

export const DEFAULT_NUDGE: NudgeContent = {
  title: STICKY_NUDGE.title,
  mobilePlaceholder: STICKY_NUDGE.mobilePlaceholder,
  namePlaceholder: STICKY_NUDGE.namePlaceholder,
  cta: STICKY_NUDGE.cta,
};

export function toFaq(view: PageView | null): FaqContent {
  const section = view?.section("faq");
  if (!section) return DEFAULT_FAQ;

  const items = rows(section.raw.items)
    .filter((r) => typeof r.question === "string" && r.question.trim() !== "")
    .map((r) => ({ question: String(r.question), answer: typeof r.answer === "string" ? r.answer : "" }));

  return {
    title: str(section.raw.block && isRecord(section.raw.block) ? section.raw.block.title : null, DEFAULT_FAQ.title),
    ctaLabel: str(isRecord(section.raw.block) ? section.raw.block.ctaLabel : null, DEFAULT_FAQ.ctaLabel),
    ctaHref: link(isRecord(section.raw.block) ? section.raw.block.ctaHref : null, DEFAULT_FAQ.ctaHref),
    items: items.length > 0 ? items : DEFAULT_FAQ.items,
  };
}

export function toPromo(view: PageView | null): PromoContent {
  const banner = view?.section("app-promo")?.raw.banner;
  if (!isRecord(banner)) return DEFAULT_PROMO;
  return {
    title: str(banner.title, DEFAULT_PROMO.title),
    body: str(banner.description, DEFAULT_PROMO.body),
    cta: str(banner.ctaLabel, DEFAULT_PROMO.cta),
    ctaHref: link(banner.ctaHref, DEFAULT_PROMO.ctaHref),
  };
}

export function toNudge(view: PageView | null): NudgeContent {
  const nudge = view?.section("sticky-nudge")?.raw.nudge;
  if (!isRecord(nudge)) return DEFAULT_NUDGE;
  return {
    title: str(nudge.title, DEFAULT_NUDGE.title),
    mobilePlaceholder: str(nudge.mobilePlaceholder, DEFAULT_NUDGE.mobilePlaceholder),
    namePlaceholder: str(nudge.namePlaceholder, DEFAULT_NUDGE.namePlaceholder),
    cta: str(nudge.ctaLabel, DEFAULT_NUDGE.cta),
  };
}
