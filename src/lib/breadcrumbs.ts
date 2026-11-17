import type { BreadcrumbItem } from "@/components/ui/Breadcrumbs";

export type PageKey = "about" | "leadership" | "leader-detail" | "sector";

/**
 * Default trails, used until the CMS supplies one. Breadcrumbs are data, not
 * markup: every page asks this module for its trail and passes it straight to
 * <Breadcrumbs items>, so moving to CMS-authored trails means changing only
 * this function — no page or component needs to change.
 */
const DEFAULT_TRAILS: Record<PageKey, readonly BreadcrumbItem[]> = {
  about: [{ label: "Home", href: "/" }, { label: "About us" }],
  leadership: [{ label: "Home", href: "/" }, { label: "Our Leaders" }],
  "leader-detail": [
    { label: "Home", href: "/" },
    { label: "Our Leaders", href: "/leadership" },
  ],
  sector: [{ label: "Home", href: "/" }, { label: "Sector Snapshot" }],
};

/**
 * Resolves the breadcrumb trail for a page. `currentLabel` is appended as the
 * current (non-link) crumb for detail pages whose title comes from data.
 *
 * TODO(CMS): fetch the trail from `NEXT_PUBLIC_CMS_BASE_URL` here and fall back
 * to DEFAULT_TRAILS when the CMS has none for `page`.
 */
export async function getBreadcrumbs(
  page: PageKey,
  currentLabel?: string,
): Promise<readonly BreadcrumbItem[]> {
  const trail = DEFAULT_TRAILS[page];
  return currentLabel ? [...trail, { label: currentLabel }] : trail;
}
