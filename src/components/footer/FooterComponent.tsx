import SslLogo from "@/components/ui/SslLogo";
import {
  BRAND,
  FOOTER_CTA,
  FOOTER_LEGAL,
  FOOTER_PRIMARY,
  FOOTER_SECONDARY,
  STOCK_INDEX_LETTERS,
  STOCK_LINKS,
} from "@/constants/sbi-home";
import styles from "./footer.module.scss";

const SOCIALS = [
  { slug: "instagram", label: "Instagram" },
  { slug: "x", label: "X" },
  { slug: "facebook", label: "Facebook" },
  { slug: "linkedin", label: "LinkedIn" },
  { slug: "youtube", label: "YouTube" },
];

function LinkColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div className={styles.column}>
      <h3>{title}</h3>
      <ul>
        {links.map((link) => (
          <li key={link}>
            <a href="#footer-link">{link}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Footer — desktop 1:60068, mobile 0:54436. */
export default function FooterComponent() {
  return (
    <footer className={`${styles.footer} sb-scope`}>
      {/* --- Boiler Plate: download the app --- */}
      <div className={styles.ctaWrap}>
        <div className={styles.cta}>
          <div className={styles.ctaCopy}>
            <div className={styles.ctaText}>
              <h2>{FOOTER_CTA.title}</h2>
              <p>{FOOTER_CTA.body}</p>
            </div>
            <a className={styles.ctaButton} href="#download-app">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/figma/footer/download.svg" alt="" width={16} height={16} />
              {FOOTER_CTA.cta}
            </a>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={styles.ctaPhone} src="/figma/footer/cta-phone.png" alt="" aria-hidden="true" />
        </div>
      </div>

      <div className={styles.body}>
        {/* --- brand block + the two headline link columns --- */}
        <div className={styles.top}>
          <div className={styles.brand}>
            <SslLogo width={152} />
            <p className={styles.address}>{BRAND.address}</p>
            <p className={styles.contact}>
              <span>Call:</span> {BRAND.phone}
            </p>
            <p className={styles.contact}>
              <span>E-mail:</span> {BRAND.email}
            </p>

            <div className={styles.social}>
              <span>Connect with us</span>
              {SOCIALS.map((social) => (
                <a key={social.slug} href="#social" aria-label={social.label}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/figma/footer/social-${social.slug}.png`}
                    alt=""
                    width={26}
                    height={26}
                  />
                </a>
              ))}
            </div>

            <a className={styles.help} href="#support">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/figma/nav/headset.png" alt="" width={20} height={20} />
              Help &amp; Support
            </a>
          </div>

          <div className={styles.topColumns}>
            {FOOTER_PRIMARY.map((column) => (
              <LinkColumn key={column.title} {...column} />
            ))}
          </div>
        </div>

        <hr className={styles.rule} />

        {/* --- the five-column link grid --- */}
        <div className={styles.columns}>
          {FOOTER_SECONDARY.map((group, i) => (
            <div className={styles.group} key={i}>
              {group.map((column) => (
                <LinkColumn key={column.title} {...column} />
              ))}
            </div>
          ))}
        </div>

        <hr className={styles.rule} />

        {/* --- A-Z stock index --- */}
        <div className={styles.index}>
          <span className={styles.indexLabel}>Stocks</span>
          <ul className={styles.letters}>
            {STOCK_INDEX_LETTERS.map((letter) => (
              <li key={letter}>
                <a href="#stocks">{letter}</a>
              </li>
            ))}
          </ul>
        </div>

        <ul className={styles.stockLinks}>
          {STOCK_LINKS.map((link, i) => (
            <li key={`${link}-${i}`}>
              <a href="#stock-list">{link}</a>
            </li>
          ))}
        </ul>

        {/* --- statutory text --- */}
        <div className={styles.legal}>
          <p>
            {FOOTER_LEGAL.registration[0]}
            <br />
            {FOOTER_LEGAL.registration[1]}
          </p>
          <p>{FOOTER_LEGAL.trading}</p>
          <p>{FOOTER_LEGAL.authorization}</p>
          <p>{FOOTER_LEGAL.warning}</p>
          <p>{FOOTER_LEGAL.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
