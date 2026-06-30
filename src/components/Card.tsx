import styles from "./Card.module.css";

/**
 * Content card. When `href` is set the whole card becomes one large click
 * target with an accessible focus ring (the title carries the link text).
 */
export function Card({
  children,
  href,
  tone = "surface",
  className = "",
}: {
  children: React.ReactNode;
  href?: string;
  tone?: "surface" | "ink";
  className?: string;
}) {
  const cls = `${styles.card} ${styles[tone]} ${href ? styles.interactive : ""} ${className}`;
  if (href) {
    const external = href.startsWith("http");
    return (
      <a
        className={cls}
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }
  return <article className={cls}>{children}</article>;
}

export function CardEyebrow({ children }: { children: React.ReactNode }) {
  return <p className={styles.eyebrow}>{children}</p>;
}
export function CardTitle({ children }: { children: React.ReactNode }) {
  return <h3 className={styles.title}>{children}</h3>;
}
export function CardBody({ children }: { children: React.ReactNode }) {
  return <p className={styles.body}>{children}</p>;
}
