import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import type { Article, ArticleSummary, CmsSource } from "./types";

/**
 * Local Git-based CMS adapter (open source, no signup, no database).
 *
 * Content lives as Markdown files in /content/articles. Editors change them
 * through the Decap CMS admin UI (see /public/admin), which commits to Git.
 * At build time we read the files here and turn them into typed Articles.
 *
 * Because this runs only during `next build` (a Node environment), using the
 * filesystem is safe and produces a fully static site.
 */
const CONTENT_DIR = path.join(process.cwd(), "content", "articles");

const WORDS_PER_MIN = 200;

function estimateReadingMinutes(markdown: string): number {
  const words = markdown.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / WORDS_PER_MIN));
}

async function readAll(): Promise<Article[]> {
  let files: string[] = [];
  try {
    files = (await fs.readdir(CONTENT_DIR)).filter((f) => f.endsWith(".md"));
  } catch {
    return []; // no content dir yet -> empty list, page still renders
  }

  const articles = await Promise.all(
    files.map(async (file) => {
      const raw = await fs.readFile(path.join(CONTENT_DIR, file), "utf8");
      const { data, content } = matter(raw);
      const slug = file.replace(/\.md$/, "");
      return {
        slug,
        title: String(data.title ?? slug),
        dek: String(data.dek ?? ""),
        body: content,
        author: String(data.author ?? "KCRW Staff"),
        category: String(data.category ?? "Culture"),
        date: String(data.date ?? new Date(0).toISOString()),
        readingMinutes: estimateReadingMinutes(content),
      } satisfies Article;
    })
  );

  // newest first
  return articles.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export const localSource: CmsSource = {
  name: "Decap (Git-based, open source)",
  async listArticles(): Promise<ArticleSummary[]> {
    const all = await readAll();
    return all.map(({ body: _body, ...summary }) => summary);
  },
  async getArticle(slug: string): Promise<Article | null> {
    const all = await readAll();
    return all.find((a) => a.slug === slug) ?? null;
  },
};
