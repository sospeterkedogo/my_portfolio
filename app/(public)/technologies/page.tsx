export default function TechnologiesPage() {
  return (
    <section id="skills" className="relative w-full h-screen bg-gray-900">
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 text-center z-20">
        <h2 className="font-[var(--font-inter)] text-sm font-bold uppercase tracking-widest text-white/50">
          CAPABILITIES
        </h2>
        <h2 className="font-[var(--font-inter)] text-3xl font-bold text-white">
          THINGS I DO
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 h-full pt-40 sm:pt-0">


        <div
          className="relative h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/images/frontend.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white text-center z-10">
            <h3 className="text-xl font-bold uppercase">Front End</h3>
            <p className="text-sm">React, Next.js, UI Design</p>
          </div>
        </div>

        <div
          className="relative h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/images/backend.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white text-center z-10">
            <h3 className="text-xl font-bold uppercase">Backend</h3>
            <p className="text-sm">Node.js, Express, PostgreSQL, Prisma</p>
          </div>
        </div>

        <div
          className="relative h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/images/mobile.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white text-center z-10">
            <h3 className="text-xl font-bold uppercase">Mobile Development</h3>
            <p className="text-sm">React Native, Firebase, Cloud Functions</p>
          </div>
        </div>

        <div
          className="relative h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/images/cloud.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white text-center z-10">
            <h3 className="text-xl font-bold uppercase">Cloud</h3>
            <p className="text-sm">Supabase, Vercel, CI/CD, Docker</p>
          </div>
        </div>
      </div>
    </section>
  );
}
