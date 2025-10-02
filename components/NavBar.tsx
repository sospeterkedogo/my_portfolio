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
      className={`fixed top-0 left-0 right-0 z-50 px-6 flex items-center justify-between transition-all duration-500 ease-in-out
        ${scrolled 
          ? "bg-gray-700 py-2"
          : "bg-transparent py-4"
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