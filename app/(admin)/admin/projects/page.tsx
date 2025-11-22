import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import ProjectsAdminClient from "@/lib/admin/client";
import { getProjects } from "@/lib/admin/data";

export default async function ProjectsAdminPage() {
  const supabase = await createClient();

  // 1. Server-side Auth Check
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    redirect("/login");
  }

  // 2. Fetch Data (DRY: Reusing the same logic as the main site)
  // This function already handles the 'project_images' join and flattening
  const projects = await getProjects();

  // 3. Render Client
  return <ProjectsAdminClient initialProjects={projects || []} />;
}