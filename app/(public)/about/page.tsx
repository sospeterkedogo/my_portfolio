export default function AboutPage() {
  return (
    <section
      id="about"
      className="w-full max-w-7xl mx-auto px-6 bg-white py-12"
    >
      <div>
        <h2 className="font-[var(--font-inter)] text-1xl font-bold text-gray uppercase tracking-wide opacity-30">
          SOSPETER KEDOGO
        </h2>
        <h2 className="font-[var(--font-inter)] text-3xl font-bold mb-3 text-gray opacity-60">
          ABOUT ME
        </h2>
        <p className="mb-4 text-md text-gray opacity-70">
          I build practical, reliable software with a focus on TypeScript, React, Next.js, and modern backend tools. Most of my work sits at the intersection of clean interfaces and well-structured systems: real-time collaboration, data-rich dashboards, mobile workflows, and integrations that make different services actually talk to each other.
        </p>

        <p className="mb-4 text-md text-gray opacity-70">
          I enjoy taking messy requirements or scattered data sources and turning them into something predictable, scalable, and easy to use. Whether it’s an ETL pipeline feeding a dashboard, a mobile app coordinating multiple user roles, or a full-stack product with real-time updates, I’m drawn to projects where thoughtful engineering improves everyday work.
        </p>

        <p className="mb-4 text-md text-gray opacity-70">
          I’ve delivered front-end systems, backend services, and mobile features that handle real workflows used by actual teams. I care about performance, clarity, and maintainability, and I put a lot of effort into building systems that stay stable as they grow.
        </p>

        <p className="mb-4 text-md text-gray opacity-70">
          My goal is simple: ship software that works well, feels good to use, and solves real operational problems for people who depend on it.
        </p>

      </div>
    </section>
  );
}
