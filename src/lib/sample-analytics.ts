import type { Utm } from "./attribution";

/**
 * Sample raw visit events. In production these arrive from the first-party
 * beacon (one row per page view); here we ship a representative week so the
 * dashboard has real data to attribute and chart without a database.
 *
 * Each event is just what a privacy-light beacon captures: path, referrer, and
 * any UTM tags. No IP, no cookies, no personal data.
 */
export type VisitEvent = {
  path: string;
  ref: string;
  utm?: Utm;
};

export const SAMPLE_EVENTS: VisitEvent[] = [
  // AI answer engines
  { path: "/", ref: "https://chatgpt.com/" },
  { path: "/shows/morning", ref: "https://www.perplexity.ai/" },
  { path: "/", ref: "https://claude.ai/" },
  { path: "/donate", ref: "", utm: { utm_source: "chatgpt", utm_medium: "referral" } },
  { path: "/shows/metropolis", ref: "https://gemini.google.com/" },
  // Search
  { path: "/", ref: "https://www.google.com/search?q=kcrw" },
  { path: "/schedule", ref: "https://www.google.com/" },
  { path: "/shows/morning", ref: "https://duckduckgo.com/" },
  { path: "/", ref: "https://www.bing.com/" },
  { path: "/donate", ref: "https://www.google.com/" },
  { path: "/articles", ref: "https://www.google.com/" },
  // Social
  { path: "/shows/today", ref: "https://www.reddit.com/r/listentothis/" },
  { path: "/", ref: "https://t.co/abc" },
  { path: "/shows/metropolis", ref: "https://www.instagram.com/" },
  // YouTube
  { path: "/shows/morning", ref: "https://www.youtube.com/watch?v=x" },
  { path: "/", ref: "https://youtu.be/x" },
  // Email
  { path: "/donate", ref: "", utm: { utm_source: "newsletter", utm_medium: "email" } },
  { path: "/events", ref: "", utm: { utm_medium: "email", utm_campaign: "spring-drive" } },
  // Paid
  { path: "/donate", ref: "", utm: { utm_medium: "cpc", utm_source: "google" } },
  // Direct
  { path: "/", ref: "" },
  { path: "/", ref: "" },
  { path: "/schedule", ref: "" },
];

/** Mock personalization data for the "My Station" panels. */
export const SAVED_SHOWS = [
  { name: "Morning Becomes Eclectic", host: "Novena Carmel", cadence: "Weekdays · 9a" },
  { name: "Metropolis", host: "Jason Bentley", cadence: "Fri · 7p" },
  { name: "Today's Top Tune", host: "KCRW Music", cadence: "Daily" },
];

export const RECENTLY_PLAYED = [
  { title: "Slow Channel", artist: "Sunday Session", when: "2h ago" },
  { title: "Late Drive", artist: "Night Programme", when: "Yesterday" },
  { title: "Field Notes", artist: "Guest Mix", when: "2 days ago" },
];

export const RECOMMENDATIONS = [
  { name: "Weekend Becomes Eclectic", why: "Because you saved Morning Becomes Eclectic" },
  { name: "Aaron Byrd", why: "Similar to hosts you follow" },
  { name: "Travis Holcombe", why: "Popular with late-drive listeners" },
];
