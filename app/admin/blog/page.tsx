"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Blog = {
  id: string;
  title: string;
  content: string;
  cover_url?: string | null;
  created_at: string;
};

export default function BlogsAdminPage() {
  const router = useRouter();

  // ✅ All hooks unconditionally
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Check authentication and fetch blogs
  useEffect(() => {
    const checkAuthAndFetch = async () => {
      const loggedIn = sessionStorage.getItem("adminLoggedIn");
      if (!loggedIn) {
        router.push("/admin/login");
        return;
      }

      try {
        const res = await fetch("/api/blogs");
        if (!res.ok) throw new Error("Failed to fetch blogs");
        const data = await res.json();
        setBlogs(data || []);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Error fetching blogs");
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndFetch();
  }, [router]);

  // Delete blog
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    try {
      const res = await fetch(`/api/blogs?id=${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete blog");
      }

      // Remove deleted blog from UI immediately
      setBlogs((prev) => prev.filter((b) => b.id !== id));
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Error deleting blog");
    }
  };

  if (loading) return <p className="text-white text-center mt-20">Checking authentication...</p>;
  if (error) return <p className="text-red-500 text-center mt-20">{error}</p>;

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-white">Manage Blogs</h1>

      {blogs.length === 0 && <p className="text-gray-500">No blogs yet.</p>}

      <div className="grid gap-6">
        {blogs.map((blog) => (
          <div key={blog.id} className="p-4 border rounded shadow bg-white dark:bg-gray-800">
            <h2 className="text-xl font-semibold">{blog.title}</h2>
            <p className="text-gray-600 dark:text-gray-300">{blog.content}</p>

            {blog.cover_url && (
              <div className="flex gap-2 mt-2 overflow-x-auto">
                <img
                  src={blog.cover_url}
                  alt={blog.title}
                  className="w-24 h-24 object-cover rounded"
                />
              </div>
            )}

            <div className="mt-3 flex gap-2">
              <button
                onClick={() => router.push(`/admin/blog/edit/${blog.id}`)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(blog.id)}
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
