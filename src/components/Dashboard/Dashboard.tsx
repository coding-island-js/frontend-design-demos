"use client";

import { useEffect, useMemo, useState } from "react";
import {
  deriveSource,
  SOURCE_LABELS,
  type TrafficSource,
  type Utm,
} from "@/lib/attribution";
import {
  SAMPLE_EVENTS,
  SAVED_SHOWS,
  RECENTLY_PLAYED,
  RECOMMENDATIONS,
} from "@/lib/sample-analytics";
import styles from "./Dashboard.module.css";

/** Count sample events per attributed source, sorted high → low. */
function aggregate(): { source: TrafficSource; count: number }[] {
  const counts = new Map<TrafficSource, number>();
  for (const e of SAMPLE_EVENTS) {
    const s = deriveSource(e.ref, e.utm, "demos.withmagic.ai");
    counts.set(s, (counts.get(s) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([source, count]) => ({ source, count }))
    .sort((a, b) => b.count - a.count);
}

export function Dashboard() {
  const breakdown = useMemo(aggregate, []);
  const total = SAMPLE_EVENTS.length;
  const max = Math.max(...breakdown.map((b) => b.count));

  // Live attribution of THIS visit, computed in the browser from the real
  // referrer + URL parameters, the same function the sample data uses.
  const [live, setLive] = useState<{ source: TrafficSource; ref: string } | null>(null);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const utm: Utm = {
      utm_source: params.get("utm_source") ?? undefined,
      utm_medium: params.get("utm_medium") ?? undefined,
      utm_campaign: params.get("utm_campaign") ?? undefined,
    };
    const ref = document.referrer || "";
    setLive({ source: deriveSource(ref, utm, "demos.withmagic.ai"), ref });
  }, []);

  return (
    <div className={styles.grid}>
      {/* Personalization column */}
      <section className={styles.col} aria-labelledby="mystation">
        <h2 id="mystation" className={styles.colTitle}>
          My Station
        </h2>

        <div className={styles.panel}>
          <h3 className={styles.panelTitle}>Saved shows</h3>
          <ul className={styles.list}>
            {SAVED_SHOWS.map((s) => (
              <li key={s.name} className={styles.listRow}>
                <span className={styles.rowMain}>{s.name}</span>
                <span className={styles.rowSub}>
                  {s.host} · {s.cadence}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.panel}>
          <h3 className={styles.panelTitle}>Recently played</h3>
          <ul className={styles.list}>
            {RECENTLY_PLAYED.map((r) => (
              <li key={r.title} className={styles.listRow}>
                <span className={styles.rowMain}>{r.title}</span>
                <span className={styles.rowSub}>
                  {r.artist} · {r.when}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className={`${styles.panel} ${styles.panelAccent}`}>
          <h3 className={styles.panelTitle}>Recommended for you</h3>
          <ul className={styles.list}>
            {RECOMMENDATIONS.map((r) => (
              <li key={r.name} className={styles.listRow}>
                <span className={styles.rowMain}>{r.name}</span>
                <span className={styles.rowSub}>{r.why}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Analytics column */}
      <section className={styles.col} aria-labelledby="analytics">
        <h2 id="analytics" className={styles.colTitle}>
          Audience analytics
          <span className={styles.cookieless}>cookieless · first-party</span>
        </h2>

        <div className={styles.panel}>
          <h3 className={styles.panelTitle}>This visit was attributed to</h3>
          {live ? (
            <p className={styles.liveResult}>
              <span className={styles.liveBadge}>{SOURCE_LABELS[live.source]}</span>
              <span className={styles.liveRef}>
                {live.ref ? `referrer: ${live.ref}` : "no referrer (direct / app)"}
              </span>
            </p>
          ) : (
            <p className={styles.rowSub}>Detecting…</p>
          )}
          <p className={styles.hint}>
            Try opening this page with <code>?utm_source=newsletter&amp;utm_medium=email</code> to
            see the engine re-attribute it.
          </p>
        </div>

        <div className={styles.panel}>
          <h3 className={styles.panelTitle}>
            Traffic by source <span className={styles.muted}>({total} sample visits)</span>
          </h3>
          <ul className={styles.bars}>
            {breakdown.map(({ source, count }) => (
              <li key={source} className={styles.barRow}>
                <span className={styles.barLabel}>{SOURCE_LABELS[source]}</span>
                <span className={styles.barTrack}>
                  <span
                    className={`${styles.barFill} ${source === "ai" ? styles.barAi : ""}`}
                    style={{ width: `${(count / max) * 100}%` }}
                  />
                </span>
                <span className={styles.barValue}>{count}</span>
              </li>
            ))}
          </ul>
          <p className={styles.hint}>
            Note the <strong>AI answer engines</strong> bucket. Most tools miss it.
          </p>
        </div>
      </section>
    </div>
  );
}
