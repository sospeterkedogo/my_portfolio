"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

type Project = {
  id: number;
  title: string;
  description: string;
  images: string[];
};

export default function AllProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("projects")
      .select(`
        id,
        title,
        description,
        project_images(url)
      `)
      .order("id", { ascending: true });

    if (!error && data) {
      const formatted = data.map((p: any) => ({
        id: p.id,
        title: p.title,
        description: p.description,
        images: p.project_images?.map((img: any) => img.url) || [],
      }));
      setProjects(formatted);
    } else if (error) {
      console.error("Error fetching projects:", error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <main className="min-h-screen bg-[#121212] w-full px-4 sm:px-8 md:px-16 lg:px-60 py-16">
      <div className="max-w-5xl mx-auto">
        {/* Page Title */}
        <div className="mb-1 mt-10">
          <h1 className="text-4xl font-bold text-white tracking-tight">
            Projects
          </h1>
          <p className="text-gray-400 text-sm">
            A showcase of selected works and experiments.
          </p>
        </div>

        {loading ? (
          <p className="text-gray-400 text-lg">Loading projects...</p>
        ) : projects.length === 0 ? (
          <p className="text-gray-400 text-lg">No projects yet.</p>
        ) : (
          <div className="flex flex-col gap-5">
            {projects.map((project) => (
              <Link href={`/projects/${project.id}`} key={project.id} passHref>
                <div className="group relative w-full overflow-hidden shadow-lg bg-black cursor-pointer">
                  
                  {/* Image */}
                  {project.images[0] ? (
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className="w-full h-[280px] md:h-[360px] object-cover transform group-hover:scale-105 transition duration-700 ease-out"
                    />
                  ) : (
                    <div className="w-full h-[280px] md:h-[360px] bg-[#2a2a2a] flex items-center justify-center text-gray-500">
                      No Image
                    </div>
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-90 group-hover:opacity-100 transition"></div>

                  {/* Text Content */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl md:text-3xl font-bold text-white">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 text-sm md:text-base max-w-2xl line-clamp-2">
                      {project.description}
                    </p>
                    <span className="mt-3 inline-block text-gray-200 text-sm font-semibold group-hover:opacity-80 transition">
                      View Project →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
