import { getProjects } from "@/lib/admin/data";
import ProjectCard from "@/components/projects/ProjectCard";
import { ArrowDownLeft } from "lucide-react";

export default async function ProjectsGrid() {
  const projects = await getProjects();

  if (!projects || projects.length === 0) {
    return (
      <div className="w-full min-h-[50vh] bg-[#e0e0e0] flex items-center justify-center border-t border-neutral-300">
        <p className="font-mono text-neutral-500 text-sm">/ NO_ARCHIVES_FOUND</p>
      </div>
    );
  }

  return (
    <section className="w-full bg-[#e0e0e0] text-neutral-900 pb-20">
      {/* SECTION HEADER: Matches the "technical" feel of the Hero */}
      <div className="border-t border-neutral-300 px-6 md:px-24 py-12 flex flex-col md:flex-row justify-between items-start md:items-end mb-8">
        <div>
           <div className="flex items-center gap-2 text-neutral-500 font-mono text-xs tracking-widest mb-2">
              <span className="w-2 h-2 bg-neutral-900 rounded-full"></span>
              <span>SELECTED WORKS (0{projects.length})</span>
           </div>
           <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-neutral-900 uppercase">
             Recent<br />Projects
           </h2>
        </div>
        <ArrowDownLeft size={48} strokeWidth={1} className="text-neutral-400 hidden md:block" />
      </div>

      {/* THE GRID: 2 Columns for Impact, not 4 for clutter */}
      <div className="px-6 md:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}