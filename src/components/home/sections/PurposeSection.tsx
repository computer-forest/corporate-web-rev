import SbButton from "@/components/ui/SbButton";
import SectionHead from "@/components/ui/SectionHead";
import { PURPOSE } from "@/constants/sbi-home";
import styles from "./purpose.module.scss";

/** Invest with a purpose — desktop 1:58702. */
export default function PurposeSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <SectionHead
          title={PURPOSE.title}
          subtext={PURPOSE.subtext}
          href="#goals"
          hrefLabel="All investment goals"
        />

        <ul className={styles.grid}>
          {PURPOSE.cards.map((card) => (
            <li key={card.slug} className={styles.card}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className={styles.art}
                src={`/figma/purpose/${card.slug}.png`}
                alt=""
                aria-hidden="true"
              />
              <h3 className={styles.cardTitle}>{card.title}</h3>
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
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
