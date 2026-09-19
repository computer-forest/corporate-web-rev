import Link from "next/link";
import styles from "./sb-button.module.scss";

type Variant = "primary" | "secondary" | "tertiary";
type Size = "l" | "m";

interface SbButtonProps {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  href?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  /** Stretch to the width of the containing column. */
  block?: boolean;
  /** Submit buttons hold themselves shut while their form is in flight. */
  disabled?: boolean;
  className?: string;
}

/**
 * button/* from the design system: 8px radius, 44px tall at L and 36px at M,
 * primary filled with the indigo gradient, secondary with the pale one.
 */
export default function SbButton({
  children,
  variant = "primary",
  size = "l",
  href,
  type = "button",
  onClick,
  block = false,
  disabled = false,
  className,
}: SbButtonProps) {
  const classes = [styles.button, styles[variant], styles[size]];
  if (block) classes.push(styles.block);
  if (className) classes.push(className);
  const joined = classes.join(" ");

  if (href) {
    return (
      <Link href={href} className={joined}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={joined}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled || undefined}
    >
      {children}
    </button>
  );
}
