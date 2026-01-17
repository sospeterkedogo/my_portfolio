import { Code2, Database, Layout, Terminal } from "lucide-react";

const SKILLS = [
  {
    category: "Frontend Architecture",
    icon: <Layout className="w-4 h-4 text-blue-500" />,
    items: ["React", "Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js"]
  },
  {
    category: "Backend & Data",
    icon: <Database className="w-4 h-4 text-purple-500" />,
    items: ["Node.js", "PostgreSQL", "GraphQL", "Prisma", "Redis", "Supabase"]
  },
  {
    category: "DevOps & Cloud",
    icon: <Terminal className="w-4 h-4 text-green-500" />,
    items: ["AWS (EC2, S3)", "Docker", "CI/CD Pipelines", "Vercel", "Linux", "Git"]
  },
  {
    category: "Design & Tools",
    icon: <Code2 className="w-4 h-4 text-pink-500" />,
    items: ["Figma", "Adobe Suite", "Jest/Vitest", "Storybook", "Jira", "Agile"]
  }
];

export default function Technologies() {
  return (
    <section id="skills" className="py-32 bg-neutral-900 text-neutral-100 border-y border-neutral-800">
      <div className="max-w-[1920px] mx-auto px-6 md:px-24">

        {/* Section Header */}
        <div className="mb-20 flex flex-col md:flex-row justify-between items-end gap-6 border-b border-neutral-800 pb-8">
          <div>
            <span className="font-mono text-xs tracking-widest text-neutral-500 uppercase block mb-4">
              / 003 — Capabilities
            </span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
              Technical <br className="hidden md:block" /> Stack
            </h2>
          </div>
          <p className="font-mono text-sm text-neutral-500 max-w-sm text-right">
            A curated list of technologies I use to build apps.
          </p>
        </div>

        {/* The "Spec Sheet" Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {SKILLS.map((group, idx) => (
            <div key={idx} className="flex flex-col gap-6">

              {/* Category Label */}
              <div className="flex items-center gap-3 text-neutral-400">
                {group.icon}
                <h3 className="font-bold uppercase tracking-wider text-sm">
                  {group.category}
                </h3>
              </div>

              {/* The List */}
              <ul className="flex flex-col gap-3">
                {group.items.map((tech) => (
                  <li
                    key={tech}
                    className="text-xl md:text-2xl font-medium text-neutral-300 hover:text-white transition-colors cursor-default border-l-2 border-transparent hover:border-blue-500 pl-0 hover:pl-4 transition-all duration-200"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}