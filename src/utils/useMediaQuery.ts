"use client";

import { useEffect, useState } from "react";

/**
 * Tracks a media query from the client.
 *
 * The first render always reports `false` so the server and the client agree,
 * and the real answer arrives in the effect. Callers must therefore treat
 * `false` as "the wide layout", which is what every current caller does: the
 * mobile frames collapse or reorder content the wide frames show in full, so
 * the pre-hydration paint is the complete one rather than an empty one.
 */
export default function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const list = window.matchMedia(query);
    const sync = () => setMatches(list.matches);

    sync();
    list.addEventListener("change", sync);
    return () => list.removeEventListener("change", sync);
  }, [query]);

  return matches;
}

/** The `max-width: 767px` breakpoint the home page's SCSS modules share. */
export const MOBILE_QUERY = "(max-width: 767px)";
