"use client";

import { useRef, useState } from "react";
import Pager from "@/components/ui/Pager";
import SectionHead from "@/components/ui/SectionHead";
import type { AboutContent } from "@/types/pages";
import styles from "./csr.module.scss";

/**
 * CSR Activities — desktop 4:127367, mobile 1:72673. A carousel with the active
 * card large between its neighbours; it moves on horizontal scroll, on the
 * arrows, or on clicking a neighbour (the Figma interaction note).
 */
export default function CsrSection({ csr }: { csr: AboutContent["csr"] }) {
  const CSR_ACTIVITIES = csr.items;
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const wheelLock = useRef(false);
  const total = CSR_ACTIVITIES.length;

  const go = (delta: number) => {
    setDir(delta > 0 ? 1 : -1);
    setActive((i) => (i + delta + total) % total);
  };

  const onWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY) || Math.abs(e.deltaX) < 20) return;
    if (wheelLock.current) return;
    wheelLock.current = true;
    go(e.deltaX > 0 ? 1 : -1);
    window.setTimeout(() => {
      wheelLock.current = false;
    }, 500);
  };

  const prev = (active - 1 + total) % total;
  const next = (active + 1) % total;

  const slots = [
    { index: prev, role: "prev" as const },
    { index: active, role: "active" as const },
    { index: next, role: "next" as const },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <SectionHead title={csr.title} align="center" mobileStart size="h2" />

        <div key={active} className={styles.stage} data-dir={dir} onWheel={onWheel}>
          {slots.map(({ index, role }) => {
            const item = CSR_ACTIVITIES[index];
            const isActive = role === "active";
            const Tag = isActive ? "div" : "button";
            return (
              <Tag
                key={role}
                className={`${styles.card} ${styles[role]}`}
                {...(isActive
                  ? {}
                  : {
                      type: "button" as const,
                      onClick: () => go(role === "prev" ? -1 : 1),
                      "aria-label": `Show ${item.title}`,
                    })}
              >
                <span className={styles.media}>
                  {item.layers.map((layer) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={layer} src={layer} alt="" />
                  ))}
                  <span className={styles.shade} aria-hidden="true">
                    <span className={styles.shadeBand} />
                  </span>
                  <span className={styles.name}>{item.title}</span>
                </span>
                {isActive && item.text ? <span className={styles.text}>{item.text}</span> : null}
              </Tag>
            );
          })}
        </div>

        <div className={`${styles.pager} ${styles.pagerDesktop}`}>
          <Pager index={active} total={total} onPrev={() => go(-1)} onNext={() => go(1)} label="activity" rules />
        </div>
        <div className={`${styles.pager} ${styles.pagerMobile}`}>
          <Pager index={active} total={total} onPrev={() => go(-1)} onNext={() => go(1)} label="activity" rules align="end" />
        </div>
      </div>
    </section>
  );
}
