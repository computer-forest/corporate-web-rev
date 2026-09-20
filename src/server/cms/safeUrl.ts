/**
 * URL schemes the site will render from CMS content.
 *
 * Content reaches these components through an authenticated dashboard, which
 * makes it trusted-ish but not trusted: the whole point of the CMS is that
 * non-technical staff edit copy without touching code, and `javascript:` in a
 * link's href is code. A stored `javascript:alert(...)` in a header link
 * would run on every marketing page for every visitor, which turns an editor
 * account into script execution on the public site.
 *
 * So the boundary is here, where CMS data becomes an attribute, rather than
 * only at the point it is written. Rows already in the database are covered,
 * and a future field that forgets to validate on save is still safe to
 * render.
 */

/** Schemes that may appear in an href. */
const LINK_SCHEMES = new Set(["http:", "https:", "mailto:", "tel:"]);

/**
 * A link target, or "#" if it is not one.
 *
 * Accepts site-relative paths ("/open-account"), fragments ("#research") and
 * absolute URLs on the schemes above. Rejects everything else, including
 * `javascript:`, `data:` and `vbscript:`, and protocol-relative "//host"
 * — which is an absolute URL wearing a relative disguise.
 */
export function safeHref(href: string): string {
  const value = href.trim();

  if (value === "") return "#";
  if (value.startsWith("#")) return value;
  if (value.startsWith("//")) return "#";
  if (value.startsWith("/")) return value;

  try {
    /* A base is required for relative input, and irrelevant for absolute:
       whatever scheme the value carries is the scheme that comes back. */
    const parsed = new URL(value, "https://sbisecurities.in");
    return LINK_SCHEMES.has(parsed.protocol) ? value : "#";
  } catch {
    return "#";
  }
}

/**
 * An image source, or the given fallback.
 *
 * Tighter than `safeHref`: an image is never a mailto or a tel, and a
 * `data:` URI in a src is a way to smuggle content past a CSP. Site-relative
 * paths and https are what the media library actually produces.
 */
export function safeImageSrc(src: string, fallback: string): string {
  const value = src.trim();

  if (value === "") return fallback;
  if (value.startsWith("//")) return fallback;
  if (value.startsWith("/")) return value;

  try {
    const parsed = new URL(value, "https://sbisecurities.in");
    return parsed.protocol === "https:" ? value : fallback;
  } catch {
    return fallback;
  }
}
