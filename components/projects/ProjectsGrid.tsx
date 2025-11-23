import { getProjects } from "@/lib/admin/data"; // <--- REUSE YOUR LOGIC
import ProjectCard from "@/components/projects/ProjectCard";

export default async function ProjectsGrid() {
  // 1. Fetch directly on the server. 
  // This runs before the page even leaves the server.
  const projects = await getProjects();

  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-20 text-neutral-500">
        <p>No projects published yet.</p>
      </div>
    );
  }

  // 2. Render the Grid
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}