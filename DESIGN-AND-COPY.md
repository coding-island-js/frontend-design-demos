# Design and Copy Guide

This site is built in three layers that you can change on their own. You can redo
the look or the words without touching the code that makes it work. This guide is
written so you can hand it, plus one or two files, to Claude on the web and get
back something you paste straight in.

## The three layers

1. **Structure** is the components in `src/components`. You rarely touch these.
2. **Skin** is the theme tokens in `src/styles`. Change these to change the look.
3. **Words** is all the copy in `src/content/copy.ts`. Change this to change the text.

Because they are separate, a new look never breaks the words, and new words never
break the look.

---

## How to redo the LOOK with Claude

The whole visual style comes from a small set of tokens (colors, accent, corner
radius). A "theme" is just one set of those values.

**Files to give Claude:**
- `src/styles/tokens.css` (the default theme and the full token list)
- `src/styles/themes.css` (the alternate themes, so it sees the pattern)

**What to ask Claude:**
> Here are my design tokens. Give me a new theme block for `themes.css` called
> `[data-theme="NAME"]`. I want a [describe the vibe, for example: warm print
> magazine, or stark black and white, or 90s public-access TV]. Keep the same
> token names. Make sure text on every background clears WCAG AA contrast
> (4.5 to 1 for body text).

**Where to paste the result:**
1. Paste the new block into `src/styles/themes.css`.
2. Add it to the `THEMES` list in `src/components/ThemeSwitcher.tsx` so it shows
   in the picker.
3. Run the site and pick it from the Theme menu in the top nav.

That is the whole loop. Nothing else changes.

### The rule that makes this safe
Components only ever read **semantic** tokens like `--color-accent` or
`--color-ink`. They never use a raw hex value. So as long as a theme sets those
same token names, every page updates at once and stays consistent.

---

## How to redo the WORDS with Claude

Every headline, sentence, and label on the site lives in one file.

**File to give Claude:**
- `src/content/copy.ts`

**What to ask Claude:**
> Here is all the copy for my site in one file. Rewrite it in this voice: short
> sentences, plain words, no dashes, no filler, confident and direct. Keep the
> same keys and the same shape of the object. Only change the text values.

**Where to paste the result:**
- Replace the contents of `src/content/copy.ts` with what Claude gives back.

The sample articles for the CMS demo are separate, in
`content/articles/*.md`. The case study artifacts (the journey map rows and the
score table) live in `src/app/case-study/page.tsx` because they are tied to that
demo.

### The rule that makes this safe
Keep the object keys the same. The pages read values like `home.lead` and
`audio.title`. If a key changes, that page will not find its text.

---

## Quick reference

| You want to change | Edit this | Then |
| --- | --- | --- |
| Colors, accent, corners | `src/styles/themes.css` | Add to `ThemeSwitcher.tsx`, pick in nav |
| Any visible text | `src/content/copy.ts` | Save, it shows up |
| Blog/article content | `content/articles/*.md` | Save, it rebuilds |
| A component's markup | `src/components/...` | Only when changing behavior |

## Hard rules for any redesign
- Keep the token names in `tokens.css`.
- Keep body text at 16px or larger.
- Keep every interactive control reachable by keyboard with a visible focus ring.
- Keep contrast at WCAG AA (4.5 to 1 for text).
- No dashes in copy. Short sentences. Plain words.
