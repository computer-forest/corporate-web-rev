"use client";

import { usePathname } from "next/navigation";
import HeaderComponent from "@/components/header/HeaderComponent";
import FooterComponent from "@/components/footer/FooterComponent";
import { navigationService } from "@/services/navigation.service";
import { focusMain } from "@/utils/a11y";
import styles from "./app-shell.module.scss";

/** Equivalent of AppComponent's template: skip link, header, main, footer. */
export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const chromeless = navigationService.isChromeless(pathname);

  return (
    <div className={styles.shell}>
      <a
        className="skip-link"
        href="#main-content"
        onClick={(event) => {
          event.preventDefault();
          focusMain();
        }}
      >
        Skip to main content
      </a>

      {!chromeless && <HeaderComponent />}

      <main id="main-content" tabIndex={-1} className={styles.main}>
        {children}
      </main>

      {!chromeless && <FooterComponent />}
    </div>
  );
}
