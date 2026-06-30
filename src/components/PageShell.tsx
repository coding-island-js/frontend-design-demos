import Link from "next/link";
import { SiteNav } from "./SiteNav";
import { SiteFooter } from "./SiteFooter";
import { DemoPager } from "./DemoPager";
import styles from "./PageShell.module.css";

export function PageShell({
  children,
  demoHref,
}: {
  children: React.ReactNode;
  /** When set, renders the prev/next demo pager (the page's own /route/). */
  demoHref?: string;
}) {
  return (
    <>
      <SiteNav />
      <main id="main" className={styles.main}>
        {children}
        {demoHref && <DemoPager current={demoHref} />}
      </main>
      <SiteFooter />
    </>
  );
}

/** Standard page header block: breadcrumb + eyebrow + title + lead, used atop each demo. */
export function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <header className={styles.pageHeader}>
      <Link href="/#work" className={styles.back}>
        <span aria-hidden="true">←</span> All work
      </Link>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h1 className={styles.title}>{title}</h1>
      {lead && <p className={styles.lead}>{lead}</p>}
    </header>
  );
}
