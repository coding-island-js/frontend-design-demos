import type { Metadata } from "next";
import { PageShell, PageHeader } from "@/components/PageShell";
import { Mermaid } from "@/components/Mermaid";
import { JourneyMap, type Stage } from "@/components/JourneyMap/JourneyMap";
import { Badge } from "@/components/Badge";
import { caseStudy as t } from "@/content/copy";
import styles from "./case-study.module.css";

export const metadata: Metadata = {
  title: "Accessibility Redesign Case Study",
  description:
    "A clear design process: persona, scenario, journey map, information architecture, flow, wireframes, and before and after accessibility scores.",
};

// Demo-specific design artifacts. These live with the page; the prose lives in
// src/content/copy.ts.
const STAGES: Stage[] = [
  {
    stage: "Hears a track",
    doing: "Catches a song on air and wants to know what it was.",
    thinking: "What was that? I need to find it before I forget.",
    feeling: "🙂",
    pain: "Now playing is buried three taps deep.",
    opportunity: "A persistent now playing bar with one tap to save.",
  },
  {
    stage: "Searches the site",
    doing: "Opens the site on her phone to find the show.",
    thinking: "Which show is on at 9am again?",
    feeling: "😕",
    pain: "The schedule is a dense table with no clear focus order.",
    opportunity: "A card based schedule with clear focus states.",
  },
  {
    stage: "Plays the show",
    doing: "Starts the live stream or the on demand episode.",
    thinking: "Just let me press play.",
    feeling: "😣",
    pain: "The play button is an unlabeled icon. A screen reader says button.",
    opportunity: "A labeled, keyboard ready player (Demo 02).",
  },
  {
    stage: "Saves and returns",
    doing: "Wants to follow the show and come back later.",
    thinking: "Will I be able to find this again?",
    feeling: "😐",
    pain: "No saved state. Nothing personal to return to.",
    opportunity: "A My Station dashboard (Demo 05).",
  },
];

const IA_CHART = `graph TD
  Home["Home"] --> Listen["Listen Live"]
  Home --> Shows["Shows"]
  Home --> Schedule["Schedule"]
  Home --> My["My Station"]
  Home --> Support["Support / Join"]
  Shows --> ShowDetail["Show detail"]
  ShowDetail --> Episode["Episode + player"]
  My --> Saved["Saved shows"]
  My --> Recent["Recently played"]
  Support --> Join["Membership funnel"]`;

const FLOW_CHART = `flowchart LR
  A([Hears a track]) --> B{Knows the show?}
  B -- No --> C[Open Schedule]
  C --> D[Pick show card]
  B -- Yes --> D
  D --> E[Show detail]
  E --> F[(Play: labeled,\\nkeyboard ready)]
  F --> G{Wants it later?}
  G -- Yes --> H[Save to My Station]
  G -- No --> I([Keep listening])
  H --> I`;

const SCORES = [
  { metric: "axe violations", before: "23", after: "0" },
  { metric: "Lighthouse a11y", before: "61", after: "100" },
  { metric: "Keyboard operable", before: "Partial", after: "Full" },
  { metric: "Contrast failures", before: "9", after: "0" },
  { metric: "Labeled controls", before: "54%", after: "100%" },
];

const BEFORE_ISSUES = [
  "Icon only controls, no labels",
  "3.1 to 1 text contrast on cream",
  "Schedule is a non semantic table",
  "Focus order jumps around",
  "No skip link, nav not reachable by keyboard",
];
const AFTER_FIXES = [
  "Every control labeled and in tab order",
  "All text 4.5 to 1 or better (AA)",
  "Card schedule with real headings",
  "Logical order with a visible focus ring",
  "Skip link and landmark regions",
];

export default function CaseStudyPage() {
  return (
    <PageShell demoHref="/case-study/">
      <PageHeader eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

      <div className={styles.body}>
        <section className={styles.section} aria-labelledby="cs-problem">
          <h2 id="cs-problem" className={styles.h2}>
            {t.problemTitle}
          </h2>
          <p className={styles.lead}>{t.problemText}</p>
        </section>

        <section className={styles.section} aria-labelledby="cs-persona">
          <h2 id="cs-persona" className={styles.h2}>
            {t.personaTitle}
          </h2>
          <div className={styles.persona}>
            <div className={styles.personaAvatar} aria-hidden="true">
              PR
            </div>
            <div>
              <p className={styles.personaName}>Priya, 34. Commuter and member.</p>
              <p className={styles.personaRole}>Listens on her phone, often one handed on transit.</p>
              <ul className={styles.personaGoals}>
                <li>
                  <strong>Goal:</strong> capture a song or show the moment she hears it.
                </li>
                <li>
                  <strong>Goal:</strong> get to play in the fewest taps.
                </li>
                <li>
                  <strong>Context:</strong> uses VoiceOver some mornings, with bright sun on the
                  screen.
                </li>
                <li>
                  <strong>Frustration:</strong> I lose the thing I wanted before I can save it.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="cs-scenario">
          <h2 id="cs-scenario" className={styles.h2}>
            {t.scenarioTitle}
          </h2>
          <blockquote className={styles.scenario}>{t.scenarioText}</blockquote>
          <p className={styles.note}>{t.scenarioNote}</p>
        </section>

        <section className={styles.section} aria-labelledby="cs-journey">
          <h2 id="cs-journey" className={styles.h2}>
            {t.journeyTitle}
          </h2>
          <p className={styles.lead}>{t.journeyLead}</p>
          <JourneyMap persona="Priya. Find, play, save a show." stages={STAGES} />
        </section>

        <section className={styles.section} aria-labelledby="cs-ia">
          <h2 id="cs-ia" className={styles.h2}>
            {t.iaTitle}
          </h2>
          <p className={styles.lead}>{t.iaLead}</p>
          <div className={styles.diagrams}>
            <Mermaid chart={IA_CHART} caption="Information architecture. Site structure." />
            <Mermaid chart={FLOW_CHART} caption="Task flow. Hear, find, play, save." />
          </div>
        </section>

        <section className={styles.section} aria-labelledby="cs-wire">
          <h2 id="cs-wire" className={styles.h2}>
            {t.wireTitle}
          </h2>
          <div className={styles.wireGrid}>
            <figure className={styles.wire}>
              <figcaption className={styles.wireCap}>
                <Badge tone="live">Before</Badge> cluttered and inaccessible
              </figcaption>
              <div className={`${styles.frame} ${styles.frameBefore}`} aria-hidden="true">
                <div className={styles.wbDenseNav}>tiny menu</div>
                <div className={styles.wbTable}>schedule as a dense table</div>
                <div className={styles.wbIcon}>play (unlabeled)</div>
                <div className={styles.wbBlock} />
                <div className={styles.wbBlock} />
              </div>
              <ul className={styles.wireList}>
                {BEFORE_ISSUES.map((i) => (
                  <li key={i} className={styles.issueBad}>
                    {i}
                  </li>
                ))}
              </ul>
            </figure>

            <figure className={styles.wire}>
              <figcaption className={styles.wireCap}>
                <Badge tone="accent">After</Badge> clear and accessible
              </figcaption>
              <div className={`${styles.frame} ${styles.frameAfter}`} aria-hidden="true">
                <div className={styles.waNav}>Listen · Shows · My Station</div>
                <div className={styles.waNowPlaying}>Now playing · Save</div>
                <div className={styles.waCards}>
                  <span />
                  <span />
                  <span />
                </div>
                <div className={styles.waPlay}>Play episode</div>
              </div>
              <ul className={styles.wireList}>
                {AFTER_FIXES.map((i) => (
                  <li key={i} className={styles.issueGood}>
                    {i}
                  </li>
                ))}
              </ul>
            </figure>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="cs-result">
          <h2 id="cs-result" className={styles.h2}>
            {t.resultTitle}
          </h2>
          <p className={styles.lead}>{t.resultLead}</p>
          <table className={styles.scores}>
            <thead>
              <tr>
                <th scope="col">Metric</th>
                <th scope="col">Before</th>
                <th scope="col">After</th>
              </tr>
            </thead>
            <tbody>
              {SCORES.map((s) => (
                <tr key={s.metric}>
                  <th scope="row">{s.metric}</th>
                  <td className={styles.before}>{s.before}</td>
                  <td className={styles.after}>{s.after}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className={styles.note}>{t.resultNote}</p>
        </section>
      </div>
    </PageShell>
  );
}
