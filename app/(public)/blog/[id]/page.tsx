"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useParams } from "next/navigation";

const supabase = createClient();

type Blog = {
  id: string;
  title: string;
  content: string;
  cover_url?: string;
  created_at: string;
};

export default function BlogPage() {
  const params = useParams();
  const blogId = params?.id;

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!blogId) return;

    const fetchBlog = async () => {
      try {
        const { data, error } = await supabase
          .from("blogs")
          .select("*")
          .eq("id", blogId)
          .single();

        if (error) throw error;
        setBlog(data);
      } catch (err) {
        console.error("Error fetching blog:", err);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogId]);

  if (loading) return <p className="text-white text-center mt-20">Loading...</p>;
  if (!blog) return <p className="text-white text-center mt-20">Blog not found.</p>;

  return (
    <main className="max-w-4xl mx-auto p-6 mt-20">
      {blog.cover_url && (
        <img
          src={blog.cover_url}
          alt={blog.title}
          className="w-full h-64 object-cover rounded mb-6"
        />
      )}
      <h1 className="text-4xl font-bold mb-4 text-white">{blog.title}</h1>
      <span className="text-blue-300 text-sm mb-4 block">
        {new Date(blog.created_at).toLocaleDateString()}
      </span>
      <p className="text-gray-300 whitespace-pre-line">{blog.content}</p>
    </main>
  );
}
