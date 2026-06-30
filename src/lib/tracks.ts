import type { Track } from "@/components/AudioPlayer/types";

/**
 * Sample playlist for the audio demo.
 *
 * The audio files are royalty-free instrumental tracks from SoundHelix
 * (https://www.soundhelix.com) used purely to demonstrate playback, the focus
 * of this demo is the *player UI and its accessibility*, not the music. The show
 * names evoke a public-radio / music-station context (the kind of audience this
 * player is built for).
 */
export const SAMPLE_TRACKS: Track[] = [
  {
    id: "t1",
    title: "Morning Set, Pt. 1",
    artist: "The Resident",
    show: "Morning Becomes Eclectic",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    id: "t2",
    title: "Late Drive",
    artist: "Night Programme",
    show: "Metropolis",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    id: "t3",
    title: "Field Notes",
    artist: "Guest Mix",
    show: "Today's Top Tune",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
  {
    id: "t4",
    title: "Slow Channel",
    artist: "Sunday Session",
    show: "Weekend Becomes Eclectic",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
  },
];
