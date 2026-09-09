import Link from "next/link";
import styles from "./button.module.scss";

interface Props {
  href?: string;
  children: React.ReactNode;
  variant?: "solid" | "line" | "ghost";
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
}

export default function Button({
  href,
  children,
  variant = "solid",
  type = "button",
  disabled,
  onClick,
}: Props) {
  const className = `${styles.button} ${styles[variant]}`;

  if (href) {
    return (
      <Link href={href} className={className}>
        <span>{children}</span>
        <svg viewBox="0 0 24 12" aria-hidden="true" className={styles.arrow}>
          <path d="M0 6h21M16 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      </Link>
    );
  }

  return (
    <button type={type} className={className} disabled={disabled} onClick={onClick}>
      <span>{children}</span>
      <svg viewBox="0 0 24 12" aria-hidden="true" className={styles.arrow}>
        <path d="M0 6h21M16 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    </button>
  );
}
