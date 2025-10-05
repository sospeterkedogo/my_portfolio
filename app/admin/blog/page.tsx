import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import BlogsAdminClient from "./BlogsAdminClient";

type Blog = {
  id: string;
  title: string;
  content: string;
  cover_url?: string | null;
  created_at: string;
};

export default async function BlogsAdminPage() {
  const supabase = await createClient();

  // ----------- Server-side auth check -----------
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/login");
  }

  // ----------- Fetch blogs from Supabase -----------
  const { data: blogs, error } = await supabase
    .from<any, Blog>("blogs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return <p className="text-red-600 text-center mt-20">Failed to load blogs.</p>;
  }

  return <BlogsAdminClient blogs={blogs || []} />;
}
