"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Blog = {
  id: string;
  title: string;
  content: string;
  cover_url?: string;
  created_at: string;
};

export default function BlogGrid() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data, error } = await supabase
          .from("blogs")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(4); // fetch latest 4 posts

        if (error) throw error;
        setBlogs(data || []);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <p className="text-white text-center mt-12">Loading latest posts...</p>;
  if (!blogs.length) return <p className="text-white text-center mt-12">No posts found.</p>;

  return (
    <section id="blog" className="w-full max-w-7xl mx-auto px-6 py-12">
      <h2 className="font-[var(--font-inter)] text-1xl font-bold text-white uppercase tracking-wide opacity-50">
        STORIES
      </h2>
      <h2 className="font-[var(--font-inter)] text-3xl font-bold mb-3 text-white">LATEST POSTS</h2>

      <div className="grid md:grid-cols-2 gap-8">
        {blogs.map((blog) => (
          <a
            key={blog.id}
            href={`/blog/${blog.id}`}
            className="block bg-gray-900 rounded-xl p-6 shadow-xl hover:scale-105 transition"
          >
            <div className="flex justify-between mb-2">
              <h3 className="text-xl font-bold text-white truncate">{blog.title}</h3>
              <span className="text-blue-300 text-xs">
                {new Date(blog.created_at).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-300 line-clamp-3">
              {blog.content.slice(0, 150)}...
            </p>
            <span className="mt-2 text-blue-400 block font-semibold">Read more →</span>
          </a>
        ))}
      </div>
    </section>
  );
}
