"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, MapPin, ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen bg-[#e0e0e0] text-neutral-900 overflow-hidden flex items-center px-6 md:px-24">

      {/* Background Texture - faint noise for that 'print' feel */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>

      {/* MAIN CONTENT BLOCK - The "Paragraph" */}
      <div className="relative z-10 flex flex-col items-start max-w-5xl">

        {/* 1. META DATA LINE (Name + Location) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-4 mb-6 text-sm md:text-base font-mono tracking-tight font-medium text-neutral-600"
        >
          <span className="uppercase text-neutral-900 font-bold">Sospeter</span>
          <span className="h-[1px] w-8 bg-neutral-400"></span>
          <div className="flex items-center gap-1">
            <MapPin size={14} className="text-neutral-500" />
            <span>Northampton, UK</span>
          </div>
        </motion.div>

        {/* 2. THE HEADER (XL TEXT) - Tightly stacked */}
        <div className="relative flex flex-col leading-[0.85] tracking-tighter">
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // Apple-style ease
            className="text-[clamp(5rem,14vw,11rem)] font-black text-neutral-900"
          >
            SOFTWARE
          </motion.h1>

          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4"
          >
            {/* Stylistic indent/arrow to break the blockiness */}
            <ArrowRight className="w-[4vw] h-[4vw] text-blue-600 hidden md:block" strokeWidth={3} />

            <h1 className="text-[clamp(5rem,14vw,11rem)] font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-neutral-800">
              ENGINEER<span className="text-blue-600">.</span>
            </h1>
          </motion.div>
        </div>

        {/* 3. DESCRIPTION & LINKS - Integrated into the flow below */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex flex-col md:flex-row items-start md:items-center gap-8"
        >
          {/* Small narrative text if you want it */}
          <p className="max-w-xs text-neutral-600 font-medium leading-relaxed">
            Building functional, user-friendly web applications with a focus on clean code and continuous learning.
          </p>

          {/* Action Icons */}
          <div className="flex gap-4">
            <SocialButton href="mailto:kedogosospeter36@gmail.com" icon={<Mail size={18} />} />
            <SocialButton href="https://github.com/sospeterkedogo" icon={<Github size={18} />} />
            <SocialButton href="https://linkedin.com/in/sospeter-kedogo" icon={<Linkedin size={18} />} />
          </div>
        </motion.div>

      </div>

      {/* Artistic Sidebar/Shape (Optional balance) */}
      <div className="absolute right-0 top-0 h-full w-1/3 bg-neutral-900 z-0 hidden lg:block clip-path-slant" style={{ clipPath: "polygon(20% 0, 100% 0, 100% 100%, 0% 100%)" }}></div>
    </section>
  );
}

function SocialButton({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex items-center justify-center w-12 h-12 rounded-full bg-white border border-neutral-200 text-neutral-900 shadow-sm hover:scale-110 hover:bg-blue-600 hover:text-white hover:border-transparent transition-all duration-300 ease-out"
    >
      {icon}
    </a>
  );
}