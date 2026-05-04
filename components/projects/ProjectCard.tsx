"use client";

import Link from "next/link";
import { Project } from "@/lib/types";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Globe } from "lucide-react";

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  // Safe fallbacks for mixed naming conventions
  const liveUrl = (project as any).live_url || (project as any).demoUrl || (project as any).demo_url || null;
  const repoUrl = (project as any).github_url || (project as any).repoUrl || (project as any).code_url || null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex flex-col w-full group"
    >
      {/* 1. IMAGE AREA - Shorter Aspect Ratio (16:9) */}
      <Link 
        href={`/projects/${project.id}`} 
        className="relative w-full aspect-video overflow-hidden bg-neutral-200 mb-4 cursor-pointer block"
      >
          {/* Dark Overlay on Hover — decorative */}
          <div aria-hidden="true" className="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/10 z-10 transition-colors duration-500" />
          
          {project.images && project.images.length > 0 ? (
            <img
              src={project.images[0]}
              alt={project.title}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-200 text-neutral-400 font-mono text-[10px] tracking-widest">
               <span>NO_PREVIEW</span>
            </div>
          )}

          {/* Badge — decorative */}
          <div aria-hidden="true" className="absolute top-3 right-3 z-20 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
             <div className="bg-white/90 backdrop-blur-sm text-neutral-900 px-3 py-1 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 shadow-sm">
                Case Study <ArrowUpRight size={12} aria-hidden="true" />
             </div>
          </div>
      </Link>

      {/* 2. CONTENT AREA - Compact & Scan-friendly */}
      <div className="flex flex-col border-t border-neutral-300 pt-3">
        
        {/* Title Row */}
        <div className="flex justify-between items-baseline mb-2">
          <Link href={`/projects/${project.id}`}>
            <h3 className="text-xl md:text-2xl font-bold text-neutral-900 uppercase leading-none hover:text-blue-700 transition-colors">
              {project.title}
            </h3>
          </Link>
          <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">
             2024
          </span>
        </div>

        {/* Description - Clamped tightly */}
        <p className="text-neutral-600 text-sm font-medium line-clamp-2 max-w-[95%] mb-4 leading-relaxed">
          {project.description}
        </p>
        
        {/* 3. QUICK ACTION ROW - The "Recruiter Scanner" */}
        <div className="flex gap-5 mt-auto pt-2">
            {liveUrl && (
                <a 
                    href={liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label={`View live demo of ${project.title}`}
                    className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-neutral-900 hover:text-blue-600 transition-colors min-h-[44px] py-2"
                >
                    <Globe size={12} aria-hidden="true" /> Live Demo
                </a>
            )}
            
            {repoUrl && (
                <a 
                    href={repoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label={`View source code for ${project.title} on GitHub`}
                    className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-neutral-500 hover:text-neutral-900 transition-colors min-h-[44px] py-2"
                >
                    <Github size={12} aria-hidden="true" /> Code
                </a>
            )}

            {!liveUrl && !repoUrl && (
                 <span className="text-[10px] font-mono text-neutral-400 uppercase">Internal Project</span>
            )}
        </div>
      </div>
    </motion.div>
  );
}