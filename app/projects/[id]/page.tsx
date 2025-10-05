"use client";

import { use, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

const supabase = createClient();

type Project = {
  id: number;
  title: string;
  summary: string;
  description: string;
  images: string[];
  code_url?: string;
  demo_url?: string;
};

type ProjectPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function ProjectPage({ params }: ProjectPageProps) {
  const { id } = use(params);

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProject = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("projects")
      .select(`
        id,
        title,
        summary,
        description,
        code_url,
        demo_url,
        project_images(url)
      `)
      .eq("id", id)
      .single();

    if (!error && data) {
      const formatted: Project = {
        id: data.id,
        title: data.title,
        summary: data.summary,
        description: data.description,
        code_url: data.code_url,
        demo_url: data.demo_url,
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
    return (
      <p className="text-gray-400 text-lg mt-20 text-center">
        Loading project...
      </p>
    );
  }

  if (!project) {
    return (
      <p className="text-gray-400 text-lg mt-20 text-center">
        Project not found.
      </p>
    );
  }

  return (
    <main className="min-h-screen bg-[#1c1c1c] text-white py-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-400 tracking-wide">
          {project.title}
        </h1>

        {/* Summary */}
        {project.summary && (
          <p className="text-gray-300 text-lg mb-6 leading-snug italic">
            {project.summary}
          </p>
        )}

        {/* Action buttons */}
        <div className="flex gap-4 mb-10">
          {project.code_url && (
            <Link
              href={project.code_url}
              target="_blank"
              className="px-5 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold"
            >
              View Code
            </Link>
          )}
          {project.demo_url && (
            <Link
              href={project.demo_url}
              target="_blank"
              className="px-5 py-2 bg-green-600 hover:bg-green-500 rounded-lg font-semibold"
            >
              View Live Demo
            </Link>
          )}
        </div>

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
