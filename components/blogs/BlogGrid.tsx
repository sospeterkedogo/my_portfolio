import Link from "next/link";
import { getBlogs } from "@/lib/admin/data";
import { format } from "date-fns"; // Ensure date-fns is installed

export default async function BlogGrid() {
  const blogs = await getBlogs();

  if (!blogs || blogs.length === 0) {
    return <p className="text-neutral-500">No articles published yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {blogs.map((blog) => (
        <Link key={blog.id} href={`/blog/${blog.id}`} className="group cursor-pointer">
          <div className="bg-neutral-800 rounded-sm overflow-hidden border border-neutral-800 group-hover:border-neutral-600 transition-all h-full flex flex-col">
            {/* Cover Image */}
            <div className="h-48 bg-neutral-900 overflow-hidden relative">
              {blog.cover_url ? (
                <img
                  src={blog.cover_url}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-neutral-800 text-neutral-600">
                  No Cover
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-1">
              <div className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">
                {format(new Date(blog.created_at), "MMM d, yyyy")}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                {blog.title}
              </h3>
              <p className="text-neutral-400 text-sm line-clamp-3 flex-1">
                {blog.content}
              </p>
              
              <div className="mt-4 text-sm font-semibold text-white flex items-center gap-2 group-hover:gap-3 transition-all">
                Read Article <span>→</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}