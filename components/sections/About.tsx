import { ArrowRight } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="w-full px-6 md:px-24 py-32 grid grid-cols-1 md:grid-cols-12 gap-12">
      {/* Label */}
      <div className="md:col-span-3">
        <span className="font-mono text-xs tracking-widest uppercase text-neutral-500">/ 002 — About</span>
      </div>

      {/* Statement */}
      <div className="md:col-span-9 flex flex-col gap-10">
        <h2 className="text-3xl md:text-5xl font-bold leading-[1.1] tracking-tight">
          I build <span className="text-blue-600">high-performance systems</span> that scale without breaking.
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-neutral-600 leading-relaxed">
          <p>
            Most developers ship features. I design the systems that make those features fast, resilient, and maintainable at scale. From real-time collaboration layers to agent-orchestrated workflows and payment infrastructure — I work across the full stack with a bias for performance and reliability.
          </p>
          <div className="flex flex-col gap-4">
             <p>Currently based in Northampton, UK. Available for new opportunities.</p>
             <a href="/about" className="flex items-center gap-2 text-black font-bold uppercase text-sm group">
               Read Full Bio <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
             </a>
          </div>
        </div>
      </div>
    </section>
  );
}