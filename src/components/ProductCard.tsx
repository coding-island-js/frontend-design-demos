import styles from "./ProductCard.module.css";
import { Button } from "./Button";
import { Badge } from "./Badge";

/**
 * E-commerce product card. Included to show the same design system also covers
 * a commerce surface (relevant to Shopify/storefront front-end work), not just
 * editorial/media UI.
 */
export function ProductCard({
  name,
  price,
  blurb,
  tag,
  swatch = "#2b6cb0",
}: {
  name: string;
  price: string;
  blurb: string;
  tag?: string;
  swatch?: string;
}) {
  return (
    <article className={styles.card}>
      <div className={styles.media} style={{ background: swatch }} aria-hidden="true">
        {tag && (
          <span className={styles.tag}>
            <Badge tone="ink">{tag}</Badge>
          </span>
        )}
      </div>
      <div className={styles.body}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.blurb}>{blurb}</p>
        <div className={styles.footer}>
          <span className={styles.price}>{price}</span>
          <Button size="sm" variant="primary">
            Add to cart
          </Button>
        </div>
      </div>
    </article>
  );
}
