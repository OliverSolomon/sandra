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

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "In Loving Memory: Sandra Cheptoo Mugun",
  description: "A memorial site celebrating the life and legacy of Sandra Cheptoo Mugun, affectionately known as Sandy. 3 January 2002 – 5 June 2026.",
  openGraph: {
    title: "In Loving Memory: Sandra Cheptoo Mugun",
    description: "A memorial site celebrating the life and legacy of Sandra Cheptoo Mugun, affectionately known as Sandy.",
    images: [{
      url: "/sandra-portrait.jpg",
      width: 994,
      height: 1405,
      alt: "Sandra Cheptoo Mugun",
    }],
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
