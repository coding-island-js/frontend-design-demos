export type Demo = {
  href: string;
  num: string;
  title: string;
  blurb: string;
  proves: string[];
  stack: string[];
};

/** The six portfolio demos, ordered by strength. */
export const DEMOS: Demo[] = [
  {
    href: "/design-system/",
    num: "01",
    title: "Design System & Component Library",
    blurb:
      "Design tokens for color, type, and spacing. They feed a real component library: buttons, cards, badges, nav, and an audio player. This is the thing the job asks for twice.",
    proves: ["Design systems", "Reusable components", "Tokens", "Documentation"],
    stack: ["Next.js", "TypeScript", "CSS Modules", "Design tokens"],
  },
  {
    href: "/audio/",
    num: "02",
    title: "Accessible Audio Player",
    blurb:
      "A real playlist player. Full keyboard control, screen reader support, clear focus, and AA contrast. Built for radio, podcasts, and DJ sessions.",
    proves: ["WCAG / a11y", "Audio UX", "Front-end depth", "Keyboard support"],
    stack: ["React", "Web Audio", "ARIA", "TypeScript"],
  },
  {
    href: "/cms/",
    num: "03",
    title: "Headless CMS Content Site",
    blurb:
      "Article list and detail pages built from a headless CMS at build time, with SEO tags. The data source is swappable. It runs on an open-source Git CMS now, and moves to Contentful by changing one file.",
    proves: ["Headless CMS", "Contentful adapter", "SEO", "API integration"],
    stack: ["Next.js", "Decap CMS", "Adapter pattern", "Structured content"],
  },
  {
    href: "/membership/",
    num: "04",
    title: "Membership & Donation Funnel",
    blurb:
      "A multi-step join flow with clear inline validation and a real submission. It also shows how I would push each member to a CRM like Salesforce or HubSpot.",
    proves: ["Conversion UX", "Accessible forms", "CRM integration", "Retention"],
    stack: ["React", "Netlify Forms", "Form a11y", "Multi-step UX"],
  },
  {
    href: "/dashboard/",
    num: "05",
    title: "Personalized Dashboard & Analytics",
    blurb:
      "A listener dashboard driven by sample data. Plus a first-party analytics engine I shipped on a real product, ported to TypeScript. It sorts traffic into AI, search, social, and email. No cookies, no Google.",
    proves: ["Personalization", "Analytics", "Data-driven UX", "Privacy-first"],
    stack: ["React", "First-party beacon", "Attribution engine", "TypeScript"],
  },
  {
    href: "/case-study/",
    num: "06",
    title: "Accessibility Redesign Case Study",
    blurb:
      "The design thinking half. Persona, scenario, journey map, information architecture, wireframes, and before and after accessibility scores. Every artifact is built as code. No Figma needed.",
    proves: ["UX research", "Journey mapping", "IA", "WCAG audit"],
    stack: ["Mermaid", "Journey map", "Wireframes", "axe / Lighthouse"],
  },
];

export type Shipped = {
  name: string;
  url: string;
  blurb: string;
};

/** Real, live products. The proof that I ship, behind the demos. */
export const SHIPPED: Shipped[] = [
  {
    name: "Movies, Take It Slow",
    url: "https://movies.takeitslow.life",
    blurb: "A weekly one-on-one about a single film. Full product, live.",
  },
  {
    name: "AI Pickleball Swing Check",
    url: "https://pickleball.withmagic.ai",
    blurb: "Record a swing, get back the one fix. Video and ML pipeline.",
  },
  {
    name: "RingPilot",
    url: "https://getringpilot.com",
    blurb: "An AI phone number that answers your calls. SaaS with billing.",
  },
  {
    name: "LawMarketing.ai",
    url: "https://lawmarketing.ai",
    blurb: "YouTube Shorts and AI-search visibility for small law firms.",
  },
];
