export default function Technologies() {
  const domains = [
    {
      title: "Front End",
      stack: "React, Next.js, Tailwind, Framer Motion",
      bg: "/images/frontend.jpg", // Ensure these images exist in /public/images/
    },
    {
      title: "Backend",
      stack: "Node.js, Supabase, PostgreSQL, Prisma",
      bg: "/images/backend.jpg",
    },
    {
      title: "Mobile",
      stack: "React Native, Expo, Firebase",
      bg: "/images/mobile.jpg",
    },
    {
      title: "Cloud & DevOps",
      stack: "Vercel, Docker, CI/CD Pipelines",
      bg: "/images/cloud.jpg",
    },
  ];

  return (
    <section id="skills" className="relative w-full min-h-screen bg-[#1c1c1c] text-white">
      {/* Header Overlay */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 text-center z-20 w-full px-4 pointer-events-none">
        <h2 className="font-[var(--font-inter)] text-sm font-bold uppercase tracking-widest text-white/50">
          Capabilities
        </h2>
        <h3 className="text-3xl md:text-4xl font-bold tracking-tight">
          THINGS I DO
        </h3>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 h-screen h-full pt-40 sm:pt-0">
        {domains.map((item, idx) => (
          <div key={idx} className="relative h-full group overflow-hidden">
            {/* Background Image with Parallax/Zoom Effect */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url('${item.bg}')` }}
            />
            
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 group-hover:from-black/80 transition-colors" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 w-full p-8 text-center z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <h4 className="text-2xl font-bold uppercase mb-2 tracking-wider">
                {item.title}
              </h4>
              <p className="text-sm text-gray-300 font-light opacity-80 group-hover:opacity-100">
                {item.stack}
              </p>
              {/* Decorative Line */}
              <div className="w-12 h-0.5 bg-blue-500 mx-auto mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}