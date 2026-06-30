"use client";

import { useEffect, useState } from "react";
import styles from "./ThemeSwitcher.module.css";

/**
 * Live theme switcher. Sets data-theme on <html> and remembers the choice.
 *
 * This is the proof that the design system is fully tokenized: one attribute
 * changes the whole look, and no component code changes. It is also the tool for
 * design exploration. Pick a direction here, or add a new one in themes.css
 * (see DESIGN-AND-COPY.md).
 */

const THEMES = [
  { id: "kcrw", label: "KCRW" },
  { id: "noir", label: "Noir" },
  { id: "editorial", label: "Editorial" },
  { id: "terminal", label: "Terminal" },
];

const STORAGE_KEY = "rl-theme";

export function ThemeSwitcher() {
  const [theme, setTheme] = useState("kcrw");

  // Sync state with whatever the no-flash script already applied.
  useEffect(() => {
    const saved = document.documentElement.dataset.theme || "kcrw";
    setTheme(saved);
  }, []);

  const apply = (next: string) => {
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* private mode: ignore */
    }
  };

  return (
    <div className={styles.wrap}>
      <label htmlFor="theme-select" className={styles.label}>
        Theme
      </label>
      <select
        id="theme-select"
        className={styles.select}
        value={theme}
        onChange={(e) => apply(e.target.value)}
      >
        {THEMES.map((t) => (
          <option key={t.id} value={t.id}>
            {t.label}
          </option>
        ))}
      </select>
    </div>
  );
}
