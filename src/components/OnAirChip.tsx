"use client";

import { useEffect, useState } from "react";
import { LiveClock } from "./LiveClock";
import { onAir } from "@/content/copy";
import styles from "./OnAirChip.module.css";

/** Bar timings lifted from the design (each bar dances on its own clock). */
const BARS = [
  { dur: "0.80s", delay: "-0.10s" },
  { dur: "0.95s", delay: "-0.30s" },
  { dur: "0.72s", delay: "-0.05s" },
  { dur: "1.00s", delay: "-0.22s" },
  { dur: "0.85s", delay: "-0.15s" },
];

/**
 * The signature "on air" broadcast chip in the nav: a pulsing dot, an ON AIR
 * label, the station, a five-bar equalizer, a live LA clock, and a play/pause
 * button that toggles every equalizer on the page at once. Reduced-motion safe.
 */
export function OnAirChip() {
  // null until mount so SSR markup is stable; we only know motion prefs client-side.
  const [paused, setPaused] = useState<boolean | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setPaused(prefersReduced);
  }, []);

  useEffect(() => {
    if (paused === null) return;
    document.documentElement.dataset.eqPaused = String(paused);
  }, [paused]);

  // Bars animate by default (CSS), so treat "unknown" as playing to match them.
  const playing = paused !== true;

  return (
    <div className={styles.chip}>
      <span className={styles.dot} aria-hidden="true" />
      <span className={styles.onAir}>{onAir.label}</span>
      <span className={styles.station}>{onAir.station}</span>
      <span className={styles.eq} aria-hidden="true">
        {BARS.map((b, i) => (
          <span
            key={i}
            data-eq-bar
            className={styles.bar}
            style={{ animationDuration: b.dur, animationDelay: b.delay }}
          />
        ))}
      </span>
      <LiveClock className={styles.clock} />
      <button
        type="button"
        className={styles.toggle}
        aria-pressed={playing}
        aria-label={playing ? onAir.pauseLabel : onAir.playLabel}
        onClick={() => setPaused((p) => !p)}
      >
        <span aria-hidden="true">{playing ? "❚❚" : "▶"}</span>
      </button>
    </div>
  );
}
