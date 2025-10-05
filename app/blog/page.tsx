"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

const supabase = createClient();

type Blog = {
  id: string;
  title: string;
  content: string;
  cover_url?: string;
  created_at: string;
};

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data, error } = await supabase
          .from("blogs")
          .select("id, title, content, cover_url, created_at")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setBlogs(data || []);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading)
    return (
      <p className="text-gray-300 text-center mt-20">Loading...</p>
    );
  if (blogs.length === 0)
    return (
      <p className="text-gray-300 text-center mt-20">No blog posts yet.</p>
    );

  return (
    <main className="min-h-screen bg-[#1c1c1c] px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mt-20">Latest Articles</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {blogs.map((blog) => (
            <Link
              key={blog.id}
              href={`/blog/${blog.id}`}
              className="group flex flex-col overflow-hidden bg-[#2a2a2a] hover:bg-[#323232] transition duration-300 shadow-md hover:shadow-xl"
            >
              {/* Cover image */}
              {blog.cover_url ? (
                <div className="relative w-full h-48 overflow-hidden">
                  <img
                    src={blog.cover_url}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ) : (
                <div className="w-full h-48 bg-[#3a3a3a] flex items-center justify-center text-gray-500 text-sm">
                  No Image
                </div>
              )}

              {/* Content */}
              <div className="flex flex-col flex-1 p-6">
                <span className="text-xs uppercase tracking-wide text-white mb-2">
                  {new Date(blog.created_at).toLocaleDateString()}
                </span>
                <h2 className="text-2xl font-semibold text-white group-hover:text-blue-300 transition line-clamp-2">
                  {blog.title}
                </h2>
                <p className="text-gray-400 text-sm mt-3 line-clamp-3">
                  {blog.content}
                </p>

                <div className="mt-auto pt-4">
                  <span className="text-white text-sm font-medium group-hover:underline">
                    Read More →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
