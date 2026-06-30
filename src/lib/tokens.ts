/**
 * Display metadata for the design-system docs page.
 *
 * The *real* tokens live in src/styles/tokens.css as CSS custom properties , 
 * that file is the single source of truth that components actually consume.
 * The arrays below just mirror them so the docs page can render swatches and
 * a reference table. (Keeping a small, intentional mirror like this is a common
 * design-system pattern; the alternative is parsing CSS at build time.)
 */

export const SEMANTIC_COLORS = [
  { token: "--color-bg", role: "Page background", var: "var(--color-bg)" },
  { token: "--color-surface", role: "Card / panel", var: "var(--color-surface)" },
  { token: "--color-surface-sunken", role: "Sunken / hover", var: "var(--color-surface-sunken)" },
  { token: "--color-ink", role: "Primary text", var: "var(--color-ink)" },
  { token: "--color-ink-muted", role: "Secondary text", var: "var(--color-ink-muted)" },
  { token: "--color-line", role: "Borders / dividers", var: "var(--color-line)" },
  { token: "--color-accent", role: "Accent / CTA", var: "var(--color-accent)" },
  { token: "--color-inverse-bg", role: "Dark blocks", var: "var(--color-inverse-bg)" },
  { token: "--color-danger", role: "Errors / live", var: "var(--color-danger)" },
  { token: "--color-success", role: "Success", var: "var(--color-success)" },
];

export const TYPE_SCALE = [
  { token: "--text-5xl", px: "61px", sample: "Display" },
  { token: "--text-4xl", px: "49px", sample: "Page title" },
  { token: "--text-3xl", px: "39px", sample: "Section" },
  { token: "--text-2xl", px: "31px", sample: "Subsection" },
  { token: "--text-xl", px: "25px", sample: "Card title" },
  { token: "--text-lg", px: "20px", sample: "Lead / large body" },
  { token: "--text-base", px: "16px", sample: "Body (minimum)" },
  { token: "--text-sm", px: "14px", sample: "Secondary" },
  { token: "--text-xs", px: "12px", sample: "Caption / label" },
];

export const SPACE_SCALE = [
  { token: "--space-1", px: "4px" },
  { token: "--space-2", px: "8px" },
  { token: "--space-3", px: "12px" },
  { token: "--space-4", px: "16px" },
  { token: "--space-5", px: "24px" },
  { token: "--space-6", px: "32px" },
  { token: "--space-7", px: "48px" },
  { token: "--space-8", px: "64px" },
  { token: "--space-9", px: "96px" },
];

export const RADIUS_SCALE = [
  { token: "--radius-sm", px: "4px" },
  { token: "--radius-md", px: "10px" },
  { token: "--radius-lg", px: "16px" },
  { token: "--radius-pill", px: "999px" },
];
