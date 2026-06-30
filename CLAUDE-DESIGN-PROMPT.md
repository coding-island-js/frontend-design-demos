# Prompt to paste into Claude on the web

Use this to get a design review and new look directions for the demo site. Open a
new chat at claude.ai. Paste the prompt below. Then attach or paste:

- The live URL: https://demos.withmagic.ai
- `src/styles/tokens.css` (the full token list and default theme)
- `src/styles/themes.css` (the alternate themes)
- `src/content/copy.ts` (all the words), only if you also want copy ideas
- A few screenshots at phone width (375px), iPad width (768px), and desktop
  (1440px). Claude reviews screenshots well.

Tip: attach screenshots of the pages you care most about (home, design system,
case study).

---

## The prompt

You are a senior product designer and design-systems lead reviewing a portfolio
site. The site is built so the visual style comes entirely from design tokens. I
can drop in a new theme by adding a `[data-theme="name"]` block to `themes.css`
and a label to a theme switcher. Components never use raw colors, only semantic
tokens like `--color-accent` and `--color-ink`.

I am attaching the token files, some screenshots, and the live URL. Do four things.

1. Responsive review. Look at the layout at phone (375px), large phone (430px),
iPad portrait (768px), iPad landscape (1024px), and desktop (1280px and 1440px).
For each breakpoint, list what works and what breaks. Call out spacing, line
length, tap target size, font sizes, overflow, and anything that feels cramped or
empty. Give specific fixes I can make in CSS. Be concrete. Name the section.

2. New look directions. Give me three complete theme blocks I can paste straight
into `themes.css`. Keep the exact same token names. Each theme is a distinct
mood. Tell me the mood in one line, then the code block. Every text and
background pair must clear WCAG AA contrast (4.5 to 1 for body text, 3 to 1 for
large text). Do not invent new token names. Use only the ones in my tokens.css.

3. Design thinking review. Using Kim Goodwin's goal directed design as the lens
(persona, context scenario, then requirements and structure), critique the case
study page and the overall information architecture. Is the persona specific
enough? Does the scenario lead to the right requirements? Is the journey map
honest about pain points? What would you add or cut? Keep it practical.

4. Top five. End with the five highest impact changes, ranked, with the reason
for each.

Rules for anything you write as copy: short sentences, plain words, no dashes, no
filler, confident and direct.

---

## After Claude replies

- Paste any new theme block into `src/styles/themes.css`.
- Add it to the `THEMES` list in `src/components/ThemeSwitcher.tsx`.
- For copy changes, edit `src/content/copy.ts` only.
- Run `npm run dev`, pick the theme from the nav, and check it.

See `DESIGN-AND-COPY.md` for the full workflow.
