import Link from "next/link";
import type { LeaderContent } from "@/types/pages";
import styles from "./leadership.module.scss";

/** Leader card — 421 x 421 portrait over name (H5 SB) and role (B1). */
export default function LeaderCard({ leader }: { leader: LeaderContent }) {
  return (
    <Link href={`/leadership/${leader.slug}`} className={styles.card}>
      <span className={styles.portrait}>
        {leader.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={leader.photo} alt={leader.name} loading="lazy" />
        ) : null}
      </span>
      <span className={styles.text}>
        <span className={styles.name}>{leader.name}</span>
        <span className={styles.role}>{leader.role}</span>
      </span>
    </Link>
  );
}
