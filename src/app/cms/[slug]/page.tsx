import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { cms } from "@/lib/cms";
import { renderMarkdown } from "@/lib/markdown";
import styles from "../cms.module.css";

type Params = { slug: string };

// Pre-generate one static page per article at build time.
export async function generateStaticParams(): Promise<Params[]> {
  const articles = await cms.listArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

// Per-article SEO: title, description, and Open Graph tags.
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await cms.getArticle(slug);
  if (!article) return { title: "Not found" };
  return {
    title: article.title,
    description: article.dek,
    openGraph: {
      title: article.title,
      description: article.dek,
      type: "article",
      authors: [article.author],
      publishedTime: article.date,
    },
  };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const article = await cms.getArticle(slug);
  if (!article) notFound();

  const html = renderMarkdown(article.body);

  // Structured data so search engines understand this is an article.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.dek,
    author: { "@type": "Person", name: article.author },
    datePublished: article.date,
    articleSection: article.category,
  };

  return (
    <PageShell>
      <article className={styles.article}>
        <script
          type="application/ld+json"
          // JSON-LD is a documented, safe use of this prop (static, serialized data).
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Link href="/cms/" className={styles.back}>
          ← All stories
        </Link>
        <p className={styles.articleMeta}>
          {article.category} · {formatDate(article.date)} · {article.readingMinutes} min read
        </p>
        <h1 className={styles.articleTitle}>{article.title}</h1>
        <p className={styles.articleDek}>{article.dek}</p>
        <p className={styles.articleAuthor}>By {article.author}</p>
        <div className={styles.prose} dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </PageShell>
  );
}
