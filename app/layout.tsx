import "./globals.css";
import "@fontsource-variable/inter";
import "@fontsource-variable/montserrat";
import "@fontsource/bebas-neue";
import { ReactNode } from "react";
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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className="flex flex-col min-h-screen bg-[#1c1c1c] antialiased max-w-full overflow-x-hidden"
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
