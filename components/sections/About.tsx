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
          I bridge the gap between <span className="text-blue-600">engineering logic</span> and <span className="text-blue-600">creative design</span>.
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-neutral-600 leading-relaxed">
          <p>
            Most developers stop at functionality. I believe the code is only as good as the experience it powers. With a background in full-stack engineering and a relentless eye for detail, I build scalable systems that feel human.
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