"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Trigger state change when user scrolls past the Hero area (approx 100vh)
      // Or sooner if you want the logo to appear faster. 
      // Let's set it to 50px for immediate feedback, or 500px to wait for Hero to exit.
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { name: "Work", href: "/#work" },
    { name: "About", href: "/about" },
    { name: "Insights", href: "/blog" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out px-6 md:px-12
          ${scrolled 
            ? "py-4 bg-[#e0e0e0]/80 backdrop-blur-md border-b border-neutral-300" 
            : "py-6 bg-transparent border-transparent"
          }
        `}
      >
        <div className="max-w-[1920px] mx-auto flex items-center justify-between">
          
          {/* LOGO - Only visible when scrolled */}
          <div className="w-[140px]">
            <AnimatePresence>
              {scrolled && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link href="/" className="font-black text-xl tracking-tighter text-neutral-900 group">
                    SOSPETER<span className="text-blue-600 group-hover:text-neutral-900 transition-colors">.</span>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* DESKTOP NAV - Always dark text for Light Theme */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-sm font-mono font-medium uppercase tracking-widest text-neutral-600 hover:text-black transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* CTA BUTTON - "Let's Talk" instead of Resume (Resume is boring) */}
          <div className="hidden md:flex justify-end w-[140px]">
             <a 
               href="mailto:kedogosospeter36@gmail.com"
               className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest border rounded-full px-4 py-2 transition-all duration-300
                 ${scrolled 
                   ? "border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-[#e0e0e0]" 
                   : "border-neutral-900 text-neutral-900 bg-transparent hover:bg-neutral-900 hover:text-[#e0e0e0]"
                 }
               `}
             >
               Contact <ArrowUpRight size={14} />
             </a>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            className="md:hidden text-neutral-900 z-50 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY - Matches the Light Theme */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#e0e0e0] z-40 flex flex-col items-center justify-center"
          >
            <div className="flex flex-col gap-8 text-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-4xl font-black text-neutral-900 hover:text-blue-600 transition-colors uppercase tracking-tighter"
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="w-12 h-[1px] bg-neutral-300 mx-auto my-4"></div>

              <a
                href="/resume.pdf"
                target="_blank"
                className="font-mono text-sm text-neutral-500 uppercase tracking-widest hover:text-black"
              >
                Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}