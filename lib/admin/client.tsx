"use client";

import { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash, X } from "lucide-react";
import { Project } from "@/lib/types";
import { deleteProject } from "@/lib/admin/actions";
import ProjectForm from "@/components/admin/ProjectForm";
import { toast } from "sonner";

// Ideally, move this to components/ui/Modal.tsx so you don't duplicate it in every file
const Modal = ({ isOpen, onClose, title, children }: any) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
        <div className="flex justify-between items-center p-5 border-b border-neutral-800 bg-neutral-900">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors"><X size={20} /></button>
        </div>
        <div className="p-6 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default function ProjectsAdminClient({ initialProjects = [] }: { initialProjects?: Project[] }) {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isPending, startTransition] = useTransition();

  // CRITICAL: Syncs local state when the Server Action triggers a revalidatePath
  useEffect(() => {
    if (initialProjects) setProjects(initialProjects);
  }, [initialProjects]);

  const handleCreate = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project? This will also remove all associated images.")) return;
    
    // Optimistic UI Update
    const previous = projects;
    setProjects(prev => prev.filter(p => p.id !== id));
    
    startTransition(async () => {
      try {
        await deleteProject(id);
        toast.success("Project deleted");
        router.refresh();
      } catch (e) {
        toast.error("Failed to delete");
        setProjects(previous); // Rollback
      }
    });
  };

  return (
    <main className="mx-auto p-6 bg-neutral-900 min-h-screen text-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Manage Projects</h1>
        <button 
          onClick={handleCreate} 
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold shadow transition-colors"
        >
          <Plus size={18} /> Add New
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-20 bg-neutral-800/50 rounded-xl border border-neutral-800">
          <p className="text-gray-400">No projects found.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <div key={p.id} className="bg-neutral-800 rounded-xl border border-neutral-700 flex flex-col overflow-hidden group hover:border-neutral-600 transition-all">
              {/* Image Preview */}
              <div className="h-48 bg-neutral-900 relative border-b border-neutral-700">
                {p.images && p.images.length > 0 ? (
                  <img 
                    src={p.images[0]} 
                    alt={p.title} 
                    className="w-full h-full object-cover" 
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-neutral-600 bg-neutral-800">
                    <span className="text-sm">No Image</span>
                  </div>
                )}
                
                {/* Badge for multiple images */}
                {p.images && p.images.length > 1 && (
                   <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-md px-2 py-1 rounded text-xs text-white font-medium border border-white/10">
                      +{p.images.length - 1} more
                   </div>
                )}
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-bold text-lg mb-2 truncate text-gray-100">{p.title}</h3>
                <p className="text-gray-400 text-sm line-clamp-2 mb-4 flex-1">
                  {p.description}
                </p>
                
                <div className="flex gap-2 pt-4 border-t border-neutral-700/50 mt-auto">
                  <button 
                    onClick={() => handleEdit(p)} 
                    className="flex-1 flex items-center justify-center gap-2 bg-neutral-700 hover:bg-neutral-600 text-gray-200 py-2 rounded text-sm transition-colors font-medium"
                  >
                    <Pencil size={14} /> Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(p.id)} 
                    className="flex-1 flex items-center justify-center gap-2 bg-red-900/20 text-red-400 hover:bg-red-900/40 border border-red-900/30 py-2 rounded text-sm transition-colors font-medium"
                  >
                    <Trash size={14} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={editingProject ? "Edit Project" : "New Project"}
      >
        <ProjectForm 
          project={editingProject} 
          onCancel={() => setIsModalOpen(false)}
          onSuccess={() => {
             setIsModalOpen(false);
             router.refresh();
          }}
        />
      </Modal>
    </main>
  );
}