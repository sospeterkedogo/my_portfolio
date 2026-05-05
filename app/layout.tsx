import "./globals.css";
import { ReactNode } from "react";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Sospeter Kedogo — Software Developer",
    template: "%s | Sospeter Kedogo",
  },
  description:
    "Full-stack software developer based in Northampton, UK. Building scalable, high-performance systems with Next.js, TypeScript, and Node.js.",
};

const inter = localFont({
  src: "./fonts/inter-latin-wght-normal.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

const montserrat = localFont({
  src: "./fonts/montserrat-latin-wght-normal.woff2",
  variable: "--font-montserrat",
  weight: "100 900",
  display: "swap",
});

const bebas = localFont({
  src: "./fonts/bebas-neue-latin-400-normal.woff2",
  weight: "400",
  variable: "--font-bebas",
  display: "swap",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${montserrat.variable} ${bebas.variable} flex flex-col min-h-screen bg-[#1c1c1c] antialiased max-w-full overflow-x-hidden`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
