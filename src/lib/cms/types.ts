/**
 * The content model, defined once, independent of where the data comes from.
 *
 * This is the key idea of the demo: the rest of the app depends only on this
 * shape and the `CmsSource` interface below. Swapping the open-source Git CMS
 * for Contentful (or any headless CMS) means writing one new adapter, with no
 * changes to the pages that render the content.
 */
export type Article = {
  slug: string;
  title: string;
  dek: string; // standfirst / summary
  body: string; // markdown
  author: string;
  category: string;
  date: string; // ISO
  readingMinutes: number;
};

export type ArticleSummary = Omit<Article, "body">;

export interface CmsSource {
  /** Adapter name, surfaced in the UI so it's clear which is live. */
  readonly name: string;
  listArticles(): Promise<ArticleSummary[]>;
  getArticle(slug: string): Promise<Article | null>;
}
