import styles from "./section-heading.module.scss";

interface Props {
  eyebrow: string;
  title: string;
  lede?: string;
  tone?: "paper" | "ink";
}

export default function SectionHeading({ eyebrow, title, lede, tone = "paper" }: Props) {
  return (
    <header className={`${styles.heading} ${tone === "ink" ? styles.onInk : ""}`}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h2>{title}</h2>
      {lede && <p className={styles.lede}>{lede}</p>}
    </header>
  );
}
