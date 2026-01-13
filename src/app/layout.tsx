import type { Metadata } from "next";
import { Jost, Bodoni_Moda } from "next/font/google";
import "./globals.css";

// Jost - Main body font
const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
});

// Bodoni Moda - Headings font
const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shreyansh Soni | Full Stack Developer & UI/UX Designer",
  description:
    "Portfolio of Shreyansh Soni - Full Stack Developer and UI/UX Designer specializing in React, Next.js, and modern web technologies.",
  keywords: [
    "Shreyansh Soni",
    "Full Stack Developer",
    "UI/UX Designer",
    "React",
    "Next.js",
    "Portfolio",
  ],
  authors: [{ name: "Shreyansh Soni" }],
  openGraph: {
    title: "Shreyansh Soni | Full Stack Developer & UI/UX Designer",
    description:
      "Portfolio of Shreyansh Soni - Full Stack Developer and UI/UX Designer",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jost.variable} ${bodoniModa.variable}`}>
      <head>
        {/* Preload critical assets */}
        <link rel="preload" href="/fluid.mp4" as="video" type="video/mp4" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
