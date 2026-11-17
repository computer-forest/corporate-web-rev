"use client";

import styles from "./segmented-tabs.module.scss";

interface SegmentedTabsProps {
  tabs: readonly string[];
  active: string;
  onChange: (tab: string) => void;
  /** Names the tab group for assistive tech, e.g. "IPO status". */
  label: string;
  /** The track width the Figma instance is sized to — 370 on most sections. */
  width?: number;
  /** "onWhite": the track is the tinted surface and the active tab the white chip
   *  (Leadership frames sit on a white ground). */
  tone?: "default" | "onWhite";
}

/**
 * tabs/segmented from the design system: 40px tall, 8px outer radius on a
 * #f7fbff track, the active tab a white 6px-radius pill with a hairline.
 */
export default function SegmentedTabs({
  tabs,
  active,
  onChange,
  label,
  width = 370,
  tone = "default",
}: SegmentedTabsProps) {
  return (
    <div
      className={`${styles.track} ${tone === "onWhite" ? styles.onWhite : ""}`}
      role="tablist"
      aria-label={label}
      style={{ "--tabs-width": `${width}px` } as React.CSSProperties}
    >
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          role="tab"
          aria-selected={tab === active}
          className={`${styles.tab} ${tab === active ? styles.active : ""}`}
          onClick={() => onChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
