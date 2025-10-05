"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Project = {
  id: string;
  title: string;
  description: string;
  images?: string[];
};

type Props = {
  initialProjects: Project[];
};

export default function ProjectsAdminClient({ initialProjects }: Props) {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [loading, setLoading] = useState(false);

  // ----------- Delete project -----------
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/projects?id=${id}`, { method: "DELETE" });
      const data = await res.json();

      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
      } else {
        console.error("Delete failed:", data.error);
      }
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-white text-center mt-20">Processing...</p>;

  return (
    <main className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Manage Projects</h1>
        <button
          onClick={() => router.push("/admin/projects/new")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add New Project
        </button>
      </div>

      {projects.length === 0 ? (
        <p className="text-gray-500">No projects yet.</p>
      ) : (
        <div className="grid gap-6">
          {projects.map((project) => (
            <div key={project.id} className="p-4 border rounded shadow bg-gray-900 text-white">
              <h2 className="text-xl font-semibold text-blue-300">{project.title}</h2>
              <p className="text-gray-300 mt-1">{project.description}</p>

              {project.images && project.images.length > 0 && (
                <div className="flex gap-2 mt-3 overflow-x-auto">
                  {project.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={project.title}
                      className="w-24 h-24 object-cover rounded shadow"
                    />
                  ))}
                </div>
              )}

              <div className="mt-4 flex gap-2">
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
      )}
    </main>
  );
}
