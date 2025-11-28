import { getBlogById } from "@/lib/admin/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { format } from "date-fns";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function BlogDetailsPage({ params }: PageProps) {
  // 1. Await params (Next.js 15 pattern)
  const { id } = await params;

  // 2. Fetch on Server
  const blog = await getBlogById(id);

  if (!blog) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#e0e0e0] w-full text-neutral-900 selection:bg-blue-600 selection:text-white flex flex-col">
      
      {/* 1. PROGRESS / HEADER AREA */}
      <header className="px-6 md:px-24 pt-32 pb-12 border-b border-neutral-300">
        <div className="max-w-[1920px] mx-auto">
          
          {/* Back Navigation */}
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-500 hover:text-black mb-12 group transition-colors"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
            Back to Insights
          </Link>

          {/* Title & Meta Grid */}
          <div className="flex flex-col gap-8">
            <h1 className="text-[clamp(3rem,6vw,6rem)] font-black leading-[0.9] tracking-tighter uppercase max-w-5xl">
              {blog.title}
            </h1>
            
            {/* Meta Data Row */}
            <div className="flex flex-wrap items-center gap-8 md:gap-16 font-mono text-xs text-neutral-500 uppercase tracking-widest border-t border-neutral-300 pt-6 mt-4 w-fit">
               <div className="flex items-center gap-2">
                 <Calendar size={14} />
                 <span>{format(new Date(blog.created_at), "MMMM dd, yyyy")}</span>
               </div>
               
               {/* Optional: Reading time calculation if you want to be fancy */}
               <div className="flex items-center gap-2">
                 <Clock size={14} />
                 <span>{Math.ceil(blog.content.length / 1000)} Min Read</span>
               </div>

               <div className="flex items-center gap-2 text-blue-600 font-bold">
                 <span>/ Engineering</span>
               </div>
            </div>
          </div>
        </div>
      </header>

      {/* 2. HERO IMAGE (Conditional) */}
      {blog.cover_url && (
        <section className="w-full h-[40vh] md:h-[60vh] bg-neutral-300 relative overflow-hidden">
           <img 
             src={blog.cover_url} 
             alt={blog.title} 
             className="w-full h-full object-cover"
           />
        </section>
      )}

      {/* 3. EDITORIAL CONTENT */}
      <article className="px-6 md:px-24 py-24 w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
           
           {/* Left Sidebar: Table of Contents or Share (Sticky) */}
           <div className="hidden md:flex md:col-span-3 flex-col gap-8 sticky top-32 h-fit text-neutral-500">
              <span className="font-mono text-xs uppercase tracking-widest border-b border-neutral-300 pb-2">
                 Share this article
              </span>
              <div className="flex flex-col gap-4 font-bold text-sm">
                 <button className="text-left hover:text-blue-600 transition-colors">X / Twitter</button>
                 <button className="text-left hover:text-blue-600 transition-colors">LinkedIn</button>
                 <button className="text-left hover:text-blue-600 transition-colors">Copy Link</button>
              </div>
           </div>

           {/* Center Column: The Text */}
           {/* prose-lg for readability, prose-neutral to match theme */}
           <div className="col-span-1 md:col-span-7 md:col-start-5">
              <div className="prose prose-lg prose-neutral max-w-none text-neutral-800 leading-relaxed prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline">
                 {/* Note: If your content is Markdown/HTML, use a parser here.
                    For simple text (like your example), whitespace-pre-line is okay,
                    but dangerouslySetInnerHTML is needed for rich text.
                 */}
                 <div className="whitespace-pre-line">
                    {blog.content}
                 </div>
              </div>

              {/* Author Signature */}
              <div className="mt-20 pt-12 border-t border-neutral-300 flex items-center gap-4">
                 <div className="w-12 h-12 bg-neutral-900 rounded-full"></div>
                 <div>
                    <p className="font-bold text-sm uppercase tracking-wide">Sospeter</p>
                    <p className="font-mono text-xs text-neutral-500">Full-Stack Engineer</p>
                 </div>
              </div>
           </div>

        </div>
      </article>

    </main>
  );
}