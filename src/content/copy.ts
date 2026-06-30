/**
 * ALL user-facing copy lives here.
 *
 * Why one file: the words are separate from the components and the theme. You can
 * hand this single file to Claude (or any writer), ask for a new voice or a whole
 * rewrite, and paste it back. No component changes. See DESIGN-AND-COPY.md.
 *
 * Voice rules for this file: short sentences, plain words, no dashes, no filler.
 */

export const nav = [
  { href: "/design-system/", label: "Design System" },
  { href: "/audio/", label: "Audio Player" },
  { href: "/cms/", label: "Content (CMS)" },
  { href: "/membership/", label: "Membership" },
  { href: "/dashboard/", label: "Dashboard" },
  { href: "/case-study/", label: "Case Study" },
];

/**
 * Flip to true to ship the KCRW-targeted wording (one switch retargets the
 * eyebrow, lead, station label, "why" lead, and contact title). Default is the
 * general version so the live site reads for any senior design + front-end role.
 */
export const KCRW_MODE = false;

export const onAir = {
  label: "ON AIR",
  station: KCRW_MODE ? "KCRW" : "LA",
  pauseLabel: "Pause the on air animation",
  playLabel: "Play the on air animation",
};

export const home = {
  eyebrow: KCRW_MODE
    ? "For KCRW · Senior Product Designer and Front End Engineer"
    : "Senior Product Designer and Front End Engineer",
  titleLine1: "I design it.",
  titleLine2: "Then I build",
  titleAccent: "it for real.",
  lead: KCRW_MODE
    ? "I'm Raj. I do both halves of this job. I draw the user journey, design the system, then write the React that ships it. Below are six small products. Each one runs in your browser right now. None are mockups. Each one proves a part of what KCRW needs."
    : "I'm Raj. I do both halves of this job. I draw the user journey, design the system, then write the React that ships it. Below are six small products. Each one runs in your browser right now. None are mockups. Each one proves a part of what this role needs.",
  ctaPrimary: "See the work",
  ctaSecondary: "Why I fit the role",
  card: {
    nowBroadcasting: "NOW BROADCASTING",
    available: "AVAILABLE",
    title: "A portfolio that actually runs.",
    sub: "Six working demos. Open any one.",
    location: "RAJ · LOS ANGELES",
  },
  stack: [
    "Next.js",
    "React",
    "TypeScript",
    "CSS / SCSS",
    "WCAG 2.2 AA",
    "Headless CMS",
    "Contentful",
    "REST / GraphQL",
    "Analytics",
    "Node.js",
  ],
  workEyebrow: "The work",
  demosTitle: "Six demos. Six skills.",
  demosLead:
    "Each one works in the browser right now. None are mockups. Open any of them.",
  shippedEyebrow: "Proof",
  shippedTitle: "And these actually shipped.",
  shippedLead:
    "Live products I designed and built end to end. Front end, back end, billing, and analytics. The demos prove the stack. These prove the track record.",
  whyEyebrow: "The fit",
  whyTitle: "Why I fit this role.",
  whyLead: KCRW_MODE
    ? "Straight from your job post to the things I already build."
    : "What this kind of role needs, and what I already build.",
  why: [
    {
      n: "01",
      k: "Design systems",
      t: "You want a reusable component library. I build token driven systems that stay consistent and theme in one step.",
    },
    {
      n: "02",
      k: "Accessibility",
      t: "Every demo here clears WCAG 2.2 AA. Keyboard, focus, contrast, and reduced motion are built in from the start.",
    },
    {
      n: "03",
      k: "Headless CMS",
      t: "I work in headless content. Contentful drops in behind one adapter, with no page changes.",
    },
    {
      n: "04",
      k: "Membership and CRM",
      t: "Public media runs on members. I build join flows that convert and hand off clean to Salesforce or HubSpot.",
    },
    {
      n: "05",
      k: "Privacy first analytics",
      t: "I ship first party, cookieless tracking. It even catches the AI answer engines most tools miss.",
    },
    {
      n: "06",
      k: "Design and code, one hire",
      t: "I draw the journey, then write the React that ships it. You hire one person, not two.",
    },
  ],
  contactEyebrow: "Get in touch",
  contactTitleLines: KCRW_MODE
    ? ["Let's build KCRW's", "next chapter."]
    : ["Let's build", "your next chapter."],
  contactLead:
    "One person who can design the experience and ship the front end. That is the whole pitch. Take a look, then let's talk.",
  contactCtaDemos: "See the live demos",
  contactCtaSource: "Read the source",
  contactMorePrefix: "More work at ",
};

export const footer = {
  tagline:
    "Product designer and front-end engineer. Design thinking and shipped front-end. Built on Next.js, React, and TypeScript.",
  note: "These are demos I built to show front-end and design skill. They are not production work for any named company.",
  wcag: "Keyboard accessible · WCAG 2.2 AA",
};

export const audio = {
  eyebrow: "Demo 02 · Audio and accessibility",
  title: "Accessible audio player",
  lead: "Radio, podcasts, and DJ sessions. Audio is the core of this kind of product. This player works for everyone: keyboard users, screen reader users, and people who turn off animation.",
  specTitle: "How it meets WCAG",
  captionPrefix: "Try it with the keyboard. ",
  a11y: [
    {
      name: "Full keyboard control",
      wcag: "2.1.1 Keyboard (A)",
      detail:
        "Every control is a real button or input you can reach with Tab. Space or K plays and pauses. J and L skip 15 seconds. Arrow keys scrub the seek bar.",
    },
    {
      name: "Visible focus",
      wcag: "2.4.7 Focus Visible (AA)",
      detail:
        "One focus ring, set by a design token, is never removed. Keyboard users always know where they are.",
    },
    {
      name: "Status announcements",
      wcag: "4.1.3 Status Messages (AA)",
      detail:
        "A polite live region announces track changes and play or pause. It never steals focus.",
    },
    {
      name: "Clear labels",
      wcag: "4.1.2 Name, Role, Value (A)",
      detail:
        "Icon buttons carry real labels. The seek bar speaks its position, like one minute twenty three of four minutes.",
    },
    {
      name: "Color contrast",
      wcag: "1.4.3 Contrast (AA)",
      detail:
        "Text and controls clear 4.5 to 1 against their background. The bright accent is only used where it passes.",
    },
    {
      name: "Respects motion settings",
      wcag: "2.3.3 Animation from Interactions (AAA)",
      detail:
        "All motion stops when the visitor asks for reduced motion. Nothing important depends on animation.",
    },
  ],
};

export const designSystem = {
  eyebrow: "Demo 01 · The priority hire need",
  title: "Design system and component library",
  lead: "The role asks for this twice. Here is how I build it. A token layer is the single source of truth. It feeds a small set of accessible, reusable components. Change a token, and the whole system updates.",
  tokensTitle: "The token architecture",
  tokensIntro:
    "Components never hard code a color or a size. They read semantic tokens, and those tokens point at the brand values. That one step is what makes the system easy to theme and keep consistent.",
  colorTitle: "Color tokens",
  typeTitle: "Type scale",
  typeIntro: "A simple modular scale. Body text never drops below 16px.",
  spaceTitle: "Spacing and radius",
  spaceIntro: "An 8px spacing scale and a small set of corner radii keep the rhythm even.",
  buttonsTitle: "Buttons",
  buttonsIntro: "One component renders a button or a link. Four styles, three sizes.",
  badgesTitle: "Badges and status",
  cardsTitle: "Cards",
  commerceTitle: "Commerce surface",
  commerceIntro:
    "The same system covers a store card too. That matters for Shopify and storefront work, not just media UI.",
  audioTitle: "A bigger component: the audio player",
  audioIntro:
    "Tokens and small parts build up into one complex, fully accessible component. It also stands on its own as Demo 02.",
};

export const cms = {
  eyebrow: "Demo 03 · Headless CMS and SEO",
  title: "Content from a headless CMS",
  lead: "Article pages built at build time from structured content. The data comes through a swappable adapter. It runs on an open-source Git CMS today, and moves to Contentful by flipping one switch.",
  liveSourceLabel: "Live source",
  noteText1:
    "Every page below talks only to a CmsSource interface. Moving to Contentful means adding one adapter and two settings. No page changes. Content is fetched once at build, so the site ships as static HTML with strong SEO and fast loads.",
  noteText2Prefix: "Editors manage content through the ",
  noteText2Link: "Decap CMS admin",
  noteText2Suffix: ", which is open source and backed by Git.",
  empty: "No articles found in /content/articles.",
};

export const membership = {
  eyebrow: "Demo 04 · Conversion and CRM",
  title: "Membership funnel",
  lead: "Public media runs on member support, so the join flow has to convert and feel like a welcome. One choice per step, clear inline validation, and a real submission. Then the plan for pushing each member to a CRM.",
  designTitle: "How it would reach your CRM",
  designIntro:
    "No live CRM is wired here, since that needs your own keys. But this is how I would build the hand off. It runs on free, serverless pieces.",
  calloutTitle: "Why a middleware step?",
  calloutText:
    "Posting straight to a CRM from the browser leaks your API keys and locks you to one vendor. A thin serverless function keeps the keys on the server, lets you check and clean the data, and makes switching HubSpot and Salesforce a one adapter change. Same pattern as the CMS demo.",
  pipeline: [
    {
      label: "Join form",
      sub: "React, accessible, validated",
      detail: "Captures tier, amount, billing, name, and email.",
    },
    {
      label: "Netlify Forms",
      sub: "submission capture",
      detail: "No backend needed. It fires a webhook on every submission.",
    },
    {
      label: "Middleware",
      sub: "Netlify Function",
      detail: "Maps fields, removes duplicates by email, and adds the traffic source.",
    },
    {
      label: "CRM",
      sub: "Salesforce or HubSpot",
      detail: "Creates or updates a contact and sets the membership tier and stage.",
    },
  ],
};

export const dashboard = {
  eyebrow: "Demo 05 · Personalization and analytics",
  title: "Your station, and how it is found",
  lead: "Two data-driven views in one. A personalized listener dashboard, and a first-party analytics engine that sorts traffic into AI, search, social, and email. No cookies, no Google.",
  methodTitle: "How the attribution works",
  methodText1:
    "The attribution function is a TypeScript port of an engine I shipped on a real product. It uses only the page path, the referrer, and any UTM tags. No IP, no cookies, no personal data. The same function runs in three places.",
  steps: [
    {
      strong: "Browser beacon",
      rest: " fires once per page view. The box above sorts your own visit live.",
    },
    {
      strong: "Serverless function",
      rest: " receives the beacon, sorts it, and writes to free key value storage (Netlify Blobs). No database.",
    },
    { strong: "Dashboard", rest: " adds the events up into the chart you see here." },
  ],
  methodText2:
    "Because it is first-party and cookieless, it needs no consent banner and respects privacy by default. It also catches the one bucket most tools miss: AI answer engines.",
};

export const caseStudy = {
  eyebrow: "Demo 06 · Design thinking",
  title: "Redesigning a show page for accessibility",
  lead: "The engineering demos prove I ship. This proves how I decide what to ship. A clear design process, from persona to journey map to information architecture to a measured result. Every artifact is built as code. No Figma needed.",
  problemTitle: "The problem",
  problemText:
    "A listener hears a track on air and wants to find the show, play it, and save it for later. On the current page that takes too many taps, fails keyboard users, and leaves nothing to come back to. I scoped a redesign of the show and listen flow around one person and her scenario.",
  personaTitle: "1 · Persona",
  scenarioTitle: "2 · Context scenario",
  scenarioText:
    "Priya is on the bus when a track catches her ear. She pulls out her phone in bright sun with one hand on the rail. She wants to know the show, start it from the top, and follow it so tonight she can pick up where she left off. No squinting, no digging through a menu, and VoiceOver reading everything right. The design has to make that whole arc feel like three easy taps.",
  scenarioNote:
    "The method: write the story first, then pull the requirements from it. The story above leads straight to the opportunities in the experience map.",
  journeyTitle: "3 · Experience map",
  journeyLead:
    "Reading down each phase shows the pain points in red and the design opportunities highlighted. Those are what the redesign has to answer.",
  iaTitle: "4 · Information architecture and flow",
  iaLead:
    "Diagrams as code with Mermaid. They live in the repo as text, not as exported images. Left is the site structure. Right is the redesigned task flow.",
  wireTitle: "5 · Wireframes, before and after",
  resultTitle: "6 · The result, measured",
  resultLead:
    "Accessibility is testable, so the redesign is measured, not claimed. Scores are from axe-core and Lighthouse on the prototype.",
  resultNote:
    "These numbers are from the prototype I built for this case study, not a live KCRW page. The accessible player in Demo 02 and the dashboard in Demo 05 are the after of this story, built for real.",
};
