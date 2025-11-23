"use client";

import { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import { Plus, Pencil, Trash, X, Calendar } from "lucide-react";
import { Blog } from "@/lib/types";
import { deleteBlog } from "@/lib/actions"; 
import BlogForm from "@/app/(admin)/components/BlogForm"; 
import { toast } from "sonner";
import { format } from "date-fns";

// Reusing the Modal (Ideally move this to components/ui/Modal.tsx)
const Modal = ({ isOpen, onClose, title, children }: any) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-5 border-b border-neutral-800 sticky top-0 bg-neutral-900 z-10">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors"><X size={20} /></button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default function BlogsAdminClient({ blogs: initialBlogs = [] }: { blogs?: Blog[] }) {
  const router = useRouter(); 
  // Default to empty array if initialBlogs is undefined to prevent crashes
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [isPending, startTransition] = useTransition();

  // ---------------------------------------------------------
  // CRITICAL FIX: Sync local state when Server sends new data
  // ---------------------------------------------------------
  useEffect(() => {
    if (initialBlogs) {
      setBlogs(initialBlogs);
    }
  }, [initialBlogs]);

  const handleCreate = () => {
    setEditingBlog(null);
    setIsModalOpen(true);
  };

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Irreversible action. Delete this blog?")) return;

    const previousBlogs = blogs;
    setBlogs((prev) => prev.filter((b) => b.id !== id)); // Optimistic UI update

    startTransition(async () => {
      try {
        await deleteBlog(id);
        toast.success("Blog deleted");
        router.refresh(); // Refresh server cache to be safe
      } catch (e) {
        toast.error("Failed to delete");
        setBlogs(previousBlogs); // Rollback on error
      }
    });
  };

  return (
    <main className="mx-auto p-6 bg-neutral-900 min-h-screen text-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Manage Blogs</h1>
        <button 
          onClick={handleCreate} 
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold shadow transition-colors"
        >
          <Plus size={18} /> New Post
        </button>
      </div>

      {blogs.length === 0 ? (
        <div className="text-center py-20 bg-neutral-800/50 rounded-xl border border-neutral-800">
          <p className="text-gray-400">No blogs found. Time to write something!</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {blogs.map((blog) => (
            <div key={blog.id} className="bg-neutral-800 p-5 rounded-xl border border-neutral-700/50 shadow-sm flex flex-col sm:flex-row gap-6 items-start">
              
              {/* Thumbnail */}
              {blog.cover_url ? (
                <img
                  src={blog.cover_url}
                  alt={blog.title}
                  className="w-full sm:w-48 h-32 object-cover rounded-lg border border-neutral-700 shrink-0"
                />
              ) : (
                <div className="w-full sm:w-48 h-32 bg-neutral-700 rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-neutral-500 text-sm">No Cover</span>
                </div>
              )}

              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-bold text-gray-100 mb-2 truncate">{blog.title}</h2>
                
                {/* Truncated Content */}
                <p className="text-gray-400 text-sm line-clamp-2 mb-3">
                  {blog.content}
                </p>
                
                <div className="flex items-center gap-4 text-xs text-gray-500">
                   <span className="flex items-center gap-1">
                     <Calendar size={12} />
                     {/* Safe date formatting with fallback */}
                     {blog.created_at ? format(new Date(blog.created_at), "MMM d, yyyy") : "No date"}
                   </span>
                   <span>•</span>
                   <span>{Math.ceil(blog.content.length / 500)} min read</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex sm:flex-col gap-2 shrink-0">
                <button 
                  onClick={() => handleEdit(blog)} 
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-neutral-700 hover:bg-neutral-600 text-white text-sm font-medium transition-colors"
                >
                  <Pencil size={16} /> Edit
                </button>
                <button 
                  onClick={() => handleDelete(blog.id)} 
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-900/20 hover:bg-red-900/40 text-red-400 border border-red-900/30 text-sm font-medium transition-colors"
                >
                  <Trash size={16} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingBlog ? "Edit Blog Post" : "Write New Post"}
      >
        <BlogForm 
          blog={editingBlog} 
          onCancel={() => setIsModalOpen(false)}
          onSuccess={() => {
             setIsModalOpen(false);
             // router.refresh(); // Uncomment in production
          }}
        />
      </Modal>
    </main>
  );
}