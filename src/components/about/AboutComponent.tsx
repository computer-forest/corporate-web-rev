import PageHero from "@/components/ui/PageHero";
import CtaBanner from "@/components/ui/CtaBanner";
import SectionHeading from "@/components/ui/SectionHeading";
import { SITE, STATS } from "@/constants/site";
import { ROUTES } from "@/lib/app-routing";
import styles from "./about.module.scss";

const PRINCIPLES = [
  {
    title: "The survey answers the route question",
    body: "Most route disputes are data-density disputes. We write the survey scope against the decisions it has to support eighteen months later, not against a standard template.",
  },
  {
    title: "One team holds all four phases",
    body: "Packages fail at the seams between disciplines. The engineer who reads the sub-bottom data is the one who signs the burial assessment, and they are in the same room as the person negotiating the crossing.",
  },
  {
    title: "Independence where it counts",
    body: "We specify and interpret survey campaigns. We do not acquire them. Keeping acquisition contractual and interpretation independent is why our route recommendations hold up under review.",
  },
  {
    title: "The connection date is the deliverable",
    body: "Every study, drawing and agreement is measured against one thing: whether the circuit energises when the developer said it would. Nothing else on the package is worth much if that slips.",
  },
];

export default function AboutComponent() {
  return (
    <>
      <PageHero
        eyebrow="The practice"
        title="An engineering practice, not a consultancy."
        lede={SITE.description}
        meta={STATS.map((stat) => ({ label: stat.label, value: stat.value }))}
      />

      <section className={styles.section}>
        <div className="shell">
          <div className={styles.split}>
            <SectionHeading
              eyebrow="Since 2009"
              title="Started by three engineers who kept being handed the same broken survey."
            />
            <div className={styles.story}>
              <p>
                Fathom Grid began with a route package in the Irish Sea that had been surveyed
                twice and engineered once, badly. The problem was not the data — it was that
                nobody had told the survey what the route needed to know.
              </p>
              <p>
                Sixteen years on, the practice is fifty-four engineers across Aberdeen, Rotterdam
                and Taipei. We still take the same view: the cheapest place to fix a transmission
                package is in its survey scope, and the most expensive place is offshore with a
                cable-lay vessel on day rate.
              </p>
              <p>
                We work directly for developers, transmission owners and, occasionally, for the
                lenders behind them. We do not act as an independent reviewer on packages we
                engineered ourselves.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.principles}`}>
        <div className="shell">
          <SectionHeading eyebrow="How we work" title="Four positions we hold." tone="ink" />
          <div className={styles.grid}>
            {PRINCIPLES.map((principle, index) => (
              <article key={principle.title}>
                <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
                <h3>{principle.title}</h3>
                <p>{principle.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Judge us on the record, not the pitch."
        body="Every package we delivered is ranked by days early or late against the contracted connection date, including the one that ran late."
        action={{ href: ROUTES.leaderboard, label: "See the leaderboard" }}
      />
    </>
  );
}
