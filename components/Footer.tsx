import Link from "next/link";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#111] border-t border-white/10 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand & Status */}
          <div className="col-span-1 md:col-span-2 space-y-6">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-black text-white tracking-tighter">
                SOSPETER<span className="text-blue-500">.</span>
              </span>
            </Link>
            
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Crafting digital experiences with precision and passion. 
              Focused on building accessible, performant, and scalable web applications.
            </p>

            {/* Status Indicator */}
            <div className="flex items-center gap-2 text-sm font-medium text-green-400">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              Available for new opportunities
            </div>
          </div>

          {/* Column 2: Sitemap */}
          <div className="space-y-4">
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">
              Navigation
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link href="/projects" className="hover:text-blue-400 transition-colors">Work</Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-blue-400 transition-colors">About</Link>
              </li>
              <li>
                <Link href="/#skills" className="hover:text-blue-400 transition-colors">Capabilities</Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-blue-400 transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Connect */}
          <div className="space-y-4">
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">
              Connect
            </h4>
            <div className="flex gap-4">
              <a 
                href="https://github.com/sospeterkedogo" 
                target="_blank" 
                rel="noreferrer"
                className="p-2 bg-white/5 rounded-full hover:bg-blue-600 hover:text-white transition-all text-gray-400"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a 
                href="https://www.linkedin.com/in/sospeter-kedogo/" 
                target="_blank" 
                rel="noreferrer"
                className="p-2 bg-white/5 rounded-full hover:bg-blue-600 hover:text-white transition-all text-gray-400"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a 
                href="/" 
                target="_blank" 
                rel="noreferrer"
                className="p-2 bg-white/5 rounded-full hover:bg-blue-600 hover:text-white transition-all text-gray-400"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a 
                href="mailto:kedogosospeter36@email.com" 
                className="p-2 bg-white/5 rounded-full hover:bg-blue-600 hover:text-white transition-all text-gray-400"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Sospeter Kedogo. All rights reserved.
          </p>
          
          <p className="text-xs text-gray-600 flex items-center gap-1">
            Built with <span className="text-white font-medium">Next.js</span> & <span className="text-white font-medium">Supabase</span>
          </p>
        </div>
      </div>
    </footer>
  );
}