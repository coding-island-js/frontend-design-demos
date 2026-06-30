import type { Article, ArticleSummary, CmsSource } from "./types";

/**
 * Contentful adapter, the "swap to Contentful" path.
 *
 * The job description names Contentful specifically. This adapter implements the
 * exact same CmsSource interface as the local Git adapter, so turning it on is a
 * one-line change in ./index.ts plus two environment variables, no page code
 * changes. It is written against Contentful's official SDK shape (Content
 * Delivery API). It activates only when CONTENTFUL_SPACE_ID and
 * CONTENTFUL_ACCESS_TOKEN are present, so the repo builds with zero accounts.
 *
 * To go live:
 *   1. npm i contentful
 *   2. Create a "article" content type in Contentful with fields:
 *      title (Short text), slug (Short text), dek (Short text),
 *      body (Long text / Markdown), author (Short text),
 *      category (Short text), date (Date)
 *   3. Set CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN, then set
 *      CMS_SOURCE=contentful.
 */

type ContentfulArticleFields = {
  title: string;
  slug: string;
  dek: string;
  body: string;
  author: string;
  category: string;
  date: string;
};

const WORDS_PER_MIN = 200;
const readingMinutes = (md: string) =>
  Math.max(1, Math.round(md.trim().split(/\s+/).length / WORDS_PER_MIN));

function toArticle(fields: ContentfulArticleFields): Article {
  return {
    slug: fields.slug,
    title: fields.title,
    dek: fields.dek,
    body: fields.body,
    author: fields.author,
    category: fields.category,
    date: fields.date,
    readingMinutes: readingMinutes(fields.body),
  };
}

// Lazily import the SDK so the package isn't required unless this adapter runs.
async function getClient() {
  const space = process.env.CONTENTFUL_SPACE_ID;
  const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
  if (!space || !accessToken) {
    throw new Error("Contentful env vars missing, falling back to the local source.");
  }
  // `contentful` is an OPTIONAL dependency, the repo builds without it. The
  // turbopackIgnore comment tells the bundler not to try to resolve it at build
  // time; it's only imported at runtime when this adapter is actually selected.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // @ts-expect-error optional peer dependency, not installed in this repo by default
  const contentful: any = await import(/* turbopackIgnore: true */ "contentful").catch(() => {
    throw new Error("`contentful` is not installed. Run: npm i contentful");
  });
  return contentful.createClient({ space, accessToken });
}

export const contentfulSource: CmsSource = {
  name: "Contentful (headless CMS)",
  async listArticles(): Promise<ArticleSummary[]> {
    const client = await getClient();
    const res = await client.getEntries({ content_type: "article", order: "-fields.date" });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return res.items.map((item: any) => {
      const { body: _body, ...summary } = toArticle(item.fields as ContentfulArticleFields);
      return summary;
    });
  },
  async getArticle(slug: string): Promise<Article | null> {
    const client = await getClient();
    const res = await client.getEntries({
      content_type: "article",
      "fields.slug": slug,
      limit: 1,
    });
    if (!res.items.length) return null;
    return toArticle(res.items[0].fields as ContentfulArticleFields);
  },
};
