import { getProjectById } from "@/lib/admin/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github, ArrowUpRight } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  // Safe fallback for legacy field names if your DB schema varies
  const liveUrl = (project as any).live_url || (project as any).demo_url || null;
  const repoUrl = (project as any).github_url || (project as any).code_url || null;

  return (
    <main className="min-h-screen bg-[#e0e0e0] w-full text-neutral-900 selection:bg-blue-600 selection:text-white flex flex-col">
      
      {/* 1. HEADER SECTION */}
      <header className="px-6 md:px-24 pt-32 pb-12 border-b border-neutral-300">
        <div className="max-w-[1920px] mx-auto">
          {/* Back Navigation */}
          <Link 
            href="/projects" 
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-500 hover:text-black mb-12 group transition-colors"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
            Back to Archive
          </Link>

          {/* Title & Context */}
          <div className="flex flex-col md:flex-row justify-between items-end gap-12">
            <h1 className="text-[clamp(3rem,8vw,7rem)] font-black leading-[0.85] tracking-tighter uppercase max-w-4xl">
              {project.title}
            </h1>
            
            {/* Meta Table */}
            <div className="flex flex-col gap-4 min-w-[200px] mb-2 w-full md:w-auto">
               <div className="flex justify-between border-b border-neutral-400 pb-2">
                 <span className="font-mono text-xs text-neutral-500 uppercase">Year</span>
                 <span className="font-bold text-sm">2025</span>
               </div>
               <div className="flex justify-between border-b border-neutral-400 pb-2">
                 <span className="font-mono text-xs text-neutral-500 uppercase">Type</span>
                 <span className="font-bold text-sm">Engineering</span>
               </div>
            </div>
          </div>
        </div>
      </header>

      {/* 2. CINEMATIC HERO IMAGE */}
      {project.images && project.images.length > 0 && (
        <section className="w-full h-[50vh] md:h-[80vh] bg-neutral-300 relative overflow-hidden">
           <img 
             src={project.images[0]} 
             alt={project.title} 
             className="w-full h-full object-cover"
           />
        </section>
      )}

      {/* 3. PROJECT CONTENT GRID */}
      <article className="px-6 md:px-24 py-24 max-w-[1920px] mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
          
          {/* LEFT COLUMN: The "Spec Sheet" (Sticky on desktop) */}
          <div className="md:col-span-4 flex flex-col gap-12 h-fit md:sticky md:top-32">
            
            {/* Executive Summary */}
            {project.summary && (
              <p className="text-xl md:text-2xl font-medium leading-tight text-neutral-800">
                {project.summary}
              </p>
            )}

            {/* CTA Buttons - High Contrast */}
            <div className="flex flex-col gap-4">
               {liveUrl && (
                 <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between w-full p-4 border border-neutral-900 bg-neutral-900 text-white hover:bg-blue-600 hover:border-blue-600 transition-all group shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]">
                    <span className="font-mono text-sm uppercase tracking-widest font-bold">Launch Project</span>
                    <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                 </a>
               )}
               {repoUrl && (
                 <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between w-full p-4 border border-neutral-300 bg-white hover:border-neutral-900 transition-all group">
                    <span className="font-mono text-sm uppercase tracking-widest font-bold text-neutral-900">Source Code</span>
                    <Github size={18} className="text-neutral-900" />
                 </a>
               )}
            </div>

            {/* Tech Stack List */}
            <div className="pt-8 border-t border-neutral-300">
                <h3 className="font-mono text-xs text-neutral-500 uppercase tracking-widest mb-6">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                   {/* Dummy data if tags missing, replace with project.tags later */}
                   {["Next.js", "TypeScript", "Tailwind CSS", "Supabase"].map(tag => (
                      <span key={tag} className="px-3 py-1 border border-neutral-300 text-xs font-bold uppercase tracking-wide text-neutral-600 bg-white">
                        {tag}
                      </span>
                   ))}
                </div>
            </div>
          </div>

          {/* RIGHT COLUMN: The Narrative */}
          <div className="md:col-span-8">
             <div className="prose prose-lg prose-neutral max-w-none">
                <h3 className="font-black text-3xl mb-8 text-neutral-900 uppercase tracking-tight">The Brief</h3>
                <p className="whitespace-pre-wrap text-neutral-600 leading-relaxed text-lg">
                  {project.description || "No detailed description provided for this case study."}
                </p>
             </div>
          </div>

        </div>
      </article>

      {/* 4. GALLERY GRID (Remaining Images) */}
      {project.images && project.images.length > 1 && (
        <section className="px-6 md:px-24 pb-32 max-w-[1920px] mx-auto w-full">
           <h3 className="font-mono text-xs text-neutral-500 uppercase tracking-widest mb-12 border-t border-neutral-300 pt-8">
             / Visual Assets
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {project.images.slice(1).map((img, idx) => (
                 <div key={idx} className="aspect-[4/3] bg-neutral-200 relative overflow-hidden group border border-neutral-200">
                    <img 
                      src={img} 
                      alt={`Gallery Asset ${idx}`} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                 </div>
              ))}
           </div>
        </section>
      )}

    </main>
  );
}