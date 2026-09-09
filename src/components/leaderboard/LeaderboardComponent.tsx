import PageHero from "@/components/ui/PageHero";
import CtaBanner from "@/components/ui/CtaBanner";
import { LEADERBOARD, LEADERBOARD_STATS } from "@/constants/leaderboard";
import { formatCapacity, formatVariance } from "@/utils/format";
import styles from "./leaderboard.module.scss";

// Widest absolute variance in the table, used to scale the bars.
const SCALE = Math.max(...LEADERBOARD.map((entry) => Math.abs(entry.varianceDays)));

export default function LeaderboardComponent() {
  return (
    <>
      <PageHero
        eyebrow="Leaderboard"
        title="Every package we delivered, ranked by the only number that counts."
        lede="Days early or late against the contracted connection date. The late one is on the board too — a leaderboard that only shows wins is a brochure."
        meta={LEADERBOARD_STATS.map((stat) => ({ label: stat.label, value: stat.value }))}
      />

      <section className={styles.section}>
        <div className="shell">
          <ol className={styles.board}>
            {LEADERBOARD.map((entry) => {
              const early = entry.varianceDays < 0;
              const width = `${(Math.abs(entry.varianceDays) / SCALE) * 100}%`;

              return (
                <li key={entry.project} className={styles.row}>
                  <span className={styles.rank}>{String(entry.rank).padStart(2, "0")}</span>

                  <div className={styles.body}>
                    <h2>{entry.project}</h2>
                    <p className={styles.client}>
                      {entry.client} · {entry.region}
                    </p>
                    <p className={styles.note}>{entry.note}</p>
                  </div>

                  <div className={styles.measure}>
                    <p
                      className={`${styles.variance} ${early ? styles.early : styles.late}`}
                      aria-label={
                        entry.varianceDays === 0
                          ? "Delivered on the connection date"
                          : `${Math.abs(entry.varianceDays)} days ${early ? "early" : "late"}`
                      }
                    >
                      {formatVariance(entry.varianceDays)}
                    </p>
                    <div className={styles.track} aria-hidden="true">
                      <span
                        className={early ? styles.barEarly : styles.barLate}
                        style={{ width }}
                      />
                    </div>
                    <p className={styles.facts}>
                      {formatCapacity(entry.capacityMw)} · {entry.cableKm} km · {entry.year}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>

          <p className={styles.method}>
            <strong>How this is measured.</strong> Variance is the date the circuit energised
            against the connection date in the contract at financial close, not against a revised
            programme. Packages where we acted only as reviewer are excluded, because the schedule
            was not ours to hold.
          </p>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
