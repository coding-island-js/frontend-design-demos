import type { Metadata } from "next";
import { PageShell, PageHeader } from "@/components/PageShell";
import { MembershipForm } from "@/components/MembershipForm/MembershipForm";
import { membership as t } from "@/content/copy";
import styles from "./membership.module.css";

export const metadata: Metadata = {
  title: "Membership / Donation Funnel",
  description:
    "A multi-step, accessible join flow with inline validation and a real submission, plus the plan for syncing members to a CRM.",
};

export default function MembershipPage() {
  return (
    <PageShell>
      <PageHeader eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

      {/*
        Hidden static form so Netlify detects the fields at deploy time. The real,
        interactive form (the React component) posts to this same form name.
        It stays in the DOM for the build-time scan, hidden from view.
      */}
      <form name="membership" data-netlify="true" hidden>
        <input type="text" name="tier" />
        <input type="text" name="billing" />
        <input type="text" name="amount" />
        <input type="text" name="name" />
        <input type="email" name="email" />
      </form>

      <div className={styles.layout}>
        <div className={styles.formCol}>
          <MembershipForm />
        </div>

        <aside className={styles.designCol} aria-labelledby="crm-title">
          <h2 id="crm-title" className={styles.h2}>
            {t.designTitle}
          </h2>
          <p className={styles.intro}>{t.designIntro}</p>

          <ol className={styles.pipeline}>
            {t.pipeline.map((node, i) => (
              <li key={node.label} className={styles.node}>
                <div className={styles.nodeBox}>
                  <span className={styles.nodeNum} aria-hidden="true">
                    {i + 1}
                  </span>
                  <span className={styles.nodeLabel}>{node.label}</span>
                  <span className={styles.nodeSub}>{node.sub}</span>
                </div>
                <p className={styles.nodeDetail}>{node.detail}</p>
                {i < t.pipeline.length - 1 && (
                  <span className={styles.arrow} aria-hidden="true">
                    ↓
                  </span>
                )}
              </li>
            ))}
          </ol>

          <div className={styles.callout}>
            <p className={styles.calloutTitle}>{t.calloutTitle}</p>
            <p className={styles.calloutText}>{t.calloutText}</p>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}
