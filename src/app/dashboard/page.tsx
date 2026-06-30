import type { Metadata } from "next";
import { PageShell, PageHeader } from "@/components/PageShell";
import { Dashboard } from "@/components/Dashboard/Dashboard";
import { dashboard as t } from "@/content/copy";
import styles from "./dashboard.module.css";

export const metadata: Metadata = {
  title: "Personalized Dashboard + First-Party Analytics",
  description:
    "A personalized listener dashboard plus a cookieless, first-party traffic-attribution engine ported from a shipped product.",
};

export default function DashboardPage() {
  return (
    <PageShell demoHref="/dashboard/">
      <PageHeader eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

      <div className={styles.wrap}>
        <Dashboard />

        <aside className={styles.method} aria-labelledby="method-title">
          <h2 id="method-title" className={styles.methodTitle}>
            {t.methodTitle}
          </h2>
          <p className={styles.methodText}>{t.methodText1}</p>
          <ol className={styles.steps}>
            {t.steps.map((s) => (
              <li key={s.strong}>
                <strong>{s.strong}</strong>
                {s.rest}
              </li>
            ))}
          </ol>
          <p className={styles.methodText}>{t.methodText2}</p>
        </aside>
      </div>
    </PageShell>
  );
}
