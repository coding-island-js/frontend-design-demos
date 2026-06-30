import type { Metadata } from "next";
import { PageShell, PageHeader } from "@/components/PageShell";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { Card, CardEyebrow, CardTitle, CardBody } from "@/components/Card";
import { ProductCard } from "@/components/ProductCard";
import { AudioPlayer } from "@/components/AudioPlayer/AudioPlayer";
import { SAMPLE_TRACKS } from "@/lib/tracks";
import { SEMANTIC_COLORS, TYPE_SCALE, SPACE_SCALE, RADIUS_SCALE } from "@/lib/tokens";
import { designSystem as t } from "@/content/copy";
import styles from "./design-system.module.css";

export const metadata: Metadata = {
  title: "Design System & Component Library",
  description:
    "Design tokens for color, type, and spacing feeding a documented, reusable component library built with Next.js and TypeScript.",
};

/** Small section wrapper with an anchor and heading. */
function Section({
  id,
  title,
  intro,
  children,
}: {
  id: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-h`}>
      <div className={styles.sectionHead}>
        <h2 id={`${id}-h`} className={styles.h2}>
          {title}
        </h2>
        {intro && <p className={styles.intro}>{intro}</p>}
      </div>
      {children}
    </section>
  );
}

export default function DesignSystemPage() {
  return (
    <PageShell>
      <PageHeader eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

      {/* On-page nav */}
      <nav className={styles.toc} aria-label="Sections on this page">
        {[
          ["tokens", "Tokens"],
          ["color", "Color"],
          ["type", "Type"],
          ["space", "Spacing & radius"],
          ["buttons", "Buttons"],
          ["badges", "Badges"],
          ["cards", "Cards"],
          ["commerce", "Commerce"],
          ["audio", "Audio player"],
        ].map(([id, label]) => (
          <a key={id} href={`#${id}`} className={styles.tocLink}>
            {label}
          </a>
        ))}
      </nav>

      <div className={styles.body}>
        <Section id="tokens" title={t.tokensTitle} intro={t.tokensIntro}>
          <pre className={styles.code}>
            <code>{`/* tokens.css: the single source of truth */
:root {
  --kcrw-acid: #d6ff00;             /* brand value */
  --color-accent: var(--kcrw-acid); /* semantic role */
}

/* Button.module.css reads the role, never the raw value */
.primary { background: var(--color-accent); }`}</code>
          </pre>
        </Section>

        <Section id="color" title={t.colorTitle}>
          <div className={styles.swatchGrid}>
            {SEMANTIC_COLORS.map((c) => (
              <div key={c.token} className={styles.swatch}>
                <span
                  className={styles.swatchChip}
                  style={{ background: c.var }}
                  aria-hidden="true"
                />
                <span className={styles.swatchRole}>{c.role}</span>
                <code className={styles.swatchToken}>{c.token}</code>
              </div>
            ))}
          </div>
        </Section>

        <Section id="type" title={t.typeTitle} intro={t.typeIntro}>
          <ul className={styles.typeList}>
            {TYPE_SCALE.map((ts) => (
              <li key={ts.token} className={styles.typeRow}>
                <span className={styles.typeSample} style={{ fontSize: `var(${ts.token})` }}>
                  {ts.sample}
                </span>
                <span className={styles.typeMeta}>
                  <code>{ts.token}</code> · {ts.px}
                </span>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="space" title={t.spaceTitle} intro={t.spaceIntro}>
          <div className={styles.twoCol}>
            <div>
              <h3 className={styles.h3}>Spacing</h3>
              <ul className={styles.spaceList}>
                {SPACE_SCALE.map((s) => (
                  <li key={s.token} className={styles.spaceRow}>
                    <span
                      className={styles.spaceBar}
                      style={{ width: `var(${s.token})` }}
                      aria-hidden="true"
                    />
                    <code>{s.token}</code>
                    <span className={styles.spacePx}>{s.px}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className={styles.h3}>Radius</h3>
              <div className={styles.radiusRow}>
                {RADIUS_SCALE.map((r) => (
                  <div key={r.token} className={styles.radiusItem}>
                    <span
                      className={styles.radiusChip}
                      style={{ borderRadius: `var(${r.token})` }}
                      aria-hidden="true"
                    />
                    <code>{r.token}</code>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Section id="buttons" title={t.buttonsTitle} intro={t.buttonsIntro}>
          <div className={styles.demoRow}>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="inverse">Inverse</Button>
          </div>
          <div className={styles.demoRow}>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button disabled>Disabled</Button>
          </div>
        </Section>

        <Section id="badges" title={t.badgesTitle}>
          <div className={styles.demoRow}>
            <Badge tone="neutral">Neutral</Badge>
            <Badge tone="accent">Accent</Badge>
            <Badge tone="ink">Ink</Badge>
            <Badge tone="live">On air</Badge>
          </div>
        </Section>

        <Section id="cards" title={t.cardsTitle}>
          <div className={styles.cardRow}>
            <Card href="#cards">
              <CardEyebrow>Programme</CardEyebrow>
              <CardTitle>Morning Becomes Eclectic</CardTitle>
              <CardBody>An interactive card. The whole surface is one focusable link.</CardBody>
            </Card>
            <Card tone="ink">
              <CardEyebrow>Dark variant</CardEyebrow>
              <CardTitle>High-contrast block</CardTitle>
              <CardBody>The same component, inverted with tokens for dark blocks.</CardBody>
            </Card>
          </div>
        </Section>

        <Section id="commerce" title={t.commerceTitle} intro={t.commerceIntro}>
          <div className={styles.cardRow}>
            <ProductCard
              name="Reagent Starter Kit"
              price="$129"
              blurb="Everything a new lab bench needs to get going on day one."
              tag="New"
              swatch="linear-gradient(135deg,#1f6feb,#0b3d91)"
            />
            <ProductCard
              name="Sample Vials (x100)"
              price="$42"
              blurb="Borosilicate, autoclavable, with screw-cap seals."
              tag="Best seller"
              swatch="linear-gradient(135deg,#0e9f6e,#05603a)"
            />
          </div>
        </Section>

        <Section id="audio" title={t.audioTitle} intro={t.audioIntro}>
          <AudioPlayer tracks={SAMPLE_TRACKS} />
        </Section>
      </div>
    </PageShell>
  );
}
