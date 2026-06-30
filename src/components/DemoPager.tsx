import Link from "next/link";
import { DEMOS } from "@/lib/site-content";
import styles from "./DemoPager.module.css";

/**
 * Prev / next navigation between the six demos, ordered by DEMOS. At the ends it
 * falls back to the home "All work" section so there is never a dead end.
 */
export function DemoPager({ current }: { current: string }) {
  const idx = DEMOS.findIndex((d) => d.href === current);
  const prev = idx > 0 ? DEMOS[idx - 1] : null;
  const next = idx >= 0 && idx < DEMOS.length - 1 ? DEMOS[idx + 1] : null;

  return (
    <nav className={styles.pager} aria-label="More demos">
      {prev ? (
        <Link href={prev.href} className={styles.link}>
          <span className={styles.kicker}>← Previous</span>
          <span className={styles.title}>{prev.title}</span>
        </Link>
      ) : (
        <Link href="/#work" className={styles.link}>
          <span className={styles.kicker}>←</span>
          <span className={styles.title}>All work</span>
        </Link>
      )}

      {next ? (
        <Link href={next.href} className={`${styles.link} ${styles.alignEnd}`}>
          <span className={styles.kicker}>Next →</span>
          <span className={styles.title}>{next.title}</span>
        </Link>
      ) : (
        <Link href="/#work" className={`${styles.link} ${styles.alignEnd}`}>
          <span className={styles.kicker}>Back to</span>
          <span className={styles.title}>All work →</span>
        </Link>
      )}
    </nav>
  );
}
