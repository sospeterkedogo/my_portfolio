export default function About() {
  return (
    <section id="about" className="w-full py-24 px-6 bg-white text-neutral-900">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 border-l-4 border-gray-600 pl-6">
          <h2 className="font-[var(--font-inter)] text-1xl font-bold text-gray uppercase tracking-wide opacity-30">
          Sospeter Kedogo
        </h2>
        <h3 className="font-[var(--font-inter)] text-3xl font-bold mb-3 text-gray opacity-60">
          About Me
        </h3>
        </div>

        <div className="space-y-6 text-lg leading-relaxed text-neutral-600">
          <p>
            I build practical, reliable software with a focus on <strong className="text-neutral-900">TypeScript, React, Next.js</strong>, and modern backend tools. Most of my work sits at the intersection of clean interfaces and well-structured systems: real-time collaboration, data-rich dashboards, and mobile workflows.
          </p>

          <p>
            I enjoy taking messy requirements or scattered data sources and turning them into something predictable, scalable, and easy to use. Whether it’s an ETL pipeline feeding a dashboard or a full-stack product with real-time updates, I’m drawn to projects where <span className="italic">thoughtful engineering</span> improves everyday work.
          </p>

          <p>
            My goal is simple: ship software that works well, feels good to use, and solves real operational problems for people who depend on it.
          </p>
        </div>
      </div>
    </section>
  );
}