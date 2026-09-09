import Link from "next/link";
import { ArrowUpRightIcon } from "./SbIcons";
import styles from "./section-head.module.scss";

interface SectionHeadProps {
  title: string;
  subtext?: string;
  /** Renders the dotted arrow-up-right that links through to the listing. */
  href?: string;
  /** Accessible name for that arrow, since the glyph carries no text. */
  hrefLabel?: string;
  align?: "start" | "center";
  tone?: "light" | "dark";
}

/**
 * The "Title + sutext" component that opens most sections — 40/48 heading,
 * optional 20/28 subtext, and an optional dotted arrow pinned to the far end.
 */
export default function SectionHead({
  title,
  subtext,
  href,
  hrefLabel,
  align = "start",
  tone = "light",
}: SectionHeadProps) {
  return (
    <div
      className={`${styles.head} ${styles[align]} ${tone === "dark" ? styles.dark : ""}`}
    >
      <div className={styles.text}>
        <h2 className={styles.title}>{title}</h2>
        {subtext ? <p className={styles.subtext}>{subtext}</p> : null}
      </div>
      {href ? (
        <Link href={href} className={styles.arrow} aria-label={hrefLabel ?? title}>
          <ArrowUpRightIcon />
        </Link>
      ) : null}
    </div>
  );
}
