"use client";

import { useState } from "react";
import SbButton from "@/components/ui/SbButton";
import { HERO } from "@/constants/sbi-home";
import styles from "./hero.module.scss";

/** Hero Section Main — desktop 1:60070, mobile Hero 3 0:33295 + Hero 2 0:39885. */
export default function HeroSection() {
  const [agreed, setAgreed] = useState(true);

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <h1 id="hero-title" className={styles.title}>
            <span className={styles.titleLead}>{HERO.titleLead}</span>
            {/* The headline cycles in place inside a fixed two-line window. */}
            <span className={styles.rotator}>
              <span className={styles.rotatorTrack}>
                {[...HERO.rotatingLines, HERO.rotatingLines[0]].map((lines, i) => (
                  <span className={styles.rotatorItem} key={i} aria-hidden={i === 3}>
                    {lines[0]}
                    <br />
                    {lines[1]}
                  </span>
                ))}
              </span>
            </span>
          </h1>
          <p className={styles.subtext}>
            {HERO.subtext[0]}
            <br />
            {HERO.subtext[1]}
          </p>
        </div>

        <div className={styles.mockup} aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/figma/hero/mockup.png" alt="" />
        </div>

        <div className={styles.watermarks} aria-hidden="true">
          <p className={styles.watermark}>{HERO.watermarkLeft}</p>
          <p className={styles.watermark}>{HERO.watermarkRight}</p>
        </div>

        <form className={styles.form} onSubmit={(event) => event.preventDefault()}>
          <div className={`${styles.field} ${styles.fieldName}`}>
            <label htmlFor="hero-name">
              <span className={styles.desktopOnly}>{HERO.form.nameLabel}</span>
              <span className={styles.mobileOnly}>{HERO.formMobile.nameLabel}</span>
            </label>
            <input id="hero-name" name="name" type="text" placeholder={HERO.form.namePlaceholder} />
          </div>

          <div className={`${styles.field} ${styles.fieldMobile}`}>
            <label htmlFor="hero-mobile">
              <span className={styles.desktopOnly}>{HERO.form.mobileLabel}</span>
              <span className={styles.mobileOnly}>{HERO.formMobile.mobileLabel}</span>
            </label>
            <input
              id="hero-mobile"
              name="mobile"
              type="tel"
              inputMode="numeric"
              placeholder={HERO.form.mobilePlaceholder}
            />
            <p className={styles.help}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/figma/hero/info.svg" alt="" width={16} height={16} />
              {HERO.form.mobileHelp}
            </p>
          </div>

          <label className={styles.consent}>
            <input
              type="checkbox"
              checked={agreed}
              onChange={(event) => setAgreed(event.target.checked)}
            />
            <span className={styles.checkbox} aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/figma/hero/check.svg" alt="" width={12} height={12} />
            </span>
            {HERO.form.consent}
          </label>

          <SbButton type="submit" block>
            {HERO.form.submit}
          </SbButton>
        </form>

        <dl className={styles.kpis}>
          <div className={styles.kpi}>
            <dd className={styles.kpiValue}>{HERO.kpis.downloads.value}</dd>
            <dt className={styles.kpiLabel}>{HERO.kpis.downloads.label}</dt>
          </div>
          <div className={styles.kpi}>
            <dd className={`${styles.kpiValue} ${styles.kpiRating}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/figma/hero/star.svg" alt="" />
              <span>{HERO.kpis.rating.value}</span>
            </dd>
            <dt className={styles.kpiLabel}>{HERO.kpis.rating.label}</dt>
          </div>
          <div className={styles.kpi}>
            <dd className={styles.kpiLogo}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/figma/hero/backed-by-sbi.png" alt="" />
            </dd>
            <dt className={styles.kpiLabel}>{HERO.kpis.backing.label}</dt>
          </div>
        </dl>
      </div>
    </section>
  );
}
