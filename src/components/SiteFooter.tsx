import Link from "next/link";
import { nav, footer } from "@/content/copy";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.colWide}>
          <p className={styles.wordmark}>Raj Lakhani</p>
          <p className={styles.tagline}>{footer.tagline}</p>
        </div>
        <nav className={styles.col} aria-label="Demos">
          <p className={styles.colHead}>Demos</p>
          {nav.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>
        <nav className={styles.col} aria-label="Elsewhere">
          <p className={styles.colHead}>Elsewhere</p>
          <a href="https://codingraj.withmagic.ai" target="_blank" rel="noopener noreferrer">
            Product work <span aria-hidden="true">↗</span>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
          <a href="https://github.com/coding-island-js" target="_blank" rel="noopener noreferrer">
            GitHub <span aria-hidden="true">↗</span>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
          <a href="mailto:raj@withmagic.ai">Email</a>
        </nav>
      </div>
      <div className={styles.note}>
        <p>{footer.note}</p>
      </div>
    </footer>
  );
}
