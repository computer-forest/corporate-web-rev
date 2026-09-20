"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Inter } from "next/font/google";

import { SEARCH_PLACEHOLDER, TOP_NAV } from "@/constants/sbi-home";
/* Type-only, so nothing from the server module reaches the client bundle —
   the import is erased at build. One definition of the shape, shared. */
import type { HeaderLink } from "@/server/cms/siteChrome";

import NavItem from "./NavItem";
import styles from "./Header.module.scss";

interface HeaderProps {
  /**
   * Content for the bar. Defaults to the shipped constants, so a route that
   * renders <Header /> with no props is unaffected — only the marketing
   * layout passes anything.
   */
  content?: {
    brandName: string;
    logoUrl: string;
    searchPlaceholder: string;
    nav: HeaderLink[];
  };
}

const HEADER_FALLBACK = {
  brandName: "SBI Securities",
  logoUrl: "/figma/header/logo-main.svg",
  searchPlaceholder: SEARCH_PLACEHOLDER,
  nav: TOP_NAV.map((item) => ({
    label: item.label,
    href: item.href,
    newTab: false,
    children: [] as HeaderLink[],
  })),
};

/* The header renders on every marketing route, while the Inter that
   `sbi-home.scss` loads reaches only the routes rendering HomeComponent. It
   therefore carries its own copy rather than inheriting the root layout's Open
   Sans — next/font dedupes identical requests, so the home page and the footer,
   which ask for the same family, pay nothing extra. */
const inter = Inter({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--header-font-inter",
});

/** Top Nav — Figma `Top Nav` 0:64969, Pre-Login Home Page Sprint 2. */
export default function Header({ content = HEADER_FALLBACK }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  /* Below 768 the frame keeps only the search glyph in the bar, so the field
     itself drops to a row that the glyph opens. Above it the field is always
     in the bar and this flag never applies. */
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  /* The field advertises a shortcut, so it honours one — leaving the badge
     decorative would be a visible untruth. Nothing else about search is wired:
     there is no search route yet (see the note in the PR description). */
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        searchRef.current?.focus();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className={`${styles.siteHeader} ${inter.variable}`}>
      <div className={styles.inner}>
        {/* SSL-logo — a 182x48 box holding the wordmark and, set against its
            top-right corner, the registered mark, exactly as the frame nests
            the two exports. */}
        <Link href="/" className={styles.logo} aria-label={`${content.brandName} home`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={styles.logoMain} src={content.logoUrl} alt={content.brandName} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={styles.logoMark} src="/figma/header/logo-mark.svg" alt="" aria-hidden="true" />
        </Link>

        <button
          type="button"
          className={styles.menuToggle}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => {
            setMenuOpen((open) => !open);
            setSearchOpen(false);
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/figma/header/m-menu.svg" alt="" width={24} height={24} aria-hidden="true" />
          <span className="visually-hidden">
            {menuOpen ? "Close navigation menu" : "Open navigation menu"}
          </span>
        </button>

        <nav
          id="primary-navigation"
          className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}
          aria-label="Primary navigation"
        >
          <ul className={styles.navList}>
            {content.nav.map((item) => (
              <NavItem
                key={`${item.href}-${item.label}`}
                item={item}
                onNavigate={() => setMenuOpen(false)}
              />
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          {/* Frame 0:43020 — 24 square, first of the three glyphs the mobile
              bar carries. It is the only entry point to the field below 768. */}
          <button
            type="button"
            className={`${styles.iconButton} ${styles.searchToggle}`}
            aria-expanded={searchOpen}
            aria-controls="site-search"
            onClick={() => {
              setMenuOpen(false);
              setSearchOpen((open) => !open);
              if (!searchOpen) {
                window.setTimeout(() => searchRef.current?.focus(), 0);
              }
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/figma/header/m-search.svg" alt="" width={24} height={24} />
            <span className="visually-hidden">
              {searchOpen ? "Close search" : "Search"}
            </span>
          </button>

          <div className={`${styles.search} ${searchOpen ? styles.searchOpen : ""}`}>
            <label htmlFor="site-search" className="visually-hidden">
              Search
            </label>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={styles.searchIcon}
              src="/figma/header/search.svg"
              alt=""
              width={20}
              height={20}
              aria-hidden="true"
            />
            <input
              id="site-search"
              ref={searchRef}
              type="search"
              className={styles.searchInput}
              placeholder={content.searchPlaceholder}
            />
            <span className={styles.shortcut} aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/figma/header/command.svg" alt="" width={16} height={16} />K
            </span>
          </div>

          <Link
            href="/support"
            className={`${styles.iconButton} ${styles.supportButton}`}
            aria-label="Help and support"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/figma/header/headset.svg" alt="" width={16} height={16} />
          </Link>

          {/* Keeps the existing offcanvas contract: AccessibilitySidebar renders
              the panel with this id and Bootstrap wires the toggle. */}
          <button
            type="button"
            className={styles.iconButton}
            data-bs-toggle="offcanvas"
            data-bs-target="#accessibilityPanel"
            aria-controls="accessibilityPanel"
            aria-label="Open accessibility options"
          >
            {/* 17, not 16: this export's artwork fills a 17.0526 viewBox, so
                forcing it to 16 scales by 0.938 and renders its 1.05 stroke at
                0.99px across a fractional offset — a soft grey ring rather than
                the crisp one the frame shows. At 17 it maps ~1:1. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={styles.iconWide}
              src="/figma/header/accessibility.svg"
              alt=""
              width={17}
              height={17}
            />
            {/* Frame 0:43022 — the mobile bar draws the same glyph at 24, a
                different export rather than this one scaled up. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={styles.iconNarrow}
              src="/figma/header/m-accessibility.svg"
              alt=""
              width={24}
              height={24}
            />
          </button>

          <Link href="/sso-realty" className={`${styles.cta} ${styles.ctaSecondary}`}>
            Log In
          </Link>

          <Link href="/demat-form-test" className={`${styles.cta} ${styles.ctaPrimary}`}>
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
