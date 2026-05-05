/**
 * Static project content — easy to edit without touching UI components.
 *
 * HOW TO ADD A NEW PROJECT
 * ─────────────────────────
 * 1. Copy an existing entry below.
 * 2. Give it a unique `id` (URL-safe slug, e.g. "my-new-project").
 * 3. Fill in all required fields; optional fields can be omitted.
 * 4. Tags are free-form strings used for filtering — keep them consistent.
 * 5. Save the file — the change is live on your next `npm run dev` / deploy.
 *
 * No database changes required. Supabase-stored projects (added via the
 * admin dashboard) are merged with these at runtime; static content here
 * serves as the easy-to-edit fallback / seed.
 */

export interface StaticProject {
  /** Unique URL-safe slug, e.g. "portfolio-site" */
  id: string;
  title: string;
  description: string;
  /** Optional longer write-up shown on the detail page */
  summary?: string;
  /** Public image URLs or paths relative to /public */
  images?: string[];
  /** Live demo URL */
  live_url?: string;
  /** Source-code repository URL */
  github_url?: string;
  /** Free-form tags used for filtering, e.g. ["React", "TypeScript", "Open Source"] */
  tags?: string[];
  /** ISO date string, e.g. "2024-03-15" — used for sorting */
  created_at?: string;
}

export const staticProjects: StaticProject[] = [
  {
    id: "espeezy",
    title: "Espeezy",
    description:
      "A student-focused workspace platform combining task coordination, real-time collaboration, social presence, creator tools, marketplace flows, and Stripe-powered payments — built as a single cohesive Next.js application.",
    summary:
      "Full-stack platform with Liveblocks real-time collaboration, Supabase RLS-backed multi-tenancy, Stripe checkout/billing portal, Upstash Redis rate limiting, internal agent orchestration for task routing, and Playwright test coverage. Deployed on VPS with a hardened resilient deploy pipeline.",
    images: [],
    github_url: "https://github.com/sospeterkedogo/espeezysourcecode",
    tags: ["Next.js", "TypeScript", "Supabase", "Stripe", "Liveblocks", "Redis", "Playwright", "Agent Orchestration"],
    created_at: "2026-05-01",
  },
  {
    id: "portfolio-site",
    title: "Personal Portfolio",
    description:
      "A performance-first portfolio built with Next.js 15, Tailwind CSS 4, and Supabase. Designed to WCAG 2.2 AA standards with a data-driven content model.",
    summary:
      "This very site — rebuilt from the ground up with a focus on accessibility, performance, and maintainability.",
    images: [],
    github_url: "https://github.com/sospeterkedogo/my_portfolio",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Accessibility"],
    created_at: "2024-01-01",
  },
  // ── Add your next project here ──────────────────────────────────────────────
  // {
  //   id: "my-saas-app",
  //   title: "My SaaS App",
  //   description: "Short description visible in the project card.",
  //   live_url: "https://mysaas.example.com",
  //   github_url: "https://github.com/sospeterkedogo/my-saas",
  //   tags: ["React", "Node.js", "PostgreSQL"],
  //   created_at: "2024-06-01",
  // },
];
