import Link from "next/link";
import { Inter, Poppins } from "next/font/google";

import type { FooterContent } from "@/server/cms/siteChrome";

import FooterLinkGroup from "./FooterLinkGroup";
import styles from "./Footer.module.scss";

/* The footer renders on every marketing route, while the Poppins/Inter that
   `sbi-home.scss` loads reach only the routes rendering HomeComponent. It
   therefore carries its own copies rather than inheriting the root layout's
   Open Sans — next/font dedupes identical requests, so the home page, which
   asks for the same two families, pays nothing extra. */
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--footer-font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--footer-font-poppins",
});


interface FooterProps {
  /** Content for the band. Supplied by the marketing layout. */
  content: FooterContent;
}

/** Footer — Figma `Footer` 0:64968, Pre-Login Home Page Sprint 2. */
export default function Footer({ content }: FooterProps) {
  return (
    <footer className={`${styles.siteFooter} ${inter.variable} ${poppins.variable}`}>
      <div className={styles.inner}>
        <div className={styles.band}>
          <div className={styles.top}>
            <div className={styles.contact}>
            <Link href="/" className={styles.logo} aria-label={`${content.brandName} home`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={content.logoUrl} alt={content.brandName} />
            </Link>

            <address className={styles.address}>{content.address}</address>

            <p className={styles.contactLine}>
              <span className={styles.contactLabel}>Call:</span>
              <a href={`tel:${content.phone.split("/")[0].replace(/\s/g, "")}`}>{content.phone}</a>
            </p>

            <p className={styles.contactLine}>
              <span className={styles.contactLabel}>E-mail:</span>
              <a href={`mailto:${content.email}`}>{content.email}</a>
            </p>

            <div className={styles.social}>
              <span className={styles.contactLabel}>{content.connectLabel}</span>
              <ul className={styles.socialList}>
                {content.socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      className={styles.socialLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={s.iconUrl} alt="" width={24} height={24} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {content.support ? (
              <Link href={content.support.href} className={styles.support}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/figma/footer/headset.svg" alt="" width={16} height={16} />
                {content.support.label}
              </Link>
            ) : null}
          </div>

            <div className={styles.primaryGroups}>
              {content.primary.map((group) => (
                <FooterLinkGroup
                  key={group.title}
                  group={group}

                  defaultOpen
                />
              ))}
            </div>
          </div>
        </div>

        <hr className={`${styles.rule} ${styles.ruleUpper}`} />

        <div className={styles.band}>
          <div className={styles.columns}>
            {content.columns.map((column, i) => (
              <div className={styles.column} key={column[0]?.title ?? i}>
                {column.map((group) => (
                  <FooterLinkGroup key={group.title} group={group} />
                ))}
              </div>
            ))}
          </div>
        </div>

        <hr className={`${styles.rule} ${styles.ruleLower}`} />

        <div className={styles.band}>
          <div className={styles.stocks}>
            <h2 className={styles.stocksHeading}>{content.stocksHeading}</h2>
          <ul className={styles.letters}>
            {content.letters.map((entry) => (
              <li key={entry.label}>
                <Link
                  href={entry.href}
                  className={styles.letter}
                  aria-label={`Stocks starting with ${entry.label}`}
                >
                  {entry.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <ul className={styles.chips}>
          {content.chips.map((chip, i) => (
            <li key={`${chip.label}-${i}`}>
              <Link href={chip.href} className={styles.chip} title={chip.label}>
                {chip.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.legal}>
          <p className={styles.legalTight}>
            {content.legal.registration[0]}
            <br />
            {content.legal.registration[1]}
          </p>
          <p>{content.legal.trading}</p>
          <p>{content.legal.authorization}</p>
          <p>{content.legal.warning}</p>
          <p>{content.legal.copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
