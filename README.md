This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## Updating Projects and Blog

Projects and blog posts can be edited in **two ways** — pick whichever is easiest for you:

### Option A — Static content files (no database required)

Edit `content/projects.ts` to add or update projects, and `content/posts.ts` to add or update posts. Both files are plain TypeScript with clear comments.

**Adding a new project:**

```ts
// content/projects.ts
{
  id: "my-new-project",          // URL-safe slug — must be unique
  title: "My New Project",
  description: "Short description shown in the project card.",
  live_url: "https://my-app.example.com",    // optional
  github_url: "https://github.com/me/repo",  // optional
  tags: ["React", "TypeScript"],             // used for filtering
  created_at: "2024-06-01",
}
```

**Adding a new blog post:**

```ts
// content/posts.ts
{
  id: "my-post-slug",
  title: "My New Post",
  description: "Short summary shown in the listing.",
  content: "Full post body here. Markdown is supported.",
  created_at: "2024-09-01",
  tags: ["React", "Tutorial"],
}
```

> **Rule:** save the file, and the change is live on the next `npm run dev` / deploy. No database migration needed.

### Option B — Admin dashboard (Supabase)

Log in at `/login` and use the admin dashboard to create, edit, or delete projects and posts. These are stored in Supabase and take priority over the static files when both are present.

---

## Accessibility

This project targets **WCAG 2.2 Level AA** compliance. Key practices:

| Area | Implementation |
|------|---------------|
| Semantic landmarks | `<header>`, `<nav>`, `<main id="main-content">`, `<footer>`, `<section>` used correctly throughout |
| Heading hierarchy | Single `<h1>` per page; sub-headings follow a logical `h2 → h3` order |
| Skip link | "Skip to main content" link is the first focusable element — visible only on keyboard focus |
| Keyboard navigation | All interactive elements reachable and operable via keyboard; no keyboard traps |
| Focus indicators | Consistent `focus-visible` ring (2 px blue, 2 px offset) on all interactive elements |
| Touch targets | Minimum 44 × 44 px for all buttons and icon links |
| Accessible names | All icon-only buttons/links have `aria-label`; decorative icons have `aria-hidden="true"` |
| Reduced motion | `useReducedMotion()` (Framer Motion) and a global `prefers-reduced-motion` CSS rule disable decorative animations for users who prefer them |
| Color contrast | Body text on background colours meets the 4.5 : 1 ratio; interactive text meets 3 : 1 |
| Images | Content images have descriptive `alt` text; decorative images use `alt=""` |
| Language | `<html lang="en">` set in the root layout |
| Page title | Each route has a descriptive `<title>` via Next.js Metadata API |

### Running accessibility checks locally

```bash
# Install axe DevTools browser extension for manual testing
# https://www.deque.com/axe/devtools/

# Or run a quick Lighthouse audit from Chrome DevTools → Lighthouse → Accessibility
```

---

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/)

## Deploy on Vercel

The easiest way to deploy is the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).
