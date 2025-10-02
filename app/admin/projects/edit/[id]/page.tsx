"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type Project = {
  id: string;
  title: string;
  description: string;
  images?: string[];
};

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams(); // expects URL like /admin/projects/edit/[id]
  const projectId = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<File[]>([]);

  // ----------- Auth check and fetch project -----------
  useEffect(() => {
    const loggedIn = sessionStorage.getItem("adminLoggedIn");
    if (!loggedIn) {
      router.push("/admin/login");
      return;
    }

    const fetchProject = async () => {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("title, description") // Only select what's needed
          .eq("id", projectId)
          .single();

        if (error) throw error;
        if (data) {
          setTitle(data.title);
          setDescription(data.description);
          setImages([]); // Reset new uploads state on load
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

  // ----------- Handle file input -----------
  const handleImageChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files) setImages(Array.from(e.target.files));
  };

  // ----------- Save edits -----------
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      if (images.length > 0) images.forEach((img) => formData.append("images", img));

      const res = await fetch(`/api/projects/${projectId}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) {
        // Handle server errors that return JSON or otherwise
        let errorMessage = "Failed to update project";
        try {
          const data = await res.json();
          errorMessage = data.error || errorMessage;
        } catch (jsonError) {
          // If response is not JSON (e.g., HTML error page), use generic message
          errorMessage += `: Server returned status ${res.status}`;
        }
        throw new Error(errorMessage);
      }

      // Success path - Server must return a 2xx status.
      // We don't need to await res.json() again since the data isn't used
      // and this avoids the reported JSON parsing error in the success path.

      setSuccess("Project updated successfully!");
      // Use a brief delay before redirecting to allow success message to flash
      setTimeout(() => {
        router.push("/admin/projects");
      }, 500);

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
        <textarea
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border border-gray-400 rounded"
          rows={4}
          required
        />
        <div>
          <label className="block mb-1 font-medium">Upload Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="w-full"
          />
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