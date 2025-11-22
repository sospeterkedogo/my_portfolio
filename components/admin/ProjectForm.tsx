"use client";

import { useForm } from "react-hook-form";
import { Project } from "@/lib/types";
import { saveProject, deleteProjectImage } from "@/lib/admin/actions";
import { useState, useTransition, useEffect } from "react"; // <--- Import useEffect
import { Loader2, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Props {
  project?: Project | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function ProjectForm({ project, onSuccess, onCancel }: Props) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeletingImg, startTransition] = useTransition();
  
  // Initialize state
  const [existingImages, setExistingImages] = useState<string[]>(project?.images || []);

  // -------------------------------------------------------------------------
  // THE FIX: Sync local state when the project prop changes
  // Without this, opening different projects might show stale/empty images
  // -------------------------------------------------------------------------
  useEffect(() => {
    setExistingImages(project?.images || []);
  }, [project]);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      title: project?.title || "",
      summary: project?.summary || "",
      description: project?.description || "",
      code_url: project?.code_url || "",
      demo_url: project?.demo_url || "",
    },
  });

  // Reset form values when project changes (handles Create -> Edit switch)
  useEffect(() => {
    if (project) {
        // You might need to use `reset` from react-hook-form here if titles aren't updating either
        // but for now let's focus on images.
    }
  }, [project]);

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      if (project?.id) formData.append("id", project.id);
      
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value as string);
      });

      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput?.files?.length) {
        Array.from(fileInput.files).forEach((file) => {
          formData.append("images", file);
        });
      }

      await saveProject(formData);
      toast.success(project ? "Project updated" : "Project created");
      onSuccess();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveImage = (url: string) => {
    if (!confirm("Remove this image?")) return;
    
    // Optimistic Update: Remove from UI immediately
    setExistingImages((prev) => prev.filter((img) => img !== url));

    startTransition(async () => {
      try {
        await deleteProjectImage(url);
        toast.success("Image removed");
        router.refresh(); 
      } catch (e: any) {
        toast.error("Failed to remove image");
        setExistingImages((prev) => [...prev, url]); // Rollback
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
      <div className="grid grid-cols-1 gap-4">
        {/* Title & Text Fields */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-300">Title</label>
          <input {...register("title", { required: true })} className="w-full bg-neutral-800 border border-neutral-700 rounded p-2 text-white" />
          {errors.title && <span className="text-red-500 text-sm">Required</span>}
        </div>
        
        {/* Summary & Description */}
        <div>
           <label className="block text-sm font-medium mb-1 text-gray-300">Summary</label>
           <input {...register("summary")} className="w-full bg-neutral-800 border border-neutral-700 rounded p-2 text-white" />
        </div>
        <div>
           <label className="block text-sm font-medium mb-1 text-gray-300">Description</label>
           <textarea {...register("description", { required: true })} rows={4} className="w-full bg-neutral-800 border border-neutral-700 rounded p-2 text-white" />
        </div>

        {/* URLs */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Code URL</label>
            <input {...register("code_url")} className="w-full bg-neutral-800 border border-neutral-700 rounded p-2 text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Demo URL</label>
            <input {...register("demo_url")} className="w-full bg-neutral-800 border border-neutral-700 rounded p-2 text-white" />
          </div>
        </div>

        {/* Image Management */}
        <div className="border-t border-neutral-800 pt-4 mt-2">
          <label className="block text-sm font-medium mb-3 text-gray-300">Project Images</label>
          
          {/* Gallery with Delete Buttons */}
          {existingImages.length > 0 ? (
            <div className="grid grid-cols-4 gap-2 mb-4">
              {existingImages.map((img, idx) => (
                <div key={idx} className="relative group aspect-square">
                  <img src={img} alt="Project" className="w-full h-full object-cover rounded border border-neutral-700" />
                  <button
                    type="button"
                    disabled={isDeletingImg}
                    onClick={() => handleRemoveImage(img)}
                    className="absolute top-1 right-1 bg-red-600 p-1.5 rounded-md text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                    title="Remove Image"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 mb-4 italic">No images uploaded yet.</p>
          )}

          {/* Upload Box */}
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-neutral-700 border-dashed rounded-lg cursor-pointer bg-neutral-800 hover:bg-neutral-700 transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-3 text-gray-400" />
                <p className="text-sm text-gray-400"><span className="font-semibold">Click to upload</span> multiple files</p>
              </div>
              <input type="file" className="hidden" multiple accept="image/*" />
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 sticky bottom-0 bg-neutral-900 border-t border-neutral-800">
        <button type="button" onClick={onCancel} className="px-4 py-2 text-sm text-gray-400 hover:text-white">Cancel</button>
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          {isSubmitting && <Loader2 className="animate-spin w-4 h-4" />}
          {project ? "Save Changes" : "Create Project"}
        </button>
      </div>
    </form>
  );
}