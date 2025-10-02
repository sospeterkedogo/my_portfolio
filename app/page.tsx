"use client";

import React from 'react';
import ProjectsGrid  from '../components/ProjectsGrid';
import Link from "next/link";
import HeroSection from '../components/Hero';
import BlogGrid from '@/components/BlogGrid';
import AboutPage from './about/page';

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
          <button className="text-white opacity-10 hover:text-blue-700 font-semibold">
            All Projects
          </button>
        </Link>
      </div>
        <ProjectsGrid />

      </section>


  <section id="skills" className="relative w-full h-screen bg-gray-900">
    
    {/* Centered heading */}
    <div className="absolute top-20 left-1/2 transform -translate-x-1/2 text-center z-20">
      <h2 className="font-[var(--font-inter)] text-sm font-bold uppercase tracking-widest text-white opacity-50">
        CAPABILITIES
      </h2>
      <h2 className="font-[var(--font-inter)] text-3xl font-bold text-white">
        THINGS I DO
      </h2>
    </div>

    {/* Skills grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 h-full">
      {/* Front End */}
      <div
        className="relative h-full bg-cover bg-center"
        style={{ backgroundImage: "url('/images/frontend.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute bottom-30 left-6 text-white z-10">
          <h3 className="text-xl font-bold uppercase text-center">Front End</h3>
          <p className="text-sm text-center">Direction, UI/UX, Branding, Visual Design</p>
        </div>
      </div>

      {/* Backend */}
      <div
        className="relative h-full bg-cover bg-center"
        style={{ backgroundImage: "url('/images/backend.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute bottom-30 left-6 text-white z-10">
          <h3 className="text-xl font-bold uppercase text-center">Backend</h3>
          <p className="text-sm text-center">Frontend, Backend, HTML, CSS, JS, React, Next.js</p>
        </div>
      </div>

      {/* Mobile Development */}
      <div
        className="relative h-full bg-cover bg-center"
        style={{ backgroundImage: "url('/images/mobile.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute bottom-30 left-6 text-white z-10">
          <h3 className="text-xl font-bold uppercase text-center">Mobile Development</h3>
          <p className="text-sm text-center">Interaction Design, Animation, WebGL, SVG</p>
        </div>
      </div>

      {/* Cloud */}
      <div
        className="relative h-full bg-cover bg-center"
        style={{ backgroundImage: "url('/images/cloud.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute bottom-30 left-6 text-white z-10">
          <h3 className="text-xl font-bold uppercase text-center">Cloud</h3>
          <p className="text-sm text-center">AWS, Google Cloud</p>
        </div>
      </div>
    </div>
  </section>


    {/* Blog/Insights */}
    <BlogGrid />

    {/* About Me */}
    <AboutPage />
      
    </main>
  );
}
