"use client";

import { useEffect, useState } from "react";

type Blog = {
  id: string;
  title: string;
  content: string;
  image?: string; // image URL
};

export default function BlogAdminPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [newImage, setNewImage] = useState<File | null>(null);

  // Fetch all blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blog");
        const data = await res.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Handle delete
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    try {
      await fetch(`/api/blog/${id}`, { method: "DELETE" });
      setBlogs((prev) => prev.filter((b) => b.id !== id));
    } catch (error) {
      console.error("Error deleting blog", error);
    }
  };

  // Start editing
  const startEditing = (blog: Blog) => {
    setEditingBlog(blog);
    setFormData({ title: blog.title, content: blog.content });
    setNewImage(null);
  };

  // Handle update
  const handleUpdate: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!editingBlog) return;

    try {
      const updateData = new FormData();
      updateData.append("title", formData.title);
      updateData.append("content", formData.content);
      if (newImage) {
        updateData.append("image", newImage);
      }

      const res = await fetch(`/api/blog/${editingBlog.id}`, {
        method: "PUT",
        body: updateData,
      });

      if (res.ok) {
        const updated = await res.json();
        setBlogs((prev) =>
          prev.map((b) => (b.id === updated.id ? updated : b))
        );
        setEditingBlog(null);
      }
    } catch (error) {
      console.error("Error updating blog", error);
    }
  };

  if (loading) return <p className="p-6">Loading blog posts...</p>;

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Blog Posts</h1>

      {blogs.length === 0 && <p>No blog posts yet.</p>}

      <div className="grid gap-6">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="p-4 border border-gray-300 rounded bg-white shadow"
          >
            <h2 className="text-xl font-semibold">{blog.title}</h2>
            <p className="text-gray-600 mb-2">{blog.content.slice(0, 120)}...</p>

            {blog.image && (
              <img
                src={blog.image}
                alt={blog.title}
                className="w-32 h-32 object-cover rounded mb-2"
              />
            )}

            <div className="mt-3 flex gap-3">
              <button
                onClick={() => startEditing(blog)}
                className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(blog.id)}
                className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingBlog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Edit Blog Post</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full p-2 border border-gray-400 rounded"
                required
              />
              <textarea
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                className="w-full p-2 border border-gray-400 rounded"
                rows={6}
                required
              />

              <div>
                <label className="block mb-2 font-medium">Replace Image</label>
                {editingBlog.image && !newImage && (
                  <img
                    src={editingBlog.image}
                    alt="Current"
                    className="w-32 h-32 object-cover rounded mb-2"
                  />
                )}
                {newImage && (
                  <p className="text-sm text-gray-600 mb-2">
                    New Image: {newImage.name}
                  </p>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setNewImage(e.target.files ? e.target.files[0] : null)
                  }
                  className="w-full"
                />
              </div>

              <div className="flex gap-4 justify-end">
                <button
                  type="button"
                  onClick={() => setEditingBlog(null)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
