import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import BlogsClient from "./client"; // Importing the client view

export default async function BlogsAdminPage() {
  const supabase = await createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) redirect("/login");

  const { data: blogs, error } = await supabase
    .from("blogs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching blogs:", error);
    // Optionally render an error state component
  }

  return <BlogsClient blogs={blogs || []} />;
}