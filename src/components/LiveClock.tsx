"use client";

import { useEffect, useState } from "react";

const PLACEHOLDER = "··:··:··";

function losAngelesTime(): string {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      timeZone: "America/Los_Angeles",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(new Date());
  } catch {
    return new Date().toTimeString().slice(0, 8);
  }
}

/**
 * A live Los Angeles clock, ticking once a second. Renders a stable placeholder
 * on the server and first client paint so hydration never mismatches, then swaps
 * to the real time after mount.
 */
export function LiveClock({ className }: { className?: string }) {
  const [time, setTime] = useState(PLACEHOLDER);

  useEffect(() => {
    setTime(losAngelesTime());
    const id = setInterval(() => setTime(losAngelesTime()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <time className={className} suppressHydrationWarning>
      {time}
    </time>
  );
}
