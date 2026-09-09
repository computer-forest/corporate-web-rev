"use client";

import { useState } from "react";
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
          <SbButton href="#faqs">View All FAQs →</SbButton>
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
                  {faq.question}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className={styles.sign}
                    src={open === i ? "/figma/faq/minus.svg" : "/figma/faq/plus.svg"}
                    alt=""
                    width={24}
                    height={24}
                  />
                </button>
              </h3>
              <div id={`faq-answer-${i}`} className={styles.answer} hidden={open !== i}>
                <p>{faq.answer}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
