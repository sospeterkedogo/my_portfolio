"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Project = {
  id: number;
  title: string;
  description: string;
  images: string[];
};

type ProjectPageProps = {
  params: {
    id: string;
  };
};

export default function ProjectPage({ params: { id } }: ProjectPageProps) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProject = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("projects")
      .select(`
        id,
        title,
        description,
        project_images(url)
      `)
      .eq("id", id)
      .single();

    if (!error && data) {
      const formatted: Project = {
        id: data.id,
        title: data.title,
        description: data.description,
        images: data.project_images?.map((img: any) => img.url) || [],
      };
      setProject(formatted);
    } else if (error) {
      console.error("Error fetching project:", error.message);
      setProject(null);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchProject();
  }, [id]);

  if (loading) {
    return <p className="text-gray-400 text-lg mt-20 text-center">Loading project...</p>;
  }

  if (!project) {
    return <p className="text-gray-400 text-lg mt-20 text-center">Project not found.</p>;
  }

  return (
    <main className="max-w-4xl mx-auto p-6 mt-20">
      <h1 className="text-4xl font-bold mb-6 text-blue-400">{project.title}</h1>
      <p className="text-white mb-6">{project.description}</p>

      {project.images.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {project.images.map((image, idx) => (
            <img
              key={idx}
              src={image}
              alt={`${project.title} image ${idx + 1}`}
              className="rounded shadow-md w-full h-auto object-cover"
            />
          ))}
        </div>
      )}
    </main>
  );
}
