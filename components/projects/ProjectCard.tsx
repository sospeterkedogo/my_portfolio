import Link from "next/link";
import { Project } from "@/lib/types"; // Import the GLOBAL type

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link 
      href={`/projects/${project.id}`} 
      className="group block bg-neutral-800 overflow-hidden border border-neutral-800 hover:border-neutral-600 transition-colors"
    >
      {/* Image Container */}
      <div className="aspect-video w-full bg-neutral-900 relative overflow-hidden">
        {project.images && project.images.length > 0 ? (
          <img
            src={project.images[0]}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-700 text-sm uppercase tracking-wider font-semibold">
            No Preview
          </div>
        )}
      </div>

      {/* Text Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-white truncate mb-1 group-hover:text-blue-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-neutral-400 text-sm line-clamp-2">
          {project.description}
        </p>
      </div>
    </Link>
  );
}