import { marked } from "marked";

/**
 * Render trusted Markdown (authored by us in the CMS) to HTML.
 *
 * The content here is first-party (our own editors / repo files), so we render
 * it directly. If this ever accepted third-party Markdown, we'd pipe the output
 * through a sanitizer (e.g. DOMPurify / rehype-sanitize) before rendering.
 */
export function renderMarkdown(md: string): string {
  return marked.parse(md, { async: false }) as string;
}
