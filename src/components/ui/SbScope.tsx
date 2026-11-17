import "@/components/home/sbi-home.scss";
import { inter, poppins } from "./sb-fonts";

/**
 * Wrapper that gives an inner page the `--sb-*` design tokens, fonts and
 * scoped element defaults the redesigned pages are authored against.
 */
export default function SbScope({
  children,
  className = "",
}: {
  children: React.ReactNode;
  /** Page-level token overrides, e.g. the About page's Poppins data face. */
  className?: string;
}) {
  return (
    <div className={`sb-scope ${poppins.variable} ${inter.variable} ${className}`.trim()}>
      {children}
    </div>
  );
}
