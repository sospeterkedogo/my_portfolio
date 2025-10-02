"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

type Project = {
  id: string;
  title: string;
  description: string;
  created_at: string;
  images?: string[];
};

export default function ProjectsAdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);

  // ----------- Auth check -----------
  useEffect(() => {
    const loggedIn = sessionStorage.getItem("adminLoggedIn");
    if (!loggedIn) {
      router.push("/admin/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  // ----------- Fetch projects -----------
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*, project_images(url)")
        .order("created_at", { ascending: false });

      if (error) throw error;

      const formatted = data.map((p: any) => ({
        ...p,
        images: p.project_images?.map((img: any) => img.url) || [],
      }));

      setProjects(formatted);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // ----------- Delete project -----------
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await fetch(`/api/projects/${id}`, { method: "DELETE" });
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // ----------- Render -----------
  if (loading) return <p className="text-white text-center mt-20">Checking authentication...</p>;

  return (
    <main className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Projects</h1>
        <button
          onClick={() => router.push("/admin/projects/new")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add New Project
        </button>
      </div>

      {!loading && projects.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400">No projects yet.</p>
      )}

      <div className="grid gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="p-4 border rounded shadow bg-white dark:bg-gray-800"
          >
            <h2 className="text-xl font-semibold">{project.title}</h2>
            <p className="text-gray-600 dark:text-gray-300">{project.description}</p>
            {project.images && project.images.length > 0 && (
              <div className="flex gap-2 mt-2 overflow-x-auto">
                {project.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={project.title}
                    className="w-24 h-24 object-cover rounded"
                  />
                ))}
              </div>
            )}
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => router.push(`/admin/projects/edit/${project.id}`)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(project.id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
