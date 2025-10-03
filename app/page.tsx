"use client";

import React from 'react';
import ProjectsGrid  from '../components/ProjectsGrid';
import Link from "next/link";
import HeroSection from '../components/Hero';
import BlogGrid from '@/components/BlogGrid';
import AboutPage from './about/page';
import TechnologiesPage from './technologies/page';

export default function Home() {
  return (
    <main className="bg-[#1c1c1c] from-neutral-900 via-slate-800 to-neutral-700 flex flex-col items-center justify-center py-12">
      {/* Hero Section */}
      <HeroSection />

      <section id="projects" className="w-full max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="font-[var(--font-inter)] text-sm font-bold uppercase tracking-wide text-white opacity-50">
            CHECK IT OUT
          </h2>
          <h2 className="font-[var(--font-inter)] text-3xl font-bold uppercase tracking-wide text-white">
            FEATURED PROJECTS
          </h2>
        </div>

        <Link href="/projects" passHref>
          <button className="text-gray-400 opacity-50 hover:text-blue-700 font-semibold">
            All Projects
          </button>
        </Link>
      </div>
        <ProjectsGrid />

      </section>


    {/*Technologies*/}
    <TechnologiesPage />

    {/* Blog/Insights */}
    <BlogGrid />

    {/* About Me */}
    <AboutPage />
      
    </main>
  );
}
