import Link from "next/link";
import { getBlogs } from "@/lib/admin/data";
import { format } from "date-fns";
import { ArrowRight } from "lucide-react";

export default async function BlogList() {
  // Fetch latest 4 blogs only
  const allBlogs = await getBlogs();
  const blogs = allBlogs ? allBlogs.slice(0, 4) : [];

  if (!blogs || blogs.length === 0) {
    return (
      <div className="border-t border-neutral-300 py-8 text-neutral-500 font-mono text-sm">
        / NO_ENTRIES_FOUND
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      {/* THE LIST */}
      <div className="flex flex-col border-t border-neutral-300">
        {blogs.map((blog) => (
          <Link 
            key={blog.id} 
            href={`/blog/${blog.id}`}
            className="group flex flex-col md:flex-row md:items-baseline justify-between py-8 border-b border-neutral-300 hover:bg-neutral-300/20 transition-colors"
          >
            {/* Meta Data (Left) */}
            <div className="flex items-center gap-4 md:w-1/4 mb-2 md:mb-0">
               <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">
                 {format(new Date(blog.created_at), "MMM dd, yyyy")}
               </span>
            </div>

            {/* Title (Center/Right) */}
            <div className="md:w-3/4 flex justify-between items-center gap-4">
              <h3 className="text-xl md:text-3xl font-bold text-neutral-900 leading-tight group-hover:text-blue-700 transition-colors">
                {blog.title}
              </h3>
              
              {/* Subtle Arrow that moves on hover */}
              <ArrowRight 
                size={20} 
                className="text-neutral-400 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" 
              />
            </div>
          </Link>
        ))}
      </div>

      {/* FOOTER LINK */}
      <div className="mt-12 flex justify-end">
        <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-widest text-neutral-900 border-b-2 border-neutral-900 pb-1 hover:text-blue-600 hover:border-blue-600 transition-all"
        >
            View Full Archive <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}