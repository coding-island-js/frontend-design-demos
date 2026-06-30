"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Track } from "./types";
import { formatTime, speakTime } from "./formatTime";
import styles from "./AudioPlayer.module.css";

const SKIP = 15; // seconds for podcast-style skip

/**
 * Accessible audio player + playlist.
 *
 * Accessibility contract:
 *  - Every control is a real <button> / <input>, labelled, in tab order.
 *  - The seek bar is a native range input → arrow keys seek, SR announces position.
 *  - Keyboard shortcuts (when the player has focus): Space/K = play-pause,
 *    J = back 15s, L = forward 15s, ArrowUp/Down would belong to volume input.
 *  - A polite live region announces track changes and play/pause.
 *  - Honors prefers-reduced-motion (no marquee/animation reliance).
 */
export function AudioPlayer({ tracks }: { tracks: Track[] }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [status, setStatus] = useState(""); // SR live-region text

  const track = tracks[index];

  const announce = useCallback((msg: string) => setStatus(msg), []);

  const play = useCallback(async () => {
    try {
      await audioRef.current?.play();
    } catch {
      /* autoplay can be blocked; ignore */
    }
  }, []);

  const togglePlay = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) void a.play();
    else a.pause();
  }, []);

  const selectTrack = useCallback(
    (i: number, autoplay = true) => {
      const next = (i + tracks.length) % tracks.length;
      setIndex(next);
      setCurrent(0);
      announce(`${tracks[next].title} by ${tracks[next].artist}`);
      if (autoplay) {
        // wait for the new src to load before playing
        requestAnimationFrame(() => void play());
      }
    },
    [tracks, announce, play]
  );

  const skip = useCallback((delta: number) => {
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = Math.min(Math.max(0, a.currentTime + delta), a.duration || 0);
  }, []);

  // --- audio element event wiring ---
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () => setCurrent(a.currentTime);
    const onMeta = () => setDuration(a.duration);
    const onPlay = () => {
      setPlaying(true);
      announce(`Playing ${track.title}`);
    };
    const onPause = () => {
      setPlaying(false);
      announce("Paused");
    };
    const onEnded = () => selectTrack(index + 1, true);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onMeta);
    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);
    a.addEventListener("ended", onEnded);
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onMeta);
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
      a.removeEventListener("ended", onEnded);
    };
  }, [index, track, selectTrack, announce]);

  // keep element volume/muted in sync
  useEffect(() => {
    const a = audioRef.current;
    if (a) {
      a.volume = volume;
      a.muted = muted;
    }
  }, [volume, muted]);

  // keyboard shortcuts scoped to the player
  const onKeyDown = (e: React.KeyboardEvent) => {
    const tag = (e.target as HTMLElement).tagName;
    const isRange = tag === "INPUT";
    switch (e.key) {
      case " ":
      case "k":
        if (isRange) return; // let range handle its own keys
        e.preventDefault();
        togglePlay();
        break;
      case "j":
        e.preventDefault();
        skip(-SKIP);
        break;
      case "l":
        e.preventDefault();
        skip(SKIP);
        break;
      default:
        break;
    }
  };

  const pct = duration ? (current / duration) * 100 : 0;

  return (
    <section
      className={styles.player}
      aria-label="Audio player"
      ref={rootRef}
      onKeyDown={onKeyDown}
    >
      {/* eslint-disable-next-line jsx-a11y/media-has-caption -- music, no spoken content to caption */}
      <audio ref={audioRef} src={track.src} preload="metadata" />

      <div className={styles.nowPlaying}>
        <div
          className={styles.art}
          style={{ background: swatch(track.id) }}
          aria-hidden="true"
        >
          <span className={styles.artGlyph}>{playing ? "♫" : "▷"}</span>
        </div>
        <div className={styles.meta}>
          {track.show && <p className={styles.show}>{track.show}</p>}
          <p className={styles.trackTitle}>{track.title}</p>
          <p className={styles.artist}>{track.artist}</p>
        </div>
      </div>

      <div className={styles.seekRow}>
        <span className={styles.time} aria-hidden="true">
          {formatTime(current)}
        </span>
        <input
          className={styles.seek}
          type="range"
          min={0}
          max={duration || 0}
          step={1}
          value={current}
          onChange={(e) => {
            const a = audioRef.current;
            if (a) a.currentTime = Number(e.target.value);
          }}
          aria-label="Seek"
          aria-valuetext={`${speakTime(current)} of ${speakTime(duration)}`}
          style={{ ["--pct" as string]: `${pct}%` }}
        />
        <span className={styles.time} aria-hidden="true">
          {formatTime(duration)}
        </span>
      </div>

      <div className={styles.controls}>
        <button
          className={styles.ctrl}
          onClick={() => selectTrack(index - 1)}
          aria-label="Previous track"
        >
          ⏮
        </button>
        <button
          className={styles.ctrl}
          onClick={() => skip(-SKIP)}
          aria-label={`Back ${SKIP} seconds`}
        >
          ↺
        </button>
        <button
          className={`${styles.ctrl} ${styles.playBtn}`}
          onClick={togglePlay}
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? "❚❚" : "►"}
        </button>
        <button
          className={styles.ctrl}
          onClick={() => skip(SKIP)}
          aria-label={`Forward ${SKIP} seconds`}
        >
          ↻
        </button>
        <button
          className={styles.ctrl}
          onClick={() => selectTrack(index + 1)}
          aria-label="Next track"
        >
          ⏭
        </button>

        <div className={styles.volume}>
          <button
            className={styles.ctrl}
            onClick={() => setMuted((m) => !m)}
            aria-label={muted ? "Unmute" : "Mute"}
            aria-pressed={muted}
          >
            {muted || volume === 0 ? "🔇" : "🔊"}
          </button>
          <input
            className={styles.volSlider}
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={muted ? 0 : volume}
            onChange={(e) => {
              setVolume(Number(e.target.value));
              setMuted(false);
            }}
            aria-label="Volume"
            aria-valuetext={`${Math.round((muted ? 0 : volume) * 100)} percent`}
          />
        </div>
      </div>

      <ol className={styles.playlist} aria-label="Playlist">
        {tracks.map((t, i) => {
          const isCurrent = i === index;
          return (
            <li key={t.id}>
              <button
                className={`${styles.row} ${isCurrent ? styles.rowActive : ""}`}
                onClick={() => selectTrack(i)}
                aria-current={isCurrent ? "true" : undefined}
              >
                <span className={styles.rowIcon} aria-hidden="true">
                  {isCurrent && playing ? "♫" : i + 1}
                </span>
                <span className={styles.rowMeta}>
                  <span className={styles.rowTitle}>{t.title}</span>
                  <span className={styles.rowArtist}>{t.artist}</span>
                </span>
                {isCurrent && (
                  <span className="sr-only">(now selected)</span>
                )}
              </button>
            </li>
          );
        })}
      </ol>

      <p className={styles.hint}>
        <kbd>Space</kbd> play/pause · <kbd>J</kbd> back 15s · <kbd>L</kbd> forward 15s · arrow keys
        on the seek bar scrub
      </p>

      {/* Polite live region for screen readers */}
      <div aria-live="polite" className="sr-only">
        {status}
      </div>
    </section>
  );
}

/** Deterministic color swatch from a track id (stand-in for artwork). */
function swatch(seed: string): string {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) % 360;
  return `linear-gradient(135deg, hsl(${h} 70% 45%), hsl(${(h + 40) % 360} 80% 30%))`;
}
