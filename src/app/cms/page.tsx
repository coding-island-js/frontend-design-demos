import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, PageHeader } from "@/components/PageShell";
import { Badge } from "@/components/Badge";
import { cms as cmsSource } from "@/lib/cms";
import { cms as t } from "@/content/copy";
import styles from "./cms.module.css";

export const metadata: Metadata = {
  title: "Headless CMS Content Site",
  description:
    "An editorial site rendered from a headless CMS at build time, with SEO tags and a swappable data adapter (open-source Git CMS or Contentful).",
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function CmsIndexPage() {
  const articles = await cmsSource.listArticles();

  return (
    <PageShell demoHref="/cms/">
      <PageHeader eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

      <div className={styles.wrap}>
        {articles.length === 0 ? (
          <p className={styles.empty}>{t.empty}</p>
        ) : (
          <ul className={styles.list}>
            {articles.map((a) => (
              <li key={a.slug}>
                <Link href={`/cms/${a.slug}/`} className={styles.row}>
                  <span className={styles.rowMeta}>
                    <span className={styles.category}>{a.category}</span>
                    <span className={styles.dot} aria-hidden="true">
                      ·
                    </span>
                    <span>{formatDate(a.date)}</span>
                    <span className={styles.dot} aria-hidden="true">
                      ·
                    </span>
                    <span>{a.readingMinutes} min read</span>
                  </span>
                  <h3 className={styles.rowTitle}>{a.title}</h3>
                  <span className={styles.rowDek}>{a.dek}</span>
                  <span className={styles.rowFoot}>
                    <span className={styles.rowAuthor}>By {a.author}</span>
                    <span className={styles.rowRead} aria-hidden="true">
                      Read →
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}

        <aside className={styles.note} aria-labelledby="cms-note">
          <h2 id="cms-note" className={styles.noteLabel}>
            {t.liveSourceLabel}
          </h2>
          <p className={styles.noteValue}>
            <Badge tone="accent">{cmsSource.name}</Badge>
          </p>
          <p className={styles.noteText}>{t.noteText1}</p>
          <p className={styles.noteText}>
            {t.noteText2Prefix}
            <a href="/admin/" target="_blank" rel="noopener noreferrer">
              {t.noteText2Link}
            </a>
            {t.noteText2Suffix}
          </p>
        </aside>
      </div>
    </PageShell>
  );
}
