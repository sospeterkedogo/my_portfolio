import Link from "next/link";
import HeroSection from "@/components/sections/Hero";
import ProjectsGrid from "@/components/projects/ProjectsGrid"; // Now works because page is Server
import BlogGrid from "@/components/blogs/BlogGrid"; // Needs to be a Server Component too (see below)
import About from "@/components/sections/About";
import Technologies from "@/components/sections/Technologies";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="bg-[#1c1c1c] min-h-screen flex flex-col">
      {/* Hero Section */}
      <HeroSection />

      {/* Projects Section */}
      <section id="projects" className="w-full max-w-7xl mx-auto px-6 py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">
              Check it out
            </h2>
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wide text-white">
              Featured Projects
            </h2>
          </div>

          <Link href="/projects" className="hidden sm:block">
            <button className="text-neutral-400 hover:text-blue-400 font-medium transition-colors border-b border-transparent hover:border-blue-400 pb-1">
              View All Projects -&gt;
            </button>
          </Link>
        </div>
        
        {/* The Server Component */}
        <ProjectsGrid />

        {/* Mobile only button */}
        <div className="mt-8 sm:hidden text-center">
          <Link href="/projects" className="text-blue-400 font-semibold">
             View All Projects
          </Link>
        </div>
      </section>

      {/* Other Sections */}
      <About />
      <Technologies />
      
      {/* Blog Section */}
      <section className="w-full max-w-7xl mx-auto px-6 py-24">
        <div className="mb-12">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">
            Insights
          </h2>
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wide text-white">
            Latest Blogs
          </h2>
        </div>
        <BlogGrid />
      </section>

      <Contact />
    </main>
  );
}