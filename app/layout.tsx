import "./globals.css";
import { ReactNode } from "react";
import { Inter, Montserrat, Bebas_Neue } from "next/font/google";
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

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
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
