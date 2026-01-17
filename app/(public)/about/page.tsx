import { ArrowDownRight, Coffee, Code2, Globe } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: "About | Sospeter",
   description: "Software Engineer based in Northampton, UK.",
};

export default function AboutPage() {
   return (
      <main className="min-h-screen bg-[#e0e0e0] w-full text-neutral-900 selection:bg-blue-600 selection:text-white flex flex-col">

         {/* 1. HEADER / INTRO */}
         <header className="px-6 md:px-24 pt-32 pb-20 border-b border-neutral-300">
            <div className="max-w-5xl">
               <span className="font-mono text-xs tracking-widest uppercase text-neutral-500 mb-4 block">
                  / 002 — The Context
               </span>
               <h1 className="text-[clamp(3rem,8vw,7rem)] font-black leading-[0.85] tracking-tighter uppercase mb-8">
                  Hello, I'm <br />
                  <span className="text-neutral-400">Sospeter.</span>
               </h1>
               <p className="text-xl md:text-2xl text-neutral-600 max-w-2xl leading-relaxed font-medium">
                  I'm a Software Engineer based in Northampton, UK.
               </p>
            </div>
         </header>

         {/* 2. THE PROFILE GRID */}
         <section className="px-6 md:px-24 py-24 w-full max-w-[1920px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">

               {/* LEFT COL: The Photo & Stats (Sticky) */}
               <div className="md:col-span-5 flex flex-col gap-8 h-fit md:sticky md:top-32">
                  {/* IMAGE CONTAINER - Don't use a stiff corporate headshot. Use something natural. */}
                  <div className="aspect-[3/4] bg-neutral-300 w-full relative overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                     {/* <img src="/me.jpg" alt="Sospeter" className="object-cover w-full h-full" /> */}
                     <div className="w-full h-full flex items-center justify-center bg-neutral-200 text-neutral-400 font-mono text-xs text-center p-8">
                        <img src="/images/me.png" alt="Sospeter" className="object-cover w-full h-full" />
                     </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-4 font-mono text-xs uppercase tracking-widest text-neutral-500">
                     <div>
                        <span className="block text-neutral-900 font-bold mb-1">Location</span>
                        Northampton, UK
                     </div>
                     <div>
                        <span className="block text-neutral-900 font-bold mb-1">Status</span>
                        Open to Work
                     </div>
                     <div>
                        <span className="block text-neutral-900 font-bold mb-1">Experience</span>
                        3+ Years
                     </div>
                     <div>
                        <span className="block text-neutral-900 font-bold mb-1">Focus</span>
                        React / Node
                     </div>
                  </div>
               </div>

               {/* RIGHT COL: The Narrative */}
               <div className="md:col-span-7 flex flex-col gap-20">

                  {/* Section 1: The Journey */}
                  <div className="prose prose-lg prose-neutral max-w-none text-neutral-800">
                     <h3 className="flex items-center gap-3 font-bold text-xl uppercase tracking-wider mb-6">
                        <Globe size={20} className="text-blue-600" />
                        The Journey
                     </h3>
                     <p>
                        I started coding in high school to build pc games for my friends and I. I initially started with learning the Unity game engine and that is when I discovered my passion for programming. I learnt C++ through youtube videos and practiced relpicating the code of each eposide without looking at the video.
                     </p>

                     <br />
                     <p>
                        I then moved on to web development and started learning HTML, CSS, and JavaScript. I was fascinated by the fact that I could create something that could be accessed by anyone with an internet connection. I then moved on to learning React and Node.js and started building full-stack applications.
                     </p>

                     <br />
                     <p>
                        Over the last few years, I've moved from simple HTML pages to complex full-stack applications. It hasn't always been pretty there were plenty of broken builds and confusing error messages but every bug fixed was a lesson learned. Today, I focus on writing clean, maintainable code and building interfaces that don't confuse the user.
                     </p>
                  </div>

                  {/* Section 2: The Philosophy */}
                  <div className="prose prose-lg prose-neutral max-w-none text-neutral-800">
                     <h3 className="flex items-center gap-3 font-bold text-xl uppercase tracking-wider mb-6">
                        <Code2 size={20} className="text-blue-600" />
                        How I Work
                     </h3>
                     <p>
                        I believe in <strong>function over flash</strong>. Animations are great, but not if the site takes 10 seconds to load. My priority is always performance, accessibility, and reliability.
                     </p>
                     <ul className="list-disc pl-5 space-y-2 marker:text-blue-600">
                        <li><strong>Keep it simple:</strong> Complexity is the enemy of reliability.</li>
                        <li><strong>User first:</strong> If it's hard to use, the code doesn't matter.</li>
                        <li><strong>Always learning:</strong> The tech landscape changes daily. I try to keep up without getting distracted by every shiny new toy.</li>
                     </ul>
                  </div>

                  {/* Section 3: Offline */}
                  <div className="prose prose-lg prose-neutral max-w-none text-neutral-800">
                     <h3 className="flex items-center gap-3 font-bold text-xl uppercase tracking-wider mb-6">
                        <Coffee size={20} className="text-blue-600" />
                        Offline
                     </h3>
                     <p>
                        When I'm not debugging, I'm usually hanging out with friends, or out and about exploring the city. I believe stepping away from the screen is the best way to solve a difficult problem.
                     </p>
                  </div>

               </div>
            </div>
         </section>
      </main>
   );
}