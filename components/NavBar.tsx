"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, FileText } from "lucide-react"; // Consistent icons

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Define your navigation strategy here
  const navLinks = [
    { name: "Work", href: "/projects" },      // Dedicated page
    { name: "About", href: "/#about" },       // Anchor on Home
    { name: "Capabilities", href: "/#skills" }, // Anchor on Home
    { name: "Contact", href: "/#contact" },   // Anchor on Home
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b border-transparent
        ${scrolled 
          ? "bg-[#1c1c1c]/90 backdrop-blur-md py-3 shadow-2xl border-white/5" 
          : "bg-transparent py-6"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="relative group z-50">
          <span className="text-white font-black text-xl tracking-tighter">
            SOSPETER<span className="text-blue-500">.</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <ul className="flex gap-8 text-sm font-medium text-neutral-300">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link 
                  href={link.href} 
                  className="hover:text-white transition-colors uppercase tracking-widest text-xs"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* CV Button */}
          <a
            href="/resume.pdf" // Put your PDF in the 'public' folder
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wide hover:bg-blue-500 hover:text-white transition-all transform hover:scale-105"
          >
            <FileText size={14} /> Resume
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-white focus:outline-none z-50"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 bg-[#111] z-40 flex flex-col items-center justify-center transition-transform duration-300 ease-in-out lg:hidden ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <ul className="flex flex-col gap-8 text-center">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-3xl font-bold text-white hover:text-blue-500 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            
            <li className="mt-8">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-bold"
                onClick={() => setMenuOpen(false)}
              >
                Download CV
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}