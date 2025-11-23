"use client";

import { useForm } from "react-hook-form";
import { Blog } from "@/lib/types";
import { saveBlog, deleteBlogImage } from "@/lib/actions";
import { useState, useTransition } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Props {
  blog?: Blog | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function BlogForm({ blog, onSuccess, onCancel }: Props) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeletingImg, startTransition] = useTransition();
  const [coverUrl, setCoverUrl] = useState<string | null | undefined>(blog?.cover_url);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      title: blog?.title || "",
      content: blog?.content || "",
    },
  });

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      if (blog?.id) formData.append("id", blog.id);
      
      formData.append("title", data.title);
      formData.append("content", data.content);

      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput?.files?.[0]) {
        formData.append("cover_image", fileInput.files[0]);
      }

      await saveBlog(formData);
      toast.success(blog ? "Blog updated" : "Blog published");
      onSuccess();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveCover = () => {
    if (!blog?.id || !coverUrl) return;
    if (!confirm("Remove cover image?")) return;

    // Optimistic Update
    setCoverUrl(null);

    startTransition(async () => {
      try {
        await deleteBlogImage(blog.id, coverUrl);
        toast.success("Cover removed");
        router.refresh();
      } catch (e: any) {
        toast.error("Failed to remove cover");
        setCoverUrl(blog.cover_url); // Rollback
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-300">Blog Title</label>
        <input 
          {...register("title", { required: true })} 
          className="w-full bg-neutral-800 border border-neutral-700 rounded p-2.5 text-white focus:ring-2 focus:ring-blue-500 outline-none" 
          placeholder="Enter a catchy title..."
        />
        {errors.title && <span className="text-red-500 text-sm">Title is required</span>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-gray-300">Content</label>
        <textarea 
          {...register("content", { required: true })} 
          rows={10} 
          className="w-full bg-neutral-800 border border-neutral-700 rounded p-2.5 text-white focus:ring-2 focus:ring-blue-500 outline-none resize-y"
          placeholder="Write your thoughts..."
        />
        {errors.content && <span className="text-red-500 text-sm">Content is required</span>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-gray-300">Cover Image</label>
        
        {/* Existing Cover with Delete Option */}
        {coverUrl && (
          <div className="relative w-40 h-24 mb-3 group">
             <img src={coverUrl} alt="Cover" className="w-full h-full object-cover rounded border border-neutral-700" />
             <button
               type="button"
               disabled={isDeletingImg}
               onClick={handleRemoveCover}
               className="absolute top-1 right-1 bg-red-600 p-1 rounded text-white opacity-0 group-hover:opacity-100 transition-opacity"
               title="Remove Cover"
             >
               <Trash2 size={12} />
             </button>
          </div>
        )}

        <input type="file" accept="image/*" className="w-full bg-neutral-800 p-2 rounded text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700" />
        {coverUrl && <p className="text-xs text-gray-500 mt-2">Upload a new image to replace the current one.</p>}
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-neutral-800">
        <button type="button" onClick={onCancel} className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">
          Cancel
        </button>
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-medium flex items-center gap-2 transition-all"
        >
          {isSubmitting && <Loader2 className="animate-spin w-4 h-4" />}
          {blog ? "Update Blog" : "Publish Blog"}
        </button>
      </div>
    </form>
  );
}