import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";

const playfairDisplay = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

// Resolve the canonical site origin so social scrapers fetch an absolute image URL.
// Priority: explicit env → Vercel production domain → Vercel preview/deploy URL → localhost.
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");
const TITLE = "In Loving Memory: Sandra Cheptoo Mugun";
const DESCRIPTION =
  "In loving memory of Sandra Cheptoo Mugun (Sandy), 2002–2026 — a celebration of her life, faith, and joy.";
const OG_IMAGE = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  type: "image/jpeg",
  alt: "A Celebration of Life — Sandra Cheptoo Mugun, 3 January 2002 to 5 June 2026.",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: ["Sandra Cheptoo Mugun", "memorial", "celebration of life", "tribute", "eulogy"],
  authors: [{ name: "The Mugun & Kariuki Families" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "In Loving Memory of Sandra Cheptoo Mugun",
    url: "/",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_KE",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE.url],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${playfairDisplay.variable} ${inter.variable} antialiased`}>
        <div className="grain-overlay" aria-hidden="true" />
        <Header />
        {children}
      </body>
    </html>
  );
}
