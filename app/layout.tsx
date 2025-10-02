"use client";

import "./globals.css";
import {useEffect, ReactNode, useState } from 'react';
import Link from "next/link";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { name: "HIGHLIGHTS", href: "/projects" },
    { name: "DEV DIARIES", href: "/blog" },
    { name: "INFO", href: "/contact" },
  ];

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 10);
    }

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-2 flex items-center justify-between shadow-lg transition-[color,transform] duration-500 ease-in-out${
        scrolled
          ? "bg-transparent scale-90"
          : "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 scale-100"
      }`}
    >
      <Link href="/" className="text-white font-extrabold text-2xl tracking-wide">
        My Portfolio
      </Link>

      {/* Hamburger for mobile */}
      <button
        className="lg:hidden block text-white focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle Navigation"
      >
        <svg width="32" height="32" fill="none">
          <path
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            d="M6 10h20M6 16h20M6 22h20"
          />
        </svg>
      </button>

      {/* Links for desktop */}
      <ul className="hidden lg:flex gap-8 text-white font-medium text-lg">
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="hover:text-cyan-300 transition">
              {link.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Links for mobile */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setMenuOpen(false)}
        >
          <ul className="absolute top-16 left-0 w-full bg-gray-900 p-8 rounded-b-lg text-white text-xl flex flex-col gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-cyan-300 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-gradient-to-br from-neutral-950 via-slate-900 to-neutral-800 antialiased">
        <header>
          <Navbar />
        </header>
        <main className="flex-1 w-full">{children}</main>
        <footer className="w-full p-6 text-center text-slate-400 text-sm">
          © {new Date().getFullYear()} Sospeter Kedogo. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
