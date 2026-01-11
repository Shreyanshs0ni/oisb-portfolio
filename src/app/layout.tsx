import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Load local SF Pro font (variable font with multiple weights)
const sfPro = localFont({
  src: "../fonts/sfPro.ttf",
  variable: "--font-sf-pro",
  display: "swap",
  weight: "100 900", // Variable font weight range
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
    <html lang="en" className={`dark ${sfPro.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
