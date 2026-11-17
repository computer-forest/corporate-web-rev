import styles from "./pager.module.scss";

interface PagerProps {
  /** Zero-based. */
  index: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  label: string;
  /** The dotted rules either side of the controls, as the carousels draw them. */
  rules?: boolean;
  /** "end" is the Awards rail: a progress rule fills the left, controls sit right. */
  align?: "center" | "end";
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

/**
 * "Arrows and Page Numbers" — two 40px dotted arrows around a 01/04 pill,
 * optionally flanked by a solid rule on the left and a dotted one on the right.
 */
export default function Pager({ index, total, onPrev, onNext, label, rules = false, align = "center" }: PagerProps) {
  return (
    <div className={`${styles.pager} ${rules ? styles.withRules : ""} ${align === "end" ? styles.end : ""}`}>
      {rules && align === "end" ? <span className={styles.ruleSolid} aria-hidden="true" /> : null}
      {rules ? <span className={styles.ruleDotted} aria-hidden="true" /> : null}
      <div className={styles.controls}>
        <button type="button" className={`${styles.arrow} ${styles.prev}`} onClick={onPrev} aria-label={`Previous ${label}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/figma/about/csr/arrow-prev.svg" alt="" width={40} height={40} />
        </button>
        <p className={styles.pill} aria-live="polite">
          <span className={styles.current}>{pad(index + 1)}</span>
          <span className={styles.total}>/{pad(total)}</span>
        </p>
        <button type="button" className={styles.arrow} onClick={onNext} aria-label={`Next ${label}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/figma/about/csr/arrow-next.svg" alt="" width={40} height={40} />
        </button>
      </div>
      {rules && align === "center" ? <span className={styles.ruleDotted} aria-hidden="true" /> : null}
    </div>
  );
}
