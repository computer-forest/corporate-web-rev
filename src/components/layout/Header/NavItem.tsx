"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";

import type { HeaderLink } from "@/server/cms/siteChrome";
import styles from "./Header.module.scss";

/**
 * One top-level navigation entry, with its dropdown if the CMS gave it
 * children.
 *
 * The caret has been in this header since the Figma translation, pointing at
 * a menu that did not exist. It now means something — and only renders when
 * there is in fact something to open.
 *
 * Hover is how this is meant to feel, but hover alone would exclude every
 * keyboard user and every phone, so the disclosure answers to four things:
 *
 *   pointer      opening on enter, closing on leave, with a short close
 *                delay so a diagonal move to the first child does not
 *                snatch the menu away mid-gesture
 *   keyboard     focus anywhere inside keeps it open; Escape closes and
 *                returns focus to the parent
 *   touch        a tap target of its own, separate from the link, because a
 *                tap that both navigates and opens a menu does neither
 *                predictably
 *   nothing      the parent stays a real link, so clicking it goes where it
 *                always went
 */

interface NavItemProps {
  item: HeaderLink;
  onNavigate: () => void;
}

const CLOSE_DELAY_MS = 180;

export default function NavItem({ item, onNavigate }: NavItemProps) {
  const [open, setOpen] = useState(false);
  /* Opened by a deliberate click rather than by passing the pointer over it.
     A hover-opened menu should get out of the way when the pointer leaves;
     one the reader clicked should stay until they dismiss it. */
  const [pinned, setPinned] = useState(false);
  const closeTimer = useRef<number | undefined>(undefined);
  const itemRef = useRef<HTMLLIElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  const hasChildren = item.children.length > 0;

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  /* A pinned menu is dismissed by clicking anywhere else, the behaviour any
     click-opened menu is expected to have. */
  useEffect(() => {
    if (!pinned) return;

    const onDocumentPointerDown = (event: PointerEvent) => {
      if (!itemRef.current?.contains(event.target as Node)) {
        window.clearTimeout(closeTimer.current);
        setPinned(false);
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", onDocumentPointerDown);
    return () => document.removeEventListener("pointerdown", onDocumentPointerDown);
  }, [pinned]);

  function openNow() {
    window.clearTimeout(closeTimer.current);
    setOpen(true);
  }

  function closeSoon() {
    if (pinned) return;
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(false), CLOSE_DELAY_MS);
  }

  function closeNow() {
    window.clearTimeout(closeTimer.current);
    setPinned(false);
    setOpen(false);
  }

  if (!hasChildren) {
    return (
      <li>
        <Link
          href={item.href}
          className={styles.navLink}
          target={item.newTab ? "_blank" : undefined}
          rel={item.newTab ? "noopener noreferrer" : undefined}
          onClick={onNavigate}
        >
          {item.label}
        </Link>
      </li>
    );
  }

  return (
    <li
      ref={itemRef}
      className={styles.navItemWithMenu}
      onPointerEnter={(event) => {
        /* Touch fires pointerenter too, and on a phone that would open the
           menu on the way to tapping the link. The button handles touch. */
        if (event.pointerType !== "mouse") return;
        openNow();
      }}
      onPointerLeave={(event) => {
        if (event.pointerType !== "mouse") return;
        closeSoon();
      }}
      onFocus={openNow}
      onBlur={(event) => {
        /* Only when focus has actually left the whole item — moving between
           the trigger and a child is still "inside". */
        if (pinned) return;
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          event.stopPropagation();
          closeNow();
          triggerRef.current?.focus();
        }
      }}
    >
      <span className={styles.navLinkGroup}>
        <Link
          href={item.href}
          className={styles.navLink}
          target={item.newTab ? "_blank" : undefined}
          rel={item.newTab ? "noopener noreferrer" : undefined}
          onClick={onNavigate}
        >
          {item.label}
        </Link>

        <button
          ref={triggerRef}
          type="button"
          className={styles.navToggle}
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => {
            if (open && pinned) {
              closeNow();
              return;
            }
            setPinned(true);
            openNow();
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={`${styles.caret} ${open ? styles.caretOpen : ""}`}
            src="/figma/header/caret-down.svg"
            alt=""
            width={16}
            height={16}
          />
          <span className="visually-hidden">
            {open ? `Hide ${item.label} links` : `Show ${item.label} links`}
          </span>
        </button>
      </span>

      <ul id={menuId} className={styles.dropdown} hidden={!open}>
        {item.children.map((child) => (
          <li key={`${child.href}-${child.label}`}>
            <Link
              href={child.href}
              className={styles.dropdownLink}
              target={child.newTab ? "_blank" : undefined}
              rel={child.newTab ? "noopener noreferrer" : undefined}
              onClick={() => {
                closeNow();
                onNavigate();
              }}
            >
              {child.label}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
}
