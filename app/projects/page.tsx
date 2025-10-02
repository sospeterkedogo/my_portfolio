"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

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
    <main className="max-w-7xl mx-auto p-6 mt-20">
      <h1 className="text-4xl font-bold mb-6 text-blue-400">All Projects</h1>

      {loading ? (
        <p className="text-gray-400 text-lg">Loading projects...</p>
      ) : projects.length === 0 ? (
        <p className="text-gray-400 text-lg">No projects yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {projects.map((project) => (
            <Link href={`/projects/${project.id}`} key={project.id} passHref>
              <div className="bg-gray-900 rounded-lg shadow-lg p-4 hover:scale-105 transition-transform duration-300">
                <div className="aspect-square bg-gray-700 mb-4">
                  {project.images[0] && (
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className="w-full h-full object-cover rounded"
                    />
                  )}
                </div>
                <h3 className="text-white font-semibold text-lg mb-2 truncate">{project.title}</h3>
                <p className="text-gray-400 text-sm line-clamp-3">{project.description}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
