"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Copy, Github, Linkedin, Twitter, Mail } from "lucide-react";

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("kedogosospeter36@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer id="contact" className="w-full bg-neutral-900 text-[#e0e0e0] px-6 md:px-24 pt-24 pb-12 rounded-t-[3rem] -mt-12 relative z-10 overflow-hidden">

      {/* 1. THE BIG ASK (Call To Action) */}
      <div className="flex flex-col mb-24">
        <h2 className="font-mono text-xs tracking-widest uppercase text-neutral-500 mb-8">/ 004 — Contact</h2>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
          {/* Headline */}
          <h3 className="text-[clamp(3rem,8vw,8rem)] font-black leading-none tracking-tighter">
            LET'S WORK <br />
            <span className="text-neutral-600">TOGETHER</span>
          </h3>

          {/* Copy Email Button */}
          <div className="group cursor-pointer mb-2" onClick={handleCopy}>
            <p className="font-mono text-xs text-neutral-500 mb-2 uppercase tracking-widest">Click to copy</p>
            <div className="flex items-center gap-4 text-2xl md:text-4xl font-bold hover:text-blue-500 transition-colors">
              kedogosospeter36@gmail.com
              <span className="text-xs bg-neutral-800 p-2 rounded-full text-neutral-400">
                {copied ? "COPIED" : <Copy size={16} />}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. THE UTILITY GRID (Navigation & Status) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-t border-neutral-800 pt-16 mb-16">

        {/* Column 1: Brand & Status */}
        <div className="col-span-1 md:col-span-2 flex flex-col justify-between">
          <div>
            <Link href="/" className="font-black text-2xl tracking-tighter text-white inline-block mb-6">
              SOSPETER<span className="text-blue-600">.</span>
            </Link>
            <p className="text-neutral-500 text-sm max-w-sm leading-relaxed">
              Building digital experiences with architectural precision.
              Focusing on accessibility, performance, and scalable systems.
            </p>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium text-neutral-300">
              Available for new opportunities
            </span>
          </div>
        </div>

        {/* Column 2: Sitemap */}
        <div>
          <h4 className="font-mono text-xs tracking-widest uppercase text-neutral-500 mb-6">Navigation</h4>
          <ul className="flex flex-col gap-4 text-sm font-bold text-neutral-300">
            <li><Link href="/projects" className="hover:text-white hover:translate-x-1 transition-all inline-block">Work</Link></li>
            <li><Link href="/#about" className="hover:text-white hover:translate-x-1 transition-all inline-block">About</Link></li>
            <li><Link href="/blog" className="hover:text-white hover:translate-x-1 transition-all inline-block">Insights</Link></li>
            <li><Link href="/resume.pdf" target="_blank" className="hover:text-white hover:translate-x-1 transition-all inline-block">Resume</Link></li>
          </ul>
        </div>

        {/* Column 3: Socials */}
        <div>
          <h4 className="font-mono text-xs tracking-widest uppercase text-neutral-500 mb-6">Socials</h4>
          <div className="flex gap-4">
            <SocialIcon href="https://github.com/sospeterkedogo" icon={<Github size={18} />} label="GitHub" />
            <SocialIcon href="https://linkedin.com/in/sospeter-kedogo" icon={<Linkedin size={18} />} label="LinkedIn" />
            <SocialIcon href="mailto:kedogosospeter36@gmail.com" icon={<Mail size={18} />} label="Email" />
          </div>
        </div>
      </div>

      {/* 3. COPYRIGHT (The Bottom Line) */}
      <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-neutral-800 text-xs font-mono text-neutral-600 uppercase tracking-wider">
        <p>© {new Date().getFullYear()} Sospeter. All rights reserved.</p>
        <p className="mt-2 md:mt-0">
          Built with <span className="text-neutral-400">Next.js 16</span> & <span className="text-neutral-400">Tailwind</span>
        </p>
      </div>

    </footer>
  );
}

function SocialIcon({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-400 hover:bg-white hover:text-black transition-all duration-300"
    >
      {icon}
    </a>
  );
}