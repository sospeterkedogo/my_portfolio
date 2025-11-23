"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroSection() {
  const words = ["SOSPETER", "I AM A", "DESIGNER", "DEVELOPER", "ENGINEER"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <section className="min-h-[65vh] flex items-center justify-center text-center w-full">
      <div
        style={{
          fontSize: "clamp(4rem, 23vw, 10rem)",
          color: "white",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          userSelect: "none",
        }}
        className="font-extrabold md:text-8xl sm:text-5xl text-4xl relative h-[8rem] flex items-center justify-center w-full"
      >
        <AnimatePresence mode="wait">
          <motion.h1
            key={index}
            initial={{ opacity: 0, y: 40, rotateX: -45 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, y: -40, rotateX: 45 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute w-full text-center"
          >
            {words[index]}
          </motion.h1>
        </AnimatePresence>
      </div>
    </section>
  );
}
