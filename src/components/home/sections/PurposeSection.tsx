"use client";

import { useState } from "react";

import Reveal from "@/components/ui/Reveal";
import SbButton from "@/components/ui/SbButton";
import SectionHead from "@/components/ui/SectionHead";
import { PURPOSE } from "@/constants/sbi-home";
import useMediaQuery, { MOBILE_QUERY } from "@/utils/useMediaQuery";
import styles from "./purpose.module.scss";

/**
 * Invest with a purpose — desktop 1:58702, mobile 0:58378.
 *
 * The 1440 frame sets the four goals side by side, every one of them open.
 * The 360 frame — Plan Your Future Listing 0:58385 — keeps one open and
 * collapses the rest to a titled row with a plus, so the section fits the
 * 527 it is given rather than running for four screens.
 */
export default function PurposeSection() {
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const [openSlug, setOpenSlug] = useState(PURPOSE.cards[0].slug);

  /**
   * useMediaQuery reports the wide layout on the first render by design, so
   * every goal starts open and three of them shut again once its effect runs.
   * Left to transition, that plays as an unprompted animation on load, so the
   * reveals stay instant until the reader actually reaches for one.
   *
   * Armed on the capture phase of the gesture that precedes the toggle, not
   * on the click itself: the transition has to be in place before the open
   * state changes, or the first one is computed against `transition: none`.
   */
  const [animate, setAnimate] = useState(false);
  const arm = () => setAnimate(true);

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <SectionHead
          title={PURPOSE.title}
          subtext={PURPOSE.subtext}
          href="#goals"
          hrefLabel="All investment goals"
          titleBreakAfter={2}
          subtextBreakAfter={7}
        />

        <ul className={styles.grid} onPointerDownCapture={arm} onKeyDownCapture={arm}>
          {PURPOSE.cards.map((card) => {
            const open = !isMobile || card.slug === openSlug;

            return (
              <li
                key={card.slug}
                className={`${styles.card} ${open ? "" : styles.collapsed}`}
              >
                <Reveal open={open} animate={animate} className={styles.artReveal}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className={styles.art}
                    src={`/figma/purpose/${card.slug}.png`}
                    alt=""
                    aria-hidden="true"
                  />
                </Reveal>

                {/* The whole title row toggles, not just the plus: at 40px the
                    glyph alone is a smaller target than the row it sits in and
                    than the 44 a touch target wants. The listing always leaves
                    one goal open, so the open row's button is a no-op the way
                    the checked radio in a group is — 0:58385 gives it no
                    affordance to close. */}
                <h3 className={styles.cardTitle}>
                  <button
                    type="button"
                    className={styles.cardHead}
                    aria-expanded={open}
                    aria-controls={`purpose-${card.slug}`}
                    onClick={() => setOpenSlug(card.slug)}
                  >
                    <span className={styles.titleText}>{card.title}</span>
                    {/* Buttons I0:18179;1930:49451 — a 40-wide toggle carrying
                        a 16px plus, drawn only on the 360 frame. */}
                    <span className={styles.toggle} aria-hidden="true">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/figma/faq/plus.svg" alt="" width={16} height={16} />
                    </span>
                  </button>
                </h3>

                <Reveal
                  open={open}
                  animate={animate}
                  id={`purpose-${card.slug}`}
                  className={styles.bodyReveal}
                >
                  <div className={styles.body}>
                    <p className={styles.lede}>{card.lede}</p>
                    <ul className={styles.points}>
                      {card.points.map((point) => (
                        <li key={point}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            className={styles.tick}
                            src="/figma/purpose/tick.svg"
                            alt=""
                            width={16}
                            height={16}
                          />
                          {point}
                        </li>
                      ))}
                    </ul>
                    <SbButton block>{card.cta}</SbButton>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
