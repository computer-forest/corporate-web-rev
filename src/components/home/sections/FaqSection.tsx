"use client";

import { useState } from "react";
import Reveal from "@/components/ui/Reveal";
import SbButton from "@/components/ui/SbButton";
import { FAQS } from "@/constants/sbi-home";
import styles from "./faq.module.scss";

/** Frequently Asked Questions — desktop 1:60054, mobile 0:54418. */
export default function FaqSection() {
  const [open, setOpen] = useState(0);

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.aside}>
          <h2 className={styles.title}>
            Frequently Asked
            <br />
            Questions
          </h2>
          <SbButton href="#faqs" className={styles.cta}>
            View All FAQs
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/figma/faq/arrow-right.svg" alt="" width={16} height={16} />
          </SbButton>
        </div>

        <ul className={styles.list}>
          {FAQS.map((faq, i) => (
            <li
              key={faq.question}
              className={`${styles.row} ${open === i ? styles.open : ""}`}
            >
              <h3>
                <button
                  type="button"
                  className={styles.question}
                  aria-expanded={open === i}
                  aria-controls={`faq-answer-${i}`}
                  onClick={() => setOpen(open === i ? -1 : i)}
                >
                  <span className={styles.questionText}>{faq.question}</span>
                  {/* Both glyphs are drawn and cross-faded; swapping the src
                      snaps the sign over while the answer is still opening. */}
                  <span className={styles.sign} aria-hidden="true">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/figma/faq/plus.svg" alt="" width={24} height={24} />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/figma/faq/minus.svg" alt="" width={24} height={24} />
                  </span>
                </button>
              </h3>
              <Reveal open={open === i} id={`faq-answer-${i}`}>
                <div className={styles.answer}>
                  <p className={styles.answerText}>{faq.answer}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
