import { LEADERS, LEADERSHIP_TABS, detailPhoto } from "@/constants/sbi-leadership";
import type { Crumb, LeaderContent, LeadershipContent, SeoContent } from "@/types/pages";

import { getPageView, image, str, strs } from "./pageContent";
import { toCrumbs, toNudge, toPromo, toSeo } from "./sharedContent";

/**
 * Leadership — /leadership and /leadership/[slug]. CMS slug "leadership"; the
 * field names read here are those of cms-website/src/server/cms/pages.ts.
 */

const GROUP_KEY: Record<string, string> = { "Board of Directors": "board", "Managing Team": "managing" };

const SEO: SeoContent = {
  title: "Our Leaders | SBI Securities",
  description: "Meet the leaders behind SBI Securities.",
  keywords: [],
  canonical: "",
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
  robots: "index,follow",
};

const LISTING_CRUMBS: Crumb[] = [{ label: "Home", href: "/" }, { label: "Our Leaders" }];
const DETAIL_CRUMBS: Crumb[] = [{ label: "Home", href: "/" }, { label: "Our Leaders", href: "/leadership" }];

export const DEFAULT_LEADERSHIP: LeadershipContent = {
  breadcrumbs: LISTING_CRUMBS,
  detailBreadcrumbs: DETAIL_CRUMBS,
  seo: SEO,
  heading: "Meet the Leaders Behind SBI Securities.",
  tabsLabel: "Leadership group",
  tabs: LEADERSHIP_TABS.map((label) => ({ key: GROUP_KEY[label], label })),
  leaders: LEADERS.map((l) => ({
    slug: l.slug,
    name: l.name,
    role: l.role,
    photo: `/figma/leadership/${l.photo}.png`,
    detailPhoto: `/figma/leadership/${detailPhoto(l)}.png`,
    bio: l.bio ? [...l.bio] : [],
    groups: l.groups.map((g) => GROUP_KEY[g]),
  })),
  shared: { promo: toPromo(null), nudge: toNudge(null) },
};

export async function getLeadershipContent(): Promise<LeadershipContent> {
  const view = await getPageView("leadership");
  if (!view) return DEFAULT_LEADERSHIP;

  const D = DEFAULT_LEADERSHIP;

  const tabRows = (view.section("leadership-tabs")?.items("tabs") ?? []).filter(
    (r) => typeof r.key === "string" && typeof r.label === "string" && r.label.trim() !== "",
  );
  const tabs = tabRows.length > 0 ? tabRows.map((r) => ({ key: String(r.key), label: String(r.label) })) : D.tabs;

  /* A leader needs a slug and a name to have a page; a row without either
     cannot be addressed or shown, so it is skipped rather than rendered half
     empty. If the CMS has no usable leaders at all, the built-in set is used. */
  const leaders: LeaderContent[] = (view.section("leaders")?.items("leaders") ?? [])
    .filter((r) => typeof r.slug === "string" && /^[a-z0-9-]+$/.test(r.slug) && typeof r.name === "string" && r.name.trim() !== "")
    .map((r) => {
      const photo = image(r.photo, "");
      return {
        slug: String(r.slug),
        name: String(r.name),
        role: str(r.role, ""),
        photo,
        detailPhoto: image(r.detail_photo, photo),
        bio: strs(r.bio, []),
        groups: strs(r.groups, []),
      };
    });

  return {
    breadcrumbs: toCrumbs(view, "breadcrumbs", D.breadcrumbs),
    detailBreadcrumbs: toCrumbs(view, "detail-breadcrumbs", D.detailBreadcrumbs),
    seo: toSeo(view, D.seo),
    heading: str(view.section("leadership-banner")?.block.heading, D.heading),
    tabsLabel: str(view.section("leadership-tabs")?.block.tabs_label, D.tabsLabel),
    tabs,
    leaders: leaders.length > 0 ? leaders : D.leaders,
    shared: { promo: toPromo(view), nudge: toNudge(view) },
  };
}
