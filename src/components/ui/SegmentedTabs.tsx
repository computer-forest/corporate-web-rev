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
  /**
   * The variant Figma uses on a tinted section ground. Below 767 it inverts
   * the fills — track on surface/secondary, the active chip white — and
   * splits the track into equal segments rather than sizing each to its
   * label. Fund It, Protect It (Segmented Tabs 0:58394 / 0:97270) is the one
   * instance that reads this way; IPOs 0:58757 keeps the default both ways.
   */
  onTint?: boolean;
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
  onTint = false,
}: SegmentedTabsProps) {
  return (
    <div
      className={`${styles.track} ${onTint ? styles.onTint : ""}`}
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
