"use client";

import { useState } from "react";
import CardRail from "@/components/ui/CardRail";
import SectionHead from "@/components/ui/SectionHead";
import SegmentedTabs from "@/components/ui/SegmentedTabs";
import { LEARN_TABS, LESSONS } from "@/constants/sbi-home";
import styles from "./learn.module.scss";

/**
 * Learn before you invest — desktop 1:59642, mobile Learn & Educate 0:66064.
 *
 * The Figma note sets out the interaction: the top arrow goes to the listing
 * for the chosen tab, a card goes to its detail page, the tabs change as the
 * rail scrolls, and the arrows page that rail.
 */
export default function LearnSection() {
  const [tab, setTab] = useState<string>(LEARN_TABS[0]);

  /**
   * "The tabs changes on scroll" — the rail reports the card in view and the
   * tabs follow. There are more lessons than tabs, so the card index is mapped
   * across the tab list rather than paired one to one.
   */
  const tabForPage = (page: number) => {
    const spread = (page - 1) / Math.max(1, LESSONS.length - 1);
    return LEARN_TABS[Math.round(spread * (LEARN_TABS.length - 1))];
  };

  const tabSlug = tab.toLowerCase().replace(/\s+/g, "-");

  return (
    <section className={styles.section} id="investor-awareness">
      <div className={styles.inner}>
        {/* The arrow leads to the listing for whichever tab is chosen. */}
        <SectionHead
          title="Learn before you invest"
          href={`#learn-${tabSlug}`}
          hrefLabel={`All lessons for ${tab}`}
        />

        <div className={styles.tabs}>
          <SegmentedTabs
            tabs={LEARN_TABS}
            active={tab}
            onChange={setTab}
            label="Audience"
            width={543}
          />
        </div>

        <CardRail
          count={LESSONS.length}
          label="Lessons"
          showProgress
          onPageChange={(page) => setTab(tabForPage(page))}
        >
          {LESSONS.map((lesson, i) => (
            <article className={styles.card} key={`${lesson.title}-${i}`}>
              <a href={`#lesson-${i + 1}`} className={styles.link}>
                {/* The play badge and runtime are set into the thumbnail, so the
                    runtime is repeated in the link text for assistive tech. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/figma/learn/lesson-${(i % 4) + 1}.png`} alt="" aria-hidden="true" />
                <h3>{lesson.title}</h3>
                <span className="sr-only">Watch, {lesson.duration}</span>
              </a>
            </article>
          ))}
        </CardRail>
      </div>
    </section>
  );
}
