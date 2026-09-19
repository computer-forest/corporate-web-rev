"use client";

import { useEffect, useState } from "react";
import SbButton from "@/components/ui/SbButton";
import { STICKY_NUDGE } from "@/constants/sbi-home";
import styles from "./sticky-nudge.module.scss";

/**
 * Sticky — 1:60071. The Figma note asks for this to stay pinned to the bottom
 * once the first fold has been passed, so it appears on scroll rather than
 * sitting in the flow.
 */
export default function StickyNudge() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`${styles.wrap} ${shown ? styles.shown : ""}`} aria-hidden={!shown}>
      <form className={styles.bar} onSubmit={(event) => event.preventDefault()}>
        <p className={styles.title}>{STICKY_NUDGE.title}</p>
        <input
          type="tel"
          inputMode="numeric"
          placeholder={STICKY_NUDGE.mobilePlaceholder}
          aria-label={STICKY_NUDGE.mobilePlaceholder}
          tabIndex={shown ? undefined : -1}
        />
        <input
          type="text"
          placeholder={STICKY_NUDGE.namePlaceholder}
          aria-label={STICKY_NUDGE.namePlaceholder}
          tabIndex={shown ? undefined : -1}
        />
        <SbButton variant="secondary" type="submit">
          {STICKY_NUDGE.cta}
          {/* Buttons 0:64981 pairs the label with a 16px ArrowRight at the
              button's own 6px gap, not a "→" glyph. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/figma/sticky/arrow-right.svg" alt="" width={16} height={16} />
        </SbButton>
      </form>
    </div>
  );
}
