import Link from "next/link";
import { NAV } from "@/constants/site";
import styles from "./not-found.module.scss";

export default function NotFound() {
  return (
    <section className={styles.section}>
      <div className="shell">
        <p className={styles.code}>Error 404 · position not on chart</p>
        <h1>That page is not on this route.</h1>
        <p className={styles.body}>
          The address you followed does not exist here. It may have been mistyped, or the page may
          have moved.
        </p>

        <nav className={styles.nav} aria-label="Suggested pages">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
