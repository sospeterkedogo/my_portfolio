/**
 * Static blog/post content — easy to edit without touching UI components.
 *
 * HOW TO ADD A NEW POST
 * ──────────────────────
 * 1. Copy an existing entry below.
 * 2. Give it a unique `id` (URL-safe slug, e.g. "my-first-post").
 * 3. Fill in all required fields; `tags` and `cover_url` are optional.
 * 4. Put your Markdown body in `content` (or leave it short here and write
 *    the full post in the admin dashboard — whichever you prefer).
 * 5. Save — the post is live on the next deploy.
 *
 * Posts added via the admin dashboard (stored in Supabase) are merged with
 * these at runtime. Static posts here are a convenient zero-database option.
 */

export interface StaticPost {
  /** Unique URL-safe slug, e.g. "why-i-love-typescript" */
  id: string;
  title: string;
  /** Short description shown in listing cards */
  description?: string;
  /** Full post body (Markdown supported) */
  content: string;
  /** Public URL or /public-relative path for the cover image */
  cover_url?: string | null;
  /** ISO date string, e.g. "2024-05-01" */
  created_at: string;
  /** Free-form tags for filtering, e.g. ["TypeScript", "React", "Tutorial"] */
  tags?: string[];
}

export const staticPosts: StaticPost[] = [
  {
    id: "wcag-in-nextjs",
    title: "Building WCAG 2.2 AA Accessible UIs with Next.js",
    description:
      "A practical walk-through of the most impactful accessibility patterns — skip links, focus management, reduced motion, and semantic landmarks — in a real Next.js app.",
    content: `
# Building WCAG 2.2 AA Accessible UIs with Next.js

Accessibility is not a bolt-on feature — it's a design principle. Here's what I learned…

*(Full post coming soon)*
    `.trim(),
    cover_url: null,
    created_at: "2024-08-01",
    tags: ["Accessibility", "Next.js", "WCAG", "TypeScript"],
  },
  // ── Add your next post here ─────────────────────────────────────────────────
  // {
  //   id: "my-post-slug",
  //   title: "My New Post",
  //   description: "A short summary shown in the blog listing.",
  //   content: "Full post body here. Markdown is supported.",
  //   created_at: "2024-09-01",
  //   tags: ["React", "Tutorial"],
  // },
];
