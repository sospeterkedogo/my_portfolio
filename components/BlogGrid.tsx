"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

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
          .limit(4);

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

  if (loading) return <p className="text-gray-400 text-center mt-12">Loading latest posts...</p>;
  if (!blogs.length) return <p className="text-gray-400 text-center mt-12">No posts found.</p>;

  return (
    <section id="blog" className="w-full max-w-7xl mx-auto px-6 py-16 bg-[#1c1c1c]">
      
      {/* Section Header */}
        <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="font-[var(--font-inter)] text-sm font-bold uppercase tracking-wide text-white opacity-50">
            Stories
          </h2>
          <h2 className="font-[var(--font-inter)] text-3xl font-bold uppercase tracking-wide text-white">
            LATEST ARTICLES
          </h2>
        </div>

        <Link href="/blog" passHref>
          <button className="text-gray-400 opacity-50 hover:text-blue-700 font-semibold">
            All Articles
          </button>
        </Link>
      </div>

      

      {/* Blog Grid */}
      <div className="grid md:grid-cols-2 gap-10">
        {blogs.map((blog) => (
          <a
            key={blog.id}
            href={`/blog/${blog.id}`}
            className="group flex flex-col overflow-hidden bg-[#2a2a2a] hover:bg-[#323232] transition duration-300 shadow-md hover:shadow-2xl"
          >
            {/* Cover Image */}
            {blog.cover_url && (
              <div className="relative w-full h-48 overflow-hidden">
                <img
                  src={blog.cover_url}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            )}

            {/* Content */}
            <div className="flex flex-col flex-1 p-6">
              <h3 className="text-xl font-semibold text-white group-hover:text-gray-200 transition mb-2 line-clamp-1">
                {blog.title}
              </h3>
              <span className="text-gray-500 text-xs mb-3">
                {new Date(blog.created_at).toLocaleDateString()}
              </span>
              <p className="text-gray-300 text-sm line-clamp-3">
                {blog.content.slice(0, 150)}...
              </p>

              <span className="mt-4 text-gray-300 text-sm font-medium group-hover:opacity-80 transition">
                Read more →
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
