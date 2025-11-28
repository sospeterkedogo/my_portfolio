"use client";

import Link from "next/link";
import { Project } from "@/lib/types";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// Add an index prop to stagger animations if you want
export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link 
        href={`/projects/${project.id}`} 
        className="group block w-full cursor-none-target" // Hook for custom cursor if you have one
      >
        {/* IMAGE CONTAINER */}
        {/* 4:3 Aspect Ratio looks more "Design Portfolio" than 16:9 Video ratio */}
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-neutral-300 mb-6">
          
          {/* Overlay to darken image slightly until hover */}
          <div className="absolute inset-0 bg-neutral-900/10 z-10 group-hover:bg-transparent transition-colors duration-500 mix-blend-multiply" />
          
          {project.images && project.images.length > 0 ? (
            <img
              src={project.images[0]}
              alt={project.title}
              className="w-full h-full object-cover grayscale transition-all duration-700 ease-in-out group-hover:grayscale-0 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-200 text-neutral-400 font-mono text-xs">
               <span>IMAGE_MISSING</span>
            </div>
          )}

          {/* Floating "View Project" Badge that appears on hover */}
          <div className="absolute bottom-0 right-0 p-4 z-20 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
             <div className="bg-white text-black px-4 py-2 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                View Case <ArrowUpRight size={14} />
             </div>
          </div>
        </div>

        {/* TEXT CONTENT - Minimalist & Bold */}
        <div className="flex flex-col border-t border-neutral-300 pt-4">
          <div className="flex justify-between items-start">
            <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 uppercase leading-none mb-2 group-hover:text-blue-700 transition-colors duration-300">
              {project.title}
            </h3>
            {/* Year or Category Tag */}
            <span className="font-mono text-xs text-neutral-500 border border-neutral-300 px-2 py-1 rounded-full uppercase">
               2025
            </span>
          </div>

          <p className="text-neutral-600 text-sm md:text-base font-medium line-clamp-2 max-w-[90%] mt-2">
            {project.description}
          </p>
          
          {/* Optional: Tech stack row if you have it in your type */}
          {/* <div className="mt-4 flex gap-2 overflow-hidden">
             {project.tags.map(tag => <span className="text-[10px] uppercase font-mono text-neutral-400">/{tag}</span>)}
          </div> */}
        </div>
      </Link>
    </motion.div>
  );
}