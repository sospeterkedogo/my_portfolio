import HeroSection from "@/components/sections/Hero";
import ProjectsGrid from "@/components/projects/ProjectsGrid";
import About from "@/components/sections/About";
import Technologies from "@/components/sections/Technologies";
import BlogList from "@/components/blogs/BlogList"; // Renamed to List for variety

export default function Home() {
  return (
    <main className="bg-[#e0e0e0] min-h-screen flex flex-col w-full text-neutral-900 selection:bg-blue-600 selection:text-white">
      
      {/* 1. HERO: The Hook */}
      <HeroSection />

      {/* 2. PROJECTS: The Proof (Grid) */}
      {/* Note: Remove the padding/headers here. The Component handles it. */}
      <div id="work">
        <ProjectsGrid />
      </div>

      {/* 3. ABOUT: The Philosophy (Typography) */}
      <About />

      {/* 4. TECH: The Tools (Marquee/Motion) */}
      <Technologies />
      
      {/* 5. BLOG: The Thoughts (Editorial List) */}
      <section className="w-full px-6 md:px-24 py-24 border-t border-neutral-300">
        <div className="flex flex-col md:flex-row justify-between mb-16 items-baseline">
           <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">Insight</h2>
           <p className="font-mono text-xs text-neutral-500 uppercase tracking-widest mt-4 md:mt-0">
             (Reading Time: Varies)
           </p>
        </div>
        <BlogList />
      </section>
    </main>
  );
}