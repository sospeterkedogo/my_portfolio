import { getProjectById } from "@/lib/admin/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectDetailsPage({ params }: PageProps) {
  // 1. Await params (Next.js 15 requirement)
  const { id } = await params;

  // 2. Fetch data
  const project = await getProjectById(id);

  // 3. Handle 404
  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#1c1c1c] text-white py-24 px-6">
      <article className="max-w-5xl mx-auto">
        {/* Back Link */}
        <Link 
          href="/projects" 
          className="inline-flex items-center gap-2 text-neutral-400 hover:text-white mb-8 transition-colors text-sm font-medium"
        >
          <ArrowLeft size={16} /> Back to Projects
        </Link>

        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white tracking-tight">
            {project.title}
          </h1>
          
          {project.summary && (
            <p className="text-xl text-neutral-400 max-w-3xl leading-relaxed mb-8">
              {project.summary}
            </p>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            {project.demo_url && (
              <a
                href={project.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-500 text-white rounded-sm font-semibold transition-all"
              >
                Live Demo <ExternalLink size={18} />
              </a>
            )}
            {project.code_url && (
              <a
                href={project.code_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-white rounded-sm font-semibold transition-all"
              >
                View Code <Github size={18} />
              </a>
            )}
          </div>
        </header>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Left Column: Description */}
          <div className="lg:col-span-2 space-y-8">
            <div className="prose prose-invert prose-lg max-w-none text-neutral-300">
              <h3 className="text-2xl font-bold text-white mb-4">About this project</h3>
              <p className="whitespace-pre-wrap leading-relaxed">
                {project.description}
              </p>
            </div>
          </div>

          {/* Right Column: Tech Stack / Meta (Optional placeholder for now) */}
          <div className="bg-neutral-900/50 p-6 rounded-sm border border-neutral-800 h-fit">
            <h4 className="text-sm font-bold uppercase tracking-wider text-neutral-500 mb-4">
              Project Details
            </h4>
            <div className="space-y-4 text-sm">
              <div>
                <span className="block text-neutral-400">Timeline</span>
                <span className="text-white">2024</span>
              </div>
              <div>
                <span className="block text-neutral-400">Type</span>
                <span className="text-white">Full Stack Application</span>
              </div>
              {/* You can add a 'technologies' column to your DB later */}
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        {project.images && project.images.length > 0 && (
          <section className="mt-20">
            <h3 className="text-2xl font-bold text-white mb-8 border-b border-neutral-800 pb-4">
              Project Gallery
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.images.map((img, idx) => (
                <div 
                  key={idx} 
                  className={`relative overflow-hidden rounded-sm border border-neutral-800 bg-neutral-900 shadow-2xl ${
                    idx === 0 ? "md:col-span-2 aspect-video" : "aspect-video"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${project.title} screenshot ${idx + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </section>
        )}
      </article>
    </main>
  );
}