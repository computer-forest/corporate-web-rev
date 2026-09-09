"use client";

import { useState } from "react";
import CardRail from "@/components/ui/CardRail";
import SbButton from "@/components/ui/SbButton";
import SectionHead from "@/components/ui/SectionHead";
import SegmentedTabs from "@/components/ui/SegmentedTabs";
import { IPOS, IPO_TABS } from "@/constants/sbi-home";
import styles from "./ipos.module.scss";

/** IPOs — desktop Why SBI 1:58378, mobile IPO's 0:46855. */
export default function IposSection() {
  const [tab, setTab] = useState<string>(IPO_TABS[0]);

  return (
    <section className={styles.section} id="trade-and-invest">
      <div className={styles.inner}>
        <SectionHead title="IPOs" href="#ipos" hrefLabel="All IPOs" />

        <div className={styles.tabs}>
          <SegmentedTabs tabs={IPO_TABS} active={tab} onChange={setTab} label="IPO status" />
        </div>

        <CardRail count={IPOS.length} label="Open IPOs" showProgress>
          {IPOS.map((ipo, i) => (
            <article className={styles.card} key={i}>
              <div className={styles.cardBody}>
                <header className={styles.cardHead}>
                  <h3 className={styles.name}>{ipo.name}</h3>
                  <span className={styles.chip}>{ipo.status}</span>
                </header>

                <div className={styles.divider} />

                <dl className={styles.facts}>
                  <div>
                    <dt>Date Range</dt>
                    <dd>{ipo.dateRange}</dd>
                  </div>
                  <div className={styles.end}>
                    <dt>Price Band</dt>
                    <dd>{ipo.priceBand}</dd>
                  </div>
                  <div>
                    <dt>Issue Size</dt>
                    <dd>{ipo.issueSize}</dd>
                  </div>
                  <div className={styles.end}>
                    <dt>Min. Investment</dt>
                    <dd>
                      {ipo.minInvestment}
                      <span className={styles.unit}>{ipo.minInvestmentUnit}</span>
                    </dd>
                  </div>
                </dl>

                <div className={styles.actions}>
                  <SbButton block>Apply</SbButton>
                  <SbButton variant="secondary" block>
                    Know More
                  </SbButton>
                </div>
              </div>

              <p className={styles.listing}>
                {ipo.listingNote} <strong>{ipo.listingDate}</strong>
              </p>
            </article>
          ))}
        </CardRail>
      </div>
    </section>
  );
}
