export type Track = {
  id: string;
  title: string;
  artist: string;
  /** Audio source URL (mp3). */
  src: string;
  /** Show/programme this belongs to, e.g. "Morning Becomes Eclectic". */
  show?: string;
  /** Artwork URL or null for a generated swatch. */
  artwork?: string | null;
};
