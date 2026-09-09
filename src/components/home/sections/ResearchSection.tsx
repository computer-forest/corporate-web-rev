"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/SbIcons";
import SectionHead from "@/components/ui/SectionHead";
import SegmentedTabs from "@/components/ui/SegmentedTabs";
import { RESEARCH, RESEARCH_TABS } from "@/constants/sbi-home";
import styles from "./research.module.scss";

/** Analysis you can trust — desktop 1:59599, mobile 0:47880. */
function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function ResearchSection() {
  const [tab, setTab] = useState<string>(RESEARCH_TABS[0]);

  /**
   * Research cards 0:59780 — mobile lays the cards out as an 806-wide rail
   * rather than a grid, with a pagination row under it. Rail mode is read off
   * the element (it is the one that overflows) rather than duplicating the
   * breakpoint in JS, exactly as the testimonials rail does.
   */
  const railRef = useRef<HTMLUListElement>(null);
  const [isRail, setIsRail] = useState(false);
  const [railIndex, setRailIndex] = useState(0);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const measure = () => setIsRail(rail.scrollWidth > rail.clientWidth + 1);
    const onScroll = () => {
      const card = rail.firstElementChild as HTMLElement | null;
      if (!card) return;
      setRailIndex(Math.round(rail.scrollLeft / (card.clientWidth + 16)));
    };

    measure();
    rail.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      rail.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const page = (delta: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.firstElementChild as HTMLElement | null;
    rail.scrollBy({ left: delta * ((card?.clientWidth ?? 258) + 16), behavior: "smooth" });
  };

  return (
    <section className={styles.section} id="research">
      <div className={styles.inner}>
        <SectionHead
          title="Analysis you can trust"
          href="#research-reports"
          hrefLabel="All research reports"
        />

        <div className={styles.tabs}>
          <SegmentedTabs
            tabs={RESEARCH_TABS}
            active={tab}
            onChange={setTab}
            label="Research type"
          />
        </div>

        <ul className={styles.grid} ref={railRef}>
          {RESEARCH.map((report, i) => (
            <li key={report.title} className={styles.card}>
              {/* The report kind is set inside the artwork, so it is repeated
                  here for assistive tech rather than drawn twice. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className={styles.cover}
                src={`/figma/research/report-${i + 1}.png`}
                alt=""
                aria-hidden="true"
              />
              <h3 className={styles.title}>
                <span className="sr-only">{report.kind}: </span>
                {report.title}
              </h3>
              <p className={styles.date}>{report.date}</p>
            </li>
          ))}
        </ul>

        {/* Pagination 0:66038 — mobile only: one dotted rule, then the arrows
            and the page pill hard against the right edge. */}
        <div className={styles.footer} aria-hidden={!isRail}>
          <span className={styles.rule} aria-hidden="true" />
          <div className={styles.controls}>
            <button
              type="button"
              className={styles.pageArrow}
              onClick={() => page(-1)}
              aria-label="Previous reports"
            >
              <ChevronLeftIcon />
            </button>
            <p className={styles.pill} aria-live="polite">
              <span className={styles.current}>{pad(railIndex + 1)}</span>
              <span className={styles.total}>/{pad(RESEARCH.length)}</span>
            </p>
            <button
              type="button"
              className={styles.pageArrow}
              onClick={() => page(1)}
              aria-label="Next reports"
            >
              <ChevronRightIcon />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
