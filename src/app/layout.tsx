import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

const SITE = "https://demos.withmagic.ai";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Raj Lakhani · Front-End Engineering & Design Systems",
    template: "%s · Raj Lakhani",
  },
  description:
    "Small demos that work, built on Next.js, React, and TypeScript. Design systems, accessible components, headless CMS, and data-driven UX. Design thinking and shipped front-end.",
  openGraph: {
    title: "Raj Lakhani · Front-End Engineering & Design Systems",
    description:
      "Design systems, accessible components, headless CMS, and data-driven UX. Demos that work.",
    url: SITE,
    siteName: "Raj Lakhani · Front-End Demos",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${plexMono.variable}`}>
      <head>
        {/*
          Apply the saved theme before first paint so there is no flash of the
          wrong colors. Kept tiny and inline on purpose.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('rl-theme');if(t)document.documentElement.dataset.theme=t;}catch(e){}`,
          }}
        />
      </head>
      <body>
        <a href="#main" className="sr-only focusable">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
