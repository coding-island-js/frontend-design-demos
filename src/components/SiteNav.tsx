"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav as LINKS } from "@/content/copy";
import { OnAirChip } from "./OnAirChip";
import styles from "./SiteNav.module.css";

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Primary">
        <Link href="/" className={styles.brand} onClick={() => setOpen(false)}>
          <span className={styles.brandMark} aria-hidden="true" />
          <span className={styles.brandLockup}>
            <span className={styles.brandName}>Raj</span>
            <span className={styles.brandRole}>Designer / Engineer</span>
          </span>
        </Link>

        <ul id="primary-menu" className={`${styles.menu} ${open ? styles.menuOpen : ""}`}>
          {LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`${styles.link} ${active ? styles.active : ""}`}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className={styles.right}>
          <OnAirChip />
          <button
            className={styles.toggle}
            aria-expanded={open}
            aria-controls="primary-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <span className={`${styles.bars} ${open ? styles.barsOpen : ""}`} aria-hidden="true" />
          </button>
        </div>
      </nav>
    </header>
  );
}
