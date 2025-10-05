"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Project = {
  id: string;
  title: string;
  summary?: string;
  description: string;
  images?: string[];
  code_url?: string;
  demo_url?: string;
};

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams(); // expects /admin/projects/edit/[id]
  const projectId = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Form state
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [codeUrl, setCodeUrl] = useState("");
  const [demoUrl, setDemoUrl] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const supabase = createClient();

  // Fetch project
  useEffect(() => {

    const fetchProject = async () => {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select(`
            title,
            summary,
            description,
            code_url,
            demo_url,
            project_images(url)
          `)
          .eq("id", projectId)
          .single();

        if (error) throw error;

        if (data) {
          setTitle(data.title);
          setSummary(data.summary || "");
          setDescription(data.description);
          setCodeUrl(data.code_url || "");
          setDemoUrl(data.demo_url || "");
          setImages([]); // Reset new uploads
        }
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Failed to fetch project");
      } finally {
        setLoading(false);
      }
    };

    if (projectId) fetchProject();
  }, [projectId, router]);

  // Fixed handleImageChange
  const handleImageChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setImages((prev) => [...prev, ...(Array.from(e.target.files ?? []))]);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("summary", summary);
      formData.append("description", description);
      formData.append("code_url", codeUrl);
      formData.append("demo_url", demoUrl);
      formData.append("id", projectId);
      images.forEach((img) => formData.append("images", img));

      const res = await fetch("/api/projects", {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Server returned status ${res.status}`);
      }

      setSuccess("Project updated successfully!");
      setTimeout(() => router.push("/admin/projects"), 500);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-white text-center mt-20">Loading project...</p>;

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Edit Project</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}
      {success && <p className="text-green-600 mb-4">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-400 rounded"
          required
        />
        <input
          type="text"
          placeholder="Project Summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className="w-full p-2 border border-gray-400 rounded"
        />
        <textarea
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border border-gray-400 rounded"
          rows={4}
          required
        />
        <input
          type="url"
          placeholder="Code URL (GitHub)"
          value={codeUrl}
          onChange={(e) => setCodeUrl(e.target.value)}
          className="w-full p-2 border border-gray-400 rounded"
        />
        <input
          type="url"
          placeholder="Live Demo URL"
          value={demoUrl}
          onChange={(e) => setDemoUrl(e.target.value)}
          className="w-full p-2 border border-gray-400 rounded"
        />

        <div>
          <label className="block mb-1 font-medium">Upload Images</label>
          <input type="file" accept="image/*" multiple onChange={handleImageChange} className="w-full" />
          {images.length > 0 && (
            <ul className="mt-2 text-sm text-gray-600">
              {images.map((file, idx) => (
                <li key={idx}>{file.name}</li>
              ))}
            </ul>
          )}
        </div>

        <button
          type="submit"
          disabled={saving}
          className={`bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 ${
            saving ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {saving ? "Saving..." : "Update Project"}
        </button>
      </form>
    </main>
  );
}
