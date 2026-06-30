import { LiveClock } from "./LiveClock";
import { home } from "@/content/copy";
import styles from "./BroadcastCard.module.css";

/** Tall equalizer timings (one per bar) from the design. */
const BARS = [
  { dur: "0.86s", delay: "-0.05s" },
  { dur: "0.98s", delay: "-0.30s" },
  { dur: "0.76s", delay: "-0.12s" },
  { dur: "1.05s", delay: "-0.22s" },
  { dur: "0.90s", delay: "-0.40s" },
  { dur: "0.82s", delay: "-0.08s" },
  { dur: "1.00s", delay: "-0.34s" },
  { dur: "0.88s", delay: "-0.16s" },
  { dur: "0.94s", delay: "-0.02s" },
  { dur: "0.78s", delay: "-0.26s" },
  { dur: "1.08s", delay: "-0.12s" },
  { dur: "0.84s", delay: "-0.36s" },
  { dur: "0.96s", delay: "-0.20s" },
];

/** The "now broadcasting" card that anchors the hero's right column. */
export function BroadcastCard() {
  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <span className={styles.label}>{home.card.nowBroadcasting}</span>
        <span className={styles.available}>
          <span className={styles.availDot} aria-hidden="true" />
          {home.card.available}
        </span>
      </div>
      <p className={styles.cardTitle}>{home.card.title}</p>
      <p className={styles.cardSub}>{home.card.sub}</p>
      <div className={styles.eq} aria-hidden="true">
        {BARS.map((b, i) => (
          <span
            key={i}
            data-eq-bar
            className={styles.bar}
            style={{ animationDuration: b.dur, animationDelay: b.delay }}
          />
        ))}
      </div>
      <div className={styles.divider} />
      <div className={styles.foot}>
        <span>{home.card.location}</span>
        <LiveClock className={styles.clock} />
      </div>
    </div>
  );
}
