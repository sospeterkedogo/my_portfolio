import { getProjects } from "@/lib/admin/data";
import ProjectCard from "@/components/projects/ProjectCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Projects | Portfolio",
  description: "A showcase of my engineering and design work.",
};

export default async function AllProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="min-h-screen bg-[#1c1c1c] w-full py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 border-b border-neutral-800">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Projects
          </h1>
          <p className="text-neutral-400 text-lg max-w-2xl">
            Experiments, production apps, and open source contributions.
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="py-20 text-center text-neutral-500 bg-neutral-900/50 rounded-xl border border-neutral-800">
            <p>No projects found in the library.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}