"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Blog = {
  id: string;
  title: string;
  content: string;
  cover_url?: string | null;
  created_at: string;
};

type Props = {
  blogs: Blog[];
};

export default function BlogsAdminClient({ blogs: initialBlogs }: Props) {
  const router = useRouter();
  const [blogs, setBlogs] = useState(initialBlogs);

  // Delete blog
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    try {
      const res = await fetch(`/api/blogs?id=${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete blog");
      }

      setBlogs((prev) => prev.filter((b) => b.id !== id));
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Error deleting blog");
    }
  };

  if (!blogs) return <p className="text-gray-500 text-center mt-20">No blogs found.</p>;

  return (
    <main className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6 mt-6">
        <h1 className="text-3xl font-bold">Manage Blogs</h1>
        <button
          onClick={() => router.push("/admin/blog/new")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add New Blog
        </button>
      </div>

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
