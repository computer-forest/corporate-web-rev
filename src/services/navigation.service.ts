import { ROUTES, CHROMELESS_ROUTES } from "@/lib/app-routing";

export const navigationService = {
  isChromeless(pathname: string) {
    return CHROMELESS_ROUTES.some((route) => pathname.startsWith(route));
  },

  isActive(pathname: string, href: string) {
    if (href === ROUTES.home) return pathname === "/" || pathname === ROUTES.home;
    return pathname === href || pathname.startsWith(`${href}/`);
  },

  scrollToTop() {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  },
};
