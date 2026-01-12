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
  title: "OISB Portfolio",
  description: "Ultra-minimal portfolio with black, white, and orange theme",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jost.variable} ${bodoniModa.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
