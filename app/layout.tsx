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
  title: "In Loving Memory: Mary Wanjiku Chege (Mama Njambi)",
  description: "A memorial site honouring the life and legacy of Mary Wanjiku Chege, affectionately known as Mama Njambi. 23 February 1958 – 1 June 2026.",
  openGraph: {
    title: "In Loving Memory: Mary Wanjiku Chege (Mama Njambi)",
    description: "A memorial site honouring the life and legacy of Mary Wanjiku Chege, affectionately known as Mama Njambi.",
    images: [{
      url: "https://res.cloudinary.com/djiqwujg4/image/upload/v1780859632/mary-wanjiku-chege_yzkqml.jpg",
      width: 1200,
      height: 630,
      alt: "Mary Wanjiku Chege",
    }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${playfairDisplay.variable} ${inter.variable} antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
