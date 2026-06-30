import styles from "./Badge.module.css";

type Tone = "neutral" | "accent" | "ink" | "live";

export function Badge({
  children,
  tone = "neutral",
  className = "",
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span className={`${styles.badge} ${styles[tone]} ${className}`}>
      {tone === "live" && <span className={styles.dot} aria-hidden="true" />}
      {children}
    </span>
  );
}
