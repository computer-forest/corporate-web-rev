import Link from "next/link";
import styles from "./breadcrumbs.module.scss";

export interface BreadcrumbItem {
  label: string;
  /** Omitted on the current page, which is rendered as plain text. */
  href?: string;
}

interface BreadcrumbsProps {
  /** Driven by data — the CMS supplies this list per page. */
  items: readonly BreadcrumbItem[];
  className?: string;
}

/**
 * Breadcrumbs from the design system: B3 Med tertiary trail, a 24px caret
 * between crumbs, and the current page in B2 Med primary. Renders nothing
 * for an empty list so a page without a trail needs no special-casing.
 */
export default function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={`${styles.nav} ${className ?? ""}`}>
      <ol className={styles.list}>
        {items.map((item, i) => {
          const isCurrent = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className={styles.item}>
              {isCurrent || !item.href ? (
                <span
                  className={isCurrent ? styles.current : styles.crumb}
                  aria-current={isCurrent ? "page" : undefined}
                >
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className={styles.crumb}>
                  {item.label}
                </Link>
              )}
              {!isCurrent ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  className={styles.caret}
                  src="/figma/about/hero/caret-right.svg"
                  alt=""
                  width={24}
                  height={24}
                />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
