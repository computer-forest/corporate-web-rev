"use client";

import styles from "./reveal.module.scss";

interface RevealProps {
  /** Whether the region is expanded. */
  open: boolean;
  children: React.ReactNode;
  /** Matches the `aria-controls` on the button that drives it. */
  id?: string;
  /** Lets the caller size or pad the region — see the note on spacing below. */
  className?: string;
  /**
   * Set false to jump rather than transition. For a caller whose open state
   * only settles after mount — one reading a media query, say — the first
   * commit would otherwise play as an animation the reader never asked for.
   */
  animate?: boolean;
}

/**
 * An accordion region that opens and closes on a transition rather than on
 * `display`, which cannot animate.
 *
 * The height comes from `grid-template-rows: 0fr -> 1fr` on the wrapper with
 * the content clipped inside it, so the region animates to whatever height it
 * happens to need without a measured max-height to keep in sync.
 *
 * Spacing that belongs to the region has to sit *inside* it — on the child,
 * through `className` — or a closed region still contributes its parent's gap
 * or margin, and the row it collapses into stays that much too tall.
 *
 * `inert` rather than `hidden`: a closed region is clipped, not removed, so
 * without it the answers and CTAs inside stay tab-reachable and audible to a
 * screen reader while invisible.
 */
export default function Reveal({
  open,
  children,
  id,
  className,
  animate = true,
}: RevealProps) {
  const classes = [styles.reveal, open ? styles.open : "", animate ? "" : styles.instant, className];

  return (
    <div id={id} className={classes.filter(Boolean).join(" ")} inert={!open}>
      <div className={styles.inner}>{children}</div>
    </div>
  );
}
