"use client";

import { useState } from "react";
import Link from "next/link";

import type { FooterGroup } from "@/server/cms/siteChrome";
import useMediaQuery, { MOBILE_QUERY } from "@/utils/useMediaQuery";
import styles from "./Footer.module.scss";

interface FooterLinkGroupProps {
  /* Links now arrive with their hrefs. This component used to derive them
     from the label, because the constants listed labels only; the CMS
     stores both, so the rule moved to the fallback in siteChrome.ts and
     this file simply renders what it is handed. */
  group: FooterGroup;
  /** `Footer accordian` keeps the first two groups open in the 360 frame. */
  defaultOpen?: boolean;
}

/**
 * Footer accordian I0:66328;18333:22243.
 *
 * The 1440 footer sets every group out in full across five columns; the 360
 * footer stacks them and closes all but the first two behind a chevron, so
 * the nine headings stay reachable without nine screens of links. Above 768
 * the heading is plain text again and there is nothing to toggle.
 */
export default function FooterLinkGroup({
  group,
  defaultOpen = false,
}: FooterLinkGroupProps) {
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const [open, setOpen] = useState(defaultOpen);
  const expanded = !isMobile || open;
  const id = `footer-${group.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <div className={`${styles.group} ${expanded ? "" : styles.groupClosed}`}>
      <h2 className={styles.groupHeading}>
        {isMobile ? (
          <button
            type="button"
            className={styles.groupToggle}
            aria-expanded={expanded}
            aria-controls={id}
            onClick={() => setOpen((current) => !current)}
          >
            {group.title}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={styles.chevron}
              src="/figma/footer/chevron.svg"
              alt=""
              width={18}
              height={18}
            />
          </button>
        ) : (
          group.title
        )}
      </h2>

      {/* The 360 frame sets the ten Trade & Invest labels in two columns
          rather than one ten-deep list; the short groups stay single. */}
      <ul
        id={id}
        className={`${styles.groupLinks} ${group.links.length > 6 ? styles.groupLinksSplit : ""}`}
      >
        {group.links.map((link) => (
          <li key={`${group.title}-${link.label}`}>
            <Link
              href={link.href}
              className={styles.link}
              target={link.newTab ? "_blank" : undefined}
              rel={link.newTab ? "noopener noreferrer" : undefined}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
