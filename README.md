# Front-End and Design System Demos

Small demos that actually work, built to show both halves of one job: design
thinking and shipped front-end. Built with Next.js, React, and TypeScript.

Live: https://demos.withmagic.ai

These are demos I built to show skill. They are not production work for any named
company.

## The six demos

1. **Design system and component library** (`/design-system`). Tokens for color,
   type, and space feeding a real, documented component library.
2. **Accessible audio player** (`/audio`). Full keyboard control, screen reader
   support, AA contrast.
3. **Headless CMS content site** (`/cms`). Built at build time from a swappable
   data source. Open-source Git CMS now, Contentful by changing one file.
4. **Membership funnel** (`/membership`). Multi-step accessible form, real
   submission through Netlify Forms, plus the CRM hand-off design.
5. **Personalized dashboard and analytics** (`/dashboard`). A listener dashboard
   plus a first-party, cookieless traffic-attribution engine.
6. **Accessibility redesign case study** (`/case-study`). Persona, scenario,
   journey map, IA, wireframes, and before and after scores. Artifacts as code.

## Stack

- Next.js (App Router) with static export
- React and TypeScript
- CSS Modules with design tokens
- gray-matter and marked for the Git CMS
- mermaid for diagrams as code
- Deploys static to Netlify, no database

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static output in ./out
```

## How it is organized

Three layers you can change on their own. See `DESIGN-AND-COPY.md` for the full
guide (including how to use Claude to redo the look or the words).

```
src/
  app/            Pages (thin glue)
  components/     UI components (read tokens only)
  content/copy.ts All visible copy, in one file
  lib/            Logic: CMS adapters, attribution engine, data
  styles/
    tokens.css    Default theme + the full token list (single source of truth)
    themes.css    Alternate themes (Noir, Editorial, Terminal)
content/articles/ Markdown for the CMS demo
public/admin/     Decap CMS admin (open source, Git-based)
```

- **Structure** is `components`. **Skin** is `styles`. **Words** is `content/copy.ts`.
- Components never hard-code a color or size. They read semantic tokens, so one
  theme change updates the whole site.
- The CMS reads through a `CmsSource` interface, so swapping to Contentful is one
  new adapter and no page changes.

## Accessibility

Built to WCAG 2.2 AA. Skip link, semantic landmarks, full keyboard support, a
visible focus ring on every control, labels on icon buttons, polite live regions
for status, and reduced-motion support.

## Theming

Pick a theme from the menu in the top nav. Add your own in `themes.css`. See
`DESIGN-AND-COPY.md`.
