import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { BroadcastCard } from "@/components/BroadcastCard";
import { DEMOS, SHIPPED } from "@/lib/site-content";
import { home } from "@/content/copy";
import styles from "./page.module.css";

export default function Home() {
  return (
    <PageShell>
      {/* HERO */}
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroGrid}>
          <div>
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowRule} aria-hidden="true" />
              {home.eyebrow}
            </p>
            <h1 id="hero-title" className={styles.heroTitle}>
              {home.titleLine1}
              <br />
              {home.titleLine2}
              <br />
              <span className={styles.heroAccent}>{home.titleAccent}</span>
            </h1>
            <p className={styles.heroLead}>{home.lead}</p>
            <div className={styles.heroActions}>
              <Link href="#work" className={styles.primaryCta}>
                {home.ctaPrimary} <span aria-hidden="true">↓</span>
              </Link>
              <Link href="#why" className={styles.secondaryCta}>
                {home.ctaSecondary} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <BroadcastCard />
        </div>
      </section>

      {/* STACK STRIP */}
      <section className={styles.stack} aria-label="Tools and standards I work with">
        <ul className={styles.stackList}>
          {home.stack.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </section>

      {/* WORK */}
      <section id="work" className={styles.work} aria-labelledby="work-title">
        <div className={styles.sectionHead}>
          <p className={styles.sectionEyebrow}>{home.workEyebrow}</p>
          <h2 id="work-title" className={styles.sectionTitle}>
            {home.demosTitle}
          </h2>
          <p className={styles.sectionLead}>{home.demosLead}</p>
        </div>
        <ul className={styles.grid}>
          {DEMOS.map((d) => (
            <li key={d.href} className={styles.gridItem}>
              <Link href={d.href} className={styles.demoCard}>
                <span className={styles.demoTop}>
                  <span className={styles.demoNum} aria-hidden="true">
                    {d.num}
                  </span>
                  <span className={styles.demoOpen} aria-hidden="true">
                    Open →
                  </span>
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
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* SHIPPED PROOF */}
      <section id="shipped" className={styles.shipped} aria-labelledby="shipped-title">
        <div className={styles.shippedInner}>
          <div className={styles.sectionHead}>
            <p className={`${styles.sectionEyebrow} ${styles.eyebrowAccent}`}>
              {home.shippedEyebrow}
            </p>
            <h2 id="shipped-title" className={styles.sectionTitle}>
              {home.shippedTitle}
            </h2>
            <p className={styles.sectionLeadInverse}>{home.shippedLead}</p>
          </div>
          <ul className={styles.shippedGrid}>
            {SHIPPED.map((s) => (
              <li key={s.url} className={styles.gridItem}>
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
        </div>
      </section>

      {/* WHY */}
      <section id="why" className={styles.why} aria-labelledby="why-title">
        <div className={styles.sectionHead}>
          <p className={styles.sectionEyebrow}>{home.whyEyebrow}</p>
          <h2 id="why-title" className={styles.sectionTitle}>
            {home.whyTitle}
          </h2>
          <p className={styles.sectionLead}>{home.whyLead}</p>
        </div>
        <ul className={styles.whyGrid}>
          {home.why.map((w) => (
            <li key={w.n} className={styles.whyCard}>
              <div className={styles.whyHead}>
                <span className={styles.whyNum} aria-hidden="true">
                  {w.n}
                </span>
                <span className={styles.whyKicker}>{w.k}</span>
              </div>
              <p className={styles.whyText}>{w.t}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* CONTACT */}
      <section id="contact" className={styles.contact} aria-labelledby="contact-title">
        <div className={styles.contactInner}>
          <p className={styles.sectionEyebrow}>{home.contactEyebrow}</p>
          <h2 id="contact-title" className={styles.contactTitle}>
            {home.contactTitleLines[0]}
            <br />
            {home.contactTitleLines[1]}
          </h2>
          <p className={styles.contactLead}>{home.contactLead}</p>
          <div className={styles.contactActions}>
            <a
              href="https://demos.withmagic.ai"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactPrimary}
            >
              {home.contactCtaDemos} <span aria-hidden="true">↗</span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            <a
              href="https://github.com/coding-island-js"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactSecondary}
            >
              {home.contactCtaSource} <span aria-hidden="true">↗</span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
          <p className={styles.contactMore}>
            {home.contactMorePrefix}
            <a href="https://codingraj.withmagic.ai" target="_blank" rel="noopener noreferrer">
              codingraj.withmagic.ai
            </a>
          </p>
        </div>
      </section>
    </PageShell>
  );
}
