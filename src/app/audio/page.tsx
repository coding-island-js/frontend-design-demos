import type { Metadata } from "next";
import { PageShell, PageHeader } from "@/components/PageShell";
import { AudioPlayer } from "@/components/AudioPlayer/AudioPlayer";
import { SAMPLE_TRACKS } from "@/lib/tracks";
import { audio } from "@/content/copy";
import styles from "./audio.module.css";

export const metadata: Metadata = {
  title: "Accessible Audio Player",
  description:
    "A playlist audio player with full keyboard control, screen reader support, and AA contrast. Built for a radio and podcast audience.",
};

export default function AudioPage() {
  return (
    <PageShell demoHref="/audio/">
      <PageHeader eyebrow={audio.eyebrow} title={audio.title} lead={audio.lead} />

      <div className={styles.layout}>
        <div className={styles.playerCol}>
          <AudioPlayer tracks={SAMPLE_TRACKS} />
          <p className={styles.caption}>
            {audio.captionPrefix}Press <kbd>Tab</kbd> to a control, then <kbd>Space</kbd>,{" "}
            <kbd>J</kbd>, <kbd>L</kbd>, or the arrow keys on the seek bar.
          </p>
        </div>

        <aside className={styles.specCol} aria-labelledby="wcag-title">
          <h2 id="wcag-title" className={styles.specTitle}>
            {audio.specTitle}
          </h2>
          <ul className={styles.specList}>
            {audio.a11y.map((item) => (
              <li key={item.name} className={styles.specItem}>
                <div className={styles.specHead}>
                  <span className={styles.specName}>{item.name}</span>
                  <span className={styles.specTag}>{item.wcag}</span>
                </div>
                <p className={styles.specDetail}>{item.detail}</p>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </PageShell>
  );
}
