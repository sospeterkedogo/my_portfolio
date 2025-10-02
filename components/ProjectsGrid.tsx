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

export default function ProjectsGrid() {
  const [projects, setProjects] = useState<Project[]>([]);

  const fetchProjects = async () => {
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
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
      {projects.map((project) => (
        <Link key={project.id} href={`/projects/${project.id}`} passHref>
          <div>
            <div className="aspect-square w-full bg-gray-700">
              {project.images[0] && (
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="p-4 bg-gray-900">
              <h3 className="text-lg font-semibold text-white truncate">{project.title}</h3>
              <p className="text-gray-400 text-sm line-clamp-2">{project.description}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
