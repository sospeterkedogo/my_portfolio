"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Blog = {
  id: string;
  title: string;
  content: string;
  cover_url?: string | null;
};

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams(); // expects URL like /admin/blog/edit/[id]
  const blogId = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Form state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const supabase = createClient();

  // ----------- fetch blog -----------
  useEffect(() => {
    
    const fetchBlog = async () => {
      try {
        const { data, error } = await supabase
          .from("blogs")
          .select("title, content")
          .eq("id", blogId)
          .single();

        if (error) throw error;
        if (data) {
          setTitle(data.title);
          setContent(data.content);
          setImage(null); // Reset image upload field
        }
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Failed to fetch blog");
      } finally {
        setLoading(false);
      }
    };

    if (blogId) fetchBlog();
  }, [blogId, router]);

  // ----------- Handle file input -----------
  const handleImageChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files && e.target.files[0]) setImage(e.target.files[0]);
  };

  // ----------- Save edits -----------
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      formData.append("id", blogId);
      formData.append("title", title);
      formData.append("content", content);
      if (image) formData.append("image", image);

      const res = await fetch(`/api/blogs/${blogId}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) {
        let errorMessage = "Failed to update blog";
        try {
          const data = await res.json();
          errorMessage = data.error || errorMessage;
        } catch {
          errorMessage += `: Server returned status ${res.status}`;
        }
        throw new Error(errorMessage);
      }

      setSuccess("Blog updated successfully!");
      setTimeout(() => router.push("/admin/blog"), 500);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-white text-center mt-20">Loading blog...</p>;

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Edit Blog</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}
      {success && <p className="text-green-600 mb-4">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-400 rounded"
          required
        />
        <textarea
          placeholder="Blog Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border border-gray-400 rounded"
          rows={8}
          required
        />
        <div>
          <label className="block mb-2 font-medium">Upload Cover Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} className="w-full" />
        </div>
        <button
          type="submit"
          disabled={saving}
          className={`bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 ${
            saving ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {saving ? "Saving..." : "Update Blog"}
        </button>
      </form>
    </main>
  );
}
