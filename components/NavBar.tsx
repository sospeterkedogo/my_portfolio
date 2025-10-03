"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { name: "HIGHLIGHTS", href: "/projects" },
    { name: "DEV DIARIES", href: "/blog" },
    { name: "INFO", href: "/contact" },
  ];

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-4 flex items-center justify-between transition-all duration-500 ease-in-out
        ${scrolled ? "bg-[#2a2a2a] py-2 shadow-lg" : "bg-transparent py-4"}
      `}
    >
      <Link href="/" className="text-white font-extrabold text-2xl tracking-wide">
        My Portfolio
      </Link>

      {/* Hamburger for mobile */}
      <button
        className="lg:hidden block text-white focus:outline-none"
        onClick={() => setMenuOpen(true)}
        aria-label="Open Navigation"
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

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Background overlay */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />

          {/* Slide-in menu */}
          <div
            className={`absolute right-0 top-0 h-full w-3/4 max-w-xs bg-gray-900 shadow-xl p-6 text-white transform transition-transform duration-2000 ease-in-out ${
              menuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white focus:outline-none"
              onClick={() => setMenuOpen(false)}
              aria-label="Close Navigation"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" />
                <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" />
              </svg>
            </button>

            {/* Links */}
            <ul className="mt-12 flex flex-col gap-6 text-lg font-medium">
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
        </div>
      )}
    </nav>
  );
}
