import { getProjects } from "@/lib/admin/data";
import ProjectCard from "@/components/projects/ProjectCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Selected Works | Sospeter",
  description: "A comprehensive archive of engineering and design projects.",
};

export default async function AllProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="min-h-screen bg-[#e0e0e0] w-full text-neutral-900 selection:bg-blue-600 selection:text-white flex flex-col">
      
      {/* 1. PAGE HEADER */}
      <header className="px-6 md:px-24 pt-32 pb-20 border-b border-neutral-300">
        <div className="max-w-5xl">
            <span className="font-mono text-xs tracking-widest uppercase text-neutral-500 mb-4 block">
                / 001 — The Work
            </span>
            <h1 className="text-[clamp(3.5rem,10vw,8rem)] font-black leading-[0.85] tracking-tighter uppercase mb-8">
                Selected <br />
                <span className="text-neutral-400">Projects</span>
            </h1>
            <p className="text-xl md:text-2xl text-neutral-600 max-w-2xl leading-relaxed font-medium">
                A curated selection of experiments, production applications, and open-source contributions.
            </p>
        </div>
      </header>

      {/* 2. THE ARCHIVE GRID */}
      <section className="px-6 md:px-24 py-20 min-h-[50vh]">
        {projects.length === 0 ? (
          <div className="py-32 flex flex-col items-center justify-center border-y border-neutral-300">
            <p className="font-mono text-neutral-500 uppercase tracking-widest">/ ARCHIVE_EMPTY</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
            {projects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index} 
              />
            ))}
          </div>
        )}
      </section>

  
    </main>
  );
}