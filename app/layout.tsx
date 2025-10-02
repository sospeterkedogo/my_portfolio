import "./globals.css";
import { ReactNode } from 'react';
import Navbar from '../components/NavBar';
import { Inter } from "next/font/google";
import { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "My Next.js Portfolio",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans flex flex-col min-h-screen bg-gradient-to-br from-neutral-950 via-slate-900 to-neutral-800 antialiased`}>

        <header>
        <Navbar />
      </header>
      <main className="flex-1 w-full">{children}</main>
          <footer className="w-full bg-[#1c1c1c] text-gray-400 text-sm py-10 flex flex-col items-center">
            {/* Social Icons */}
            <div className="flex gap-6 mb-6">
              <a href="#" aria-label="Email" className="text-2xl hover:text-white transition-colors">
                ✉️
              </a>
              <a href="#" aria-label="Twitter" className="text-2xl hover:text-white transition-colors">
                🐦
              </a>
              <a href="#" aria-label="Behance" className="text-2xl hover:text-white transition-colors">
                🎨
              </a>
              <a href="#" aria-label="Instagram" className="text-2xl hover:text-white transition-colors">
                📷
              </a>
            </div>

            {/* Copyright */}
            <p className="text-xs tracking-wide">
              © {new Date().getFullYear()} – Sospeter Kedogo
            </p>
          </footer>
      

      </body>
    </html>
  );
}
