"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav as LINKS } from "@/content/copy";
import { ThemeSwitcher } from "./ThemeSwitcher";
import styles from "./SiteNav.module.css";

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Primary">
        <Link href="/" className={styles.brand} onClick={() => setOpen(false)}>
          RL<span className={styles.brandDot}>.</span>
          <span className={styles.brandWord}>front-end</span>
        </Link>

        <button
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="primary-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <span className={`${styles.bars} ${open ? styles.barsOpen : ""}`} aria-hidden="true" />
        </button>

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
          <li className={styles.switcherItem}>
            <ThemeSwitcher />
          </li>
        </ul>
      </nav>
    </header>
  );
}
