"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Blog = {
  id: string;
  title: string;
  content: string;
  cover_url?: string | null;
};

type PageProps = {
  params: {
    id: string;
  };
};

export default function EditBlogPage({ params: { id } }: PageProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  // Auth check
  useEffect(() => {
    const loggedIn = sessionStorage.getItem("adminLoggedIn");
    if (!loggedIn) router.push("/admin/login");
  }, [router]);

  // Fetch blog data
  useEffect(() => {
    async function fetchBlog() {
      try {
        const res = await fetch("/api/blogs");
        const data = await res.json();
        const b = data.find((b: Blog) => String(b.id) === id);
        if (!b) {
          router.push("/admin/blog");
          return;
        }
        setBlog(b);
        setTitle(b.title);
        setContent(b.content);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchBlog();
  }, [id, router]);

  const handleImageChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files && e.target.files[0]) setImage(e.target.files[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const formData = new FormData();
    formData.append("id", String(id));
    formData.append("title", title);
    formData.append("content", content);
    if (image) formData.append("image", image);

    try {
      const res = await fetch("/api/blogs", {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update blog");
      }

      router.push("/admin/blog"); // back to Manage Blogs
    } catch (err: any) {
      console.error(err);
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-white text-center mt-20">Loading blog...</p>;

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Edit Blog</h1>

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
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          {saving ? "Saving..." : "Update Blog"}
        </button>
      </form>
    </main>
  );
}
