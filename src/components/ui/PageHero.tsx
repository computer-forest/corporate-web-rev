import styles from "./page-hero.module.scss";

interface Props {
  eyebrow: string;
  title: string;
  lede?: string;
  meta?: Array<{ label: string; value: string }>;
}

export default function PageHero({ eyebrow, title, lede, meta }: Props) {
  return (
    <section className={styles.hero}>
      <div className="shell">
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1>{title}</h1>
        {lede && <p className={styles.lede}>{lede}</p>}
        {meta && (
          <dl className={styles.meta}>
            {meta.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}
