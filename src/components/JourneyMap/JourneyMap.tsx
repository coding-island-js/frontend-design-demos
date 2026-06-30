import styles from "./JourneyMap.module.css";

/**
 * A Kim Goodwin style experience (journey) map.
 *
 * Goodwin's method runs persona → context scenario → experience map → require-
 * ments. The map lays the journey's *stages* across the top, then reads down
 * through what the person does, thinks, and feels, surfacing pain points and the
 * design opportunities that answer them. Built as a real, responsive component
 * (not an exported image) so it lives in the repo as code.
 */

export type Stage = {
  stage: string;
  doing: string;
  thinking: string;
  feeling: "😀" | "🙂" | "😐" | "😕" | "😣";
  pain: string;
  opportunity: string;
};

const ROWS: { key: keyof Omit<Stage, "stage">; label: string }[] = [
  { key: "doing", label: "Doing" },
  { key: "thinking", label: "Thinking" },
  { key: "feeling", label: "Feeling" },
  { key: "pain", label: "Pain points" },
  { key: "opportunity", label: "Opportunities" },
];

export function JourneyMap({ persona, stages }: { persona: string; stages: Stage[] }) {
  return (
    <div className={styles.scroll}>
      <table className={styles.table}>
        <caption className={styles.caption}>
          Experience map · <strong>{persona}</strong>
        </caption>
        <thead>
          <tr>
            <th scope="col" className={styles.corner}>
              Phase →
            </th>
            {stages.map((s) => (
              <th key={s.stage} scope="col" className={styles.stageHead}>
                {s.stage}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => (
            <tr key={row.key} className={row.key === "feeling" ? styles.feelingRow : ""}>
              <th scope="row" className={styles.rowHead}>
                {row.label}
              </th>
              {stages.map((s) => (
                <td
                  key={s.stage}
                  className={`${styles.cell} ${
                    row.key === "pain"
                      ? styles.painCell
                      : row.key === "opportunity"
                        ? styles.oppCell
                        : ""
                  } ${row.key === "feeling" ? styles.feelingCell : ""}`}
                >
                  {row.key === "feeling" ? (
                    <span className={styles.emoji} aria-hidden="true">
                      {s.feeling}
                    </span>
                  ) : (
                    s[row.key]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
