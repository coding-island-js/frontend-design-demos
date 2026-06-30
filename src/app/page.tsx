import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { Badge } from "@/components/Badge";
import { DEMOS, SHIPPED } from "@/lib/site-content";
import { home } from "@/content/copy";
import styles from "./page.module.css";

export default function Home() {
  return (
    <PageShell>
      {/* HERO */}
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroInner}>
          <Badge tone="accent">{home.badge}</Badge>
          <h1 id="hero-title" className={styles.heroTitle}>
            {home.titleTop}
            <br />
            <span className={styles.heroAccent}>{home.titleAccent}</span>
          </h1>
          <p className={styles.heroLead}>{home.lead}</p>
          <div className={styles.heroActions}>
            <Link href="#demos" className={styles.primaryCta}>
              {home.ctaPrimary} ↓
            </Link>
            <a
              href="https://github.com/coding-island-js"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.secondaryCta}
            >
              {home.ctaSecondary}{" "}
              <span aria-hidden="true">↗</span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>
      </section>

      {/* STACK STRIP */}
      <section className={styles.stack} aria-label="Technologies used">
        <ul className={styles.stackList}>
          {home.stack.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </section>

      {/* DEMOS */}
      <section id="demos" className={styles.demos} aria-labelledby="demos-title">
        <div className={styles.sectionHead}>
          <h2 id="demos-title" className={styles.sectionTitle}>
            {home.demosTitle}
          </h2>
          <p className={styles.sectionLead}>{home.demosLead}</p>
        </div>
        <ul className={styles.grid}>
          {DEMOS.map((d) => (
            <li key={d.href} className={styles.gridItem}>
              <Link href={d.href} className={styles.demoCard}>
                <span className={styles.demoNum} aria-hidden="true">
                  {d.num}
                </span>
                <h3 className={styles.demoTitle}>{d.title}</h3>
                <p className={styles.demoBlurb}>{d.blurb}</p>
                <span className={styles.demoProves}>
                  {d.proves.map((p) => (
                    <span key={p} className={styles.pill}>
                      {p}
                    </span>
                  ))}
                </span>
                <span className={styles.demoGo} aria-hidden="true">
                  Open demo →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* SHIPPED PROOF */}
      <section className={styles.shipped} aria-labelledby="shipped-title">
        <div className={styles.shippedInner}>
          <div className={styles.sectionHead}>
            <Badge tone="ink">{home.shippedBadge}</Badge>
            <h2 id="shipped-title" className={styles.sectionTitle}>
              {home.shippedTitle}
            </h2>
            <p className={styles.sectionLead}>{home.shippedLead}</p>
          </div>
          <ul className={styles.shippedGrid}>
            {SHIPPED.map((s) => (
              <li key={s.url}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.shippedCard}
                >
                  <span className={styles.shippedName}>{s.name}</span>
                  <span className={styles.shippedBlurb}>{s.blurb}</span>
                  <span className={styles.shippedGo} aria-hidden="true">
                    Visit ↗
                  </span>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
          <p className={styles.shippedMore}>
            {home.shippedMorePrefix}
            <a href="https://codingraj.withmagic.ai" target="_blank" rel="noopener noreferrer">
              codingraj.withmagic.ai
            </a>
          </p>
        </div>
      </section>
    </PageShell>
  );
}
