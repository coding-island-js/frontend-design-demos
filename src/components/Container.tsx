import styles from "./Container.module.css";

type Width = "sm" | "md" | "lg" | "xl";

export function Container({
  children,
  width = "lg",
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  width?: Width;
  className?: string;
  as?: React.ElementType;
}) {
  return (
    <Tag className={`${styles.container} ${styles[width]} ${className}`}>
      {children}
    </Tag>
  );
}
