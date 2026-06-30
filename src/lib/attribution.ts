/**
 * First-party traffic attribution, no cookies, no Google, no third party.
 *
 * This is a TypeScript port of the attribution engine I shipped in production on
 * doctor-notes (a privacy-light, first-party analytics beacon). It classifies a
 * visit into a traffic source from the referrer host and any UTM tags. The thing
 * it's tuned for is spotting AI answer engines (ChatGPT, Perplexity, Claude,
 * etc.) as their own bucket, a signal most analytics tools lump into "direct".
 *
 * It is pure and dependency-free, so it runs identically in the browser (live
 * demo below) and in a serverless function (the production path).
 */

export type TrafficSource =
  | "ai"
  | "search"
  | "youtube"
  | "social"
  | "email"
  | "paid"
  | "referral"
  | "internal"
  | "campaign"
  | "direct";

export type Utm = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
};

const AI = [
  /chatgpt\.com/, /chat\.openai\.com/, /openai\.com/, /perplexity\.ai/, /claude\.ai/,
  /anthropic\.com/, /gemini\.google\./, /bard\.google\./, /copilot\.microsoft/,
  /bing\.com\/(chat|copilot)/, /you\.com/, /phind\.com/, /poe\.com/, /\bgrok\b/, /x\.ai/,
  /deepseek\./, /mistral\.ai/, /kagi\./,
];
const SEARCH = [
  /google\./, /bing\./, /duckduckgo/, /yahoo\./, /ecosia\./, /yandex\./, /baidu\./,
  /search\.brave/, /qwant\./, /startpage\./, /searx/,
];
const YT = [/youtube\.com/, /youtu\.be/];
const SOCIAL = [
  /reddit\./, /t\.co\b/, /twitter\./, /x\.com/, /facebook\./, /\bfb\.com/, /instagram\./,
  /linkedin\./, /lnkd\.in/, /tiktok\./, /pinterest\./, /discord\./, /mastodon/,
  /bsky\.|bluesky/, /telegram|t\.me\b/, /threads\.net/, /whatsapp/,
];

const any = (list: RegExp[], s: string) => list.some((r) => r.test(s));

/** Reduce a referrer URL to a bare host: https://www.google.com/x -> google.com */
export function refHost(ref: string): string {
  if (!ref) return "";
  try {
    return new URL(ref).hostname.toLowerCase().replace(/^www\./, "");
  } catch {
    return String(ref)
      .toLowerCase()
      .replace(/^https?:\/\//, "")
      .replace(/^www\./, "")
      .split(/[/?#]/)[0]
      .slice(0, 120);
  }
}

/**
 * Attribution priority: explicit UTM you set > referrer host > direct.
 * `ourHost` lets internal navigation be filtered out of acquisition reports.
 */
export function deriveSource(ref: string, utm: Utm = {}, ourHost = ""): TrafficSource {
  const med = String(utm.utm_medium || "").toLowerCase();
  const src = String(utm.utm_source || "").toLowerCase();

  if (med || src) {
    if (/cpc|ppc|paid|ads?\b/.test(med)) return "paid";
    if (/youtube|video|shorts/.test(med) || /youtube|^yt$/.test(src) || any(YT, src)) return "youtube";
    if (/social/.test(med) || any(SOCIAL, src)) return "social";
    if (/email|newsletter/.test(med) || /email|newsletter/.test(src)) return "email";
    if (any(AI, src)) return "ai";
    if (/organic|search|seo/.test(med) || any(SEARCH, src)) return "search";
    return "campaign";
  }

  const host = refHost(ref);
  if (!host) return "direct";
  if (ourHost && host === ourHost.toLowerCase().replace(/^www\./, "")) return "internal";
  if (any(AI, host)) return "ai";
  if (any(SEARCH, host)) return "search";
  if (any(YT, host)) return "youtube";
  if (any(SOCIAL, host)) return "social";
  return "referral";
}

export const SOURCE_LABELS: Record<TrafficSource, string> = {
  ai: "AI answer engines",
  search: "Organic search",
  youtube: "YouTube",
  social: "Social",
  email: "Email / newsletter",
  paid: "Paid",
  referral: "Referral",
  internal: "Internal",
  campaign: "Campaign",
  direct: "Direct",
};
