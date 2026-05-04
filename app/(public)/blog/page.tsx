import Link from "next/link";
import { getBlogs } from "@/lib/admin/data";
import { format } from "date-fns";
import { ArrowUpRight } from "lucide-react";

export const metadata = {
    title: "Insights | Sospeter",
    description: "Thoughts on engineering, design, and full-stack development.",
};

export default async function BlogPage() {
    const blogs = await getBlogs();

    return (
        <main id="main-content" className="bg-[#e0e0e0] min-h-screen flex flex-col w-full text-neutral-900 selection:bg-blue-600 selection:text-white">

            {/* PAGE HEADER */}
            <header className="px-6 md:px-24 pt-32 pb-20 border-b border-neutral-300">
                <div className="max-w-4xl">
                    <span className="font-mono text-xs tracking-widest uppercase text-neutral-500 mb-4 block">
                        / 005 — The Archive
                    </span>
                    <h1 className="text-[clamp(4rem,10vw,8rem)] font-black leading-[0.85] tracking-tighter uppercase mb-8">
                        Blog
                    </h1>
                    <p className="text-xl text-neutral-600 max-w-2xl leading-relaxed">
                        A collection of my thoughts on engineering, design, and full-stack development.
                    </p>
                </div>
            </header>

            {/* THE ARCHIVE GRID */}
            <section className="px-6 md:px-24 py-20 min-h-[50vh]">
                {!blogs || blogs.length === 0 ? (
                    <p className="font-mono text-neutral-500">No entries found in the archive.</p>
                ) : (
                    <div className="grid grid-cols-1 gap-12">
                        {blogs.map((blog) => (
                            <ArticleRow key={blog.id} blog={blog} />
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}

// Sub-component for a cleaner file
function ArticleRow({ blog }: { blog: any }) {
    return (
        <Link
            href={`/blog/${blog.id}`}
            className="group block border-t border-neutral-300 pt-8 hover:pl-4 transition-all duration-300"
        >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">

                {/* Date Column */}
                <div className="md:col-span-2">
                    <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">
                        {format(new Date(blog.created_at), "MMM dd, yyyy")}
                    </span>
                </div>

                {/* Content Column */}
                <div className="md:col-span-8">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 group-hover:text-blue-700 transition-colors">
                        {blog.title}
                    </h2>
                    <p className="text-neutral-600 leading-relaxed max-w-2xl line-clamp-2">
                        {/* Fallback to simple description if content is rich text */}
                        {blog.description || "No preview available for this entry."}
                    </p>
                </div>

                {/* Action Column */}
                <div className="md:col-span-2 flex justify-end">
                    <div className="w-12 h-12 rounded-full border border-neutral-300 flex items-center justify-center group-hover:bg-neutral-900 group-hover:text-white transition-all">
                        <ArrowUpRight size={20} />
                    </div>
                </div>
            </div>
        </Link>
    )
}