"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import SslLogo from "@/components/ui/SslLogo";
import SbButton from "@/components/ui/SbButton";
import { SEARCH_PLACEHOLDER, TOP_NAV } from "@/constants/sbi-home";
import { ROUTES } from "@/lib/app-routing";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import styles from "./header.module.scss";

/** Top Nav — desktop 1:60069, mobile 0:33287. */
export default function HeaderComponent() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useLockBodyScroll(open);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <Link href={ROUTES.home} className={styles.logo} aria-label="SBI Securities home">
          <span className={styles.logoDesktop}>
            <SslLogo width={182} />
          </span>
          <span className={styles.logoMobile}>
            <SslLogo width={121} />
          </span>
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          {TOP_NAV.map((item) => (
            <a key={item.label} href={item.href} className={styles.navLink}>
              {item.label}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/figma/nav/caret-down.svg" alt="" width={16} height={16} />
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <form
            className={styles.search}
            role="search"
            onSubmit={(event) => event.preventDefault()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/figma/nav/search.svg" alt="" width={20} height={20} />
            <input
              type="search"
              placeholder={SEARCH_PLACEHOLDER}
              aria-label={SEARCH_PLACEHOLDER}
            />
            <span className={styles.shortcut} aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/figma/nav/cmd-key.svg" alt="" width={16} height={16} />K
            </span>
          </form>

          <button type="button" className={styles.iconButton} aria-label="Talk to support">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/figma/nav/headset.png" alt="" width={16} height={16} />
          </button>
          <button type="button" className={styles.iconButton} aria-label="Accessibility options">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/figma/nav/accessibility-desktop.png" alt="" width={16} height={16} />
          </button>

          <SbButton variant="secondary" size="m" href="#log-in">
            Log In
          </SbButton>
          <SbButton variant="primary" size="m" href="#get-started">
            Get Started
          </SbButton>
        </div>

        <div className={styles.mobileActions}>
          <button type="button" className={styles.iconButton} aria-label="Search">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/figma/nav/search-mobile.svg" alt="" width={24} height={24} />
          </button>
          <button type="button" className={styles.iconButton} aria-label="Accessibility options">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/figma/nav/accessibility.svg" alt="" width={24} height={24} />
          </button>
          <button
            type="button"
            className={styles.iconButton}
            aria-expanded={open}
            aria-controls="primary-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/figma/nav/menu.svg" alt="" width={24} height={24} />
          </button>
        </div>
      </div>

      <div id="primary-menu" className={styles.drawer} hidden={!open}>
        <nav aria-label="Primary, mobile">
          {TOP_NAV.map((item) => (
            <a key={item.label} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className={styles.drawerActions}>
          <SbButton variant="secondary" href="#log-in" block>
            Log In
          </SbButton>
          <SbButton variant="primary" href="#get-started" block>
            Get Started
          </SbButton>
        </div>
      </div>
    </header>
  );
}
