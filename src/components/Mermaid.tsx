"use client";

import { useEffect, useId, useRef, useState } from "react";
import styles from "./Mermaid.module.css";

/**
 * Renders a Mermaid diagram from a code string, "diagrams as code".
 *
 * Mermaid is loaded dynamically (client-only) so it never blocks the static
 * build or the initial paint. The raw source is also shown in a <details> so a
 * reader can see that the diagram is real, version-controlled code, not an
 * exported image. This is the open-source, no-Figma approach to design
 * artifacts: flows and information architecture live in the repo as text.
 */
export function Mermaid({ chart, caption }: { chart: string; caption?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const id = useId().replace(/:/g, "");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          fontFamily: "var(--font-sans)",
          theme: "base",
          themeVariables: {
            primaryColor: "#ffffff",
            primaryTextColor: "#201e1d",
            primaryBorderColor: "#201e1d",
            lineColor: "#6f6c66",
            fontSize: "15px",
          },
        });
        const { svg } = await mermaid.render(`m-${id}`, chart);
        if (!cancelled && ref.current) ref.current.innerHTML = svg;
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to render diagram");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [chart, id]);

  return (
    <figure className={styles.figure}>
      <div className={styles.canvas} ref={ref} role="img" aria-label={caption ?? "Diagram"}>
        {error ? <p className={styles.error}>Diagram error: {error}</p> : null}
      </div>
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
      <details className={styles.source}>
        <summary>View diagram source</summary>
        <pre>
          <code>{chart}</code>
        </pre>
      </details>
    </figure>
  );
}
