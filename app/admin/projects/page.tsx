import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import ProjectsAdminClient from "./ProjectsAdminClient";

export default async function ProjectsAdminPage() {
  const supabase = await createClient();

  // ----------- Server-side auth check -----------
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/login");
  }

  // ----------- Fetch initial projects on server -----------
  const { data: projects, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching projects:", error);
  }

  // Pass projects to client component
  return <ProjectsAdminClient initialProjects={projects || []} />;
}
