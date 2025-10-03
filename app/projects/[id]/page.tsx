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
    <main className="min-h-screen bg-[#1c1c1c] text-white py-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-400 tracking-wide">
          {project.title}
        </h1>

        {/* Description */}
        <p className="text-gray-200 text-lg md:text-xl mb-10 leading-relaxed">
          {project.description}
        </p>

        {/* Images */}
        {project.images.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.images.map((image, idx) => (
              <div
                key={idx}
                className="overflow-hidden shadow-lg bg-[#222222]"
              >
                <img
                  src={image}
                  alt={`${project.title} image ${idx + 1}`}
                  className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
