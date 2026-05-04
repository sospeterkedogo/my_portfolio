"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Mail, Github, Linkedin, MapPin, ArrowRight, Download, Eye } from "lucide-react";
import Link from "next/link";

// Quick highlights shown in the hero
const HIGHLIGHTS = [
  { label: "Location", value: "Northampton, UK" },
  { label: "Experience", value: "3+ Years" },
  { label: "Focus", value: "Systems & Scale" },
  { label: "Status", value: "Open to Work" },
];

export default function HeroSection() {
  const prefersReduced = useReducedMotion();

  // Respect prefers-reduced-motion: skip translate animations, keep opacity
  const slideIn = (delay = 0) =>
    prefersReduced
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.3, delay } }
      : {
          initial: { opacity: 0, y: 60 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
        };

  const fadeIn = (delay = 0) => ({
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.6, delay },
  });

  return (
    <section
      aria-label="Introduction"
      className="relative w-full min-h-screen bg-[#e0e0e0] text-neutral-900 overflow-hidden flex items-center px-6 md:px-24 py-32"
    >
      {/* Background Texture — decorative, hidden from AT */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"
      />

      {/* Decorative shape */}
      <div
        aria-hidden="true"
        className="absolute right-0 top-0 h-full w-1/3 bg-neutral-900 z-0 hidden lg:block"
        style={{ clipPath: "polygon(20% 0, 100% 0, 100% 100%, 0% 100%)" }}
      />

      {/* MAIN CONTENT */}
      <div className="relative z-10 flex flex-col items-start max-w-5xl w-full">

        {/* ── 1. NAME + LOCATION ── */}
        <motion.div
          {...fadeIn(0.1)}
          className="flex items-center gap-4 mb-6 text-sm md:text-base font-mono tracking-tight font-medium text-neutral-600"
        >
          <span className="uppercase text-neutral-900 font-bold">Sospeter Kedogo</span>
          <span aria-hidden="true" className="h-[1px] w-8 bg-neutral-400" />
          <div className="flex items-center gap-1">
            <MapPin size={14} aria-hidden="true" className="text-neutral-500" />
            <span>Northampton, UK</span>
          </div>
        </motion.div>

        {/* ── 2. ROLE — single h1 ── */}
        <div className="relative flex flex-col leading-[0.85] tracking-tighter mb-8">
          <motion.h1
            {...slideIn(0)}
            className="text-[clamp(4rem,12vw,9rem)] font-black text-neutral-900"
          >
            SOFTWARE
            <span className="block flex items-center gap-4">
              <ArrowRight
                aria-hidden="true"
                className="w-[4vw] h-[4vw] text-blue-600 hidden md:inline-block"
                strokeWidth={3}
              />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-neutral-800">
                DEVELOPER<span className="text-blue-600">.</span>
              </span>
            </span>
          </motion.h1>
        </div>

        {/* ── 3. VALUE PROPOSITION ── */}
        <motion.p
          {...fadeIn(0.3)}
          className="max-w-md text-neutral-700 font-medium leading-relaxed mb-10 text-base md:text-lg"
        >
          Full-stack developer focused on scalable, high-performance systems —
          from real-time collaboration layers and payment workflows to
          agent-driven backend architecture.
        </motion.p>

        {/* ── 4. CTAs ── */}
        <motion.div {...fadeIn(0.45)} className="flex flex-wrap gap-4 mb-12">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 text-[#e0e0e0] font-bold text-sm uppercase tracking-widest rounded-full hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors min-h-[44px]"
          >
            <Eye size={16} aria-hidden="true" /> View Projects
          </Link>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-neutral-900 text-neutral-900 font-bold text-sm uppercase tracking-widest rounded-full hover:bg-neutral-900 hover:text-[#e0e0e0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors min-h-[44px]"
          >
            <Download size={16} aria-hidden="true" /> Download Résumé
          </a>
        </motion.div>

        {/* ── 5. QUICK HIGHLIGHTS ── */}
        <motion.ul
          {...fadeIn(0.55)}
          className="flex flex-wrap gap-3 mb-10"
          aria-label="Quick highlights"
        >
          {HIGHLIGHTS.map(({ label, value }) => (
            <li
              key={label}
              className="flex items-center gap-2 px-3 py-1.5 bg-white/70 border border-neutral-300 rounded-full font-mono text-xs text-neutral-700"
            >
              <span className="font-bold text-neutral-900">{label}:</span>
              {value}
            </li>
          ))}
        </motion.ul>

        {/* ── 6. SOCIAL LINKS ── */}
        <motion.div
          {...fadeIn(0.65)}
          className="flex gap-4"
          aria-label="Social links"
        >
          <SocialButton
            href="mailto:kedogosospeter36@gmail.com"
            icon={<Mail size={18} aria-hidden="true" />}
            label="Send email to Sospeter"
          />
          <SocialButton
            href="https://github.com/sospeterkedogo"
            icon={<Github size={18} aria-hidden="true" />}
            label="Sospeter on GitHub"
          />
          <SocialButton
            href="https://linkedin.com/in/sospeter-kedogo"
            icon={<Linkedin size={18} aria-hidden="true" />}
            label="Sospeter on LinkedIn"
          />
        </motion.div>

      </div>
    </section>
  );
}

function SocialButton({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="flex items-center justify-center w-12 h-12 min-w-[44px] min-h-[44px] rounded-full bg-white border border-neutral-200 text-neutral-900 shadow-sm hover:bg-blue-600 hover:text-white hover:border-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all duration-300 ease-out"
    >
      {icon}
    </a>
  );
}