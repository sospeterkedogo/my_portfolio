import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Project } from "@/lib/types";
import { Blog } from "@/lib/types";

// Fetch single project by ID
export async function getBlogById(id: string): Promise<Blog | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    console.error(`Error fetching blog post ${id}:`, error);
    return null;
  }

  // Flatten images
  return {
    ...data,
    images: data.blog_images 
      ? data.blog_images.map((img: { url: string }) => img.url) 
      : [],
  };
}

// Fetch single project by ID
export async function getProjectById(id: string): Promise<Project | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("projects")
    .select(`
      *,
      project_images (
        url
      )
    `)
    .eq("id", id)
    .single();

  if (error || !data) {
    console.error(`Error fetching project ${id}:`, error);
    return null;
  }

  // Flatten images
  return {
    ...data,
    images: data.project_images 
      ? data.project_images.map((img: { url: string }) => img.url) 
      : [],
  };
}


export async function getBlogs(): Promise<Blog[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(3); // Only fetch latest 3 for the home page

  if (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }

  return data as Blog[];
}

export async function getProjects(): Promise<Project[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("projects")
    .select(`
      *,
      project_images (
        url
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching projects:", error);
    return [];
  }

  // Flatten the awkward join structure into a clean string[]
  return data.map((p: any) => ({
    ...p,
    images: p.project_images 
      ? p.project_images.map((img: { url: string }) => img.url) 
      : [],
  }));
}

export async function fetchAdminDashboardData() {
  const supabase = await createClient(); // Ensure this is your Server Client creator

  // 1. Security Check (Server Side)
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    redirect("/login"); // Throws a NEXT_REDIRECT error, halting execution immediately
  }

  // 2. Parallel Fetching with Count Optimization
  // usage of head: true means we get the count but NOT the actual row data (saves bandwidth)
  const [
    projects, 
    blogs, 
    activities,
    messages, 
    testimonials, 
    skills, 
    certs
  ] = await Promise.all([
    supabase.from("projects").select("*", { count: "exact", head: true }),
    supabase.from("blogs").select("*", { count: "exact", head: true }),
    // We actually need data for activities, so no head: true here
    supabase
      .from("activity_log")
      .select("*")
      .order("timestamp", { ascending: false })
      .limit(10), 
    // Placeholders for now (assuming tables exist, otherwise remove)
    supabase.from("messages").select("*", { count: "exact", head: true }),
    supabase.from("testimonials").select("*", { count: "exact", head: true }),
    supabase.from("skills").select("*", { count: "exact", head: true }),
    supabase.from("certificates").select("*", { count: "exact", head: true }),
  ]);

  return {
    projectsCount: projects.count ?? 0,
    blogsCount: blogs.count ?? 0,
    messagesCount: messages.count ?? 0,
    testimonialsCount: testimonials.count ?? 0,
    skillsCount: skills.count ?? 0,
    certCount: certs.count ?? 0,
    activities: activities.data ?? [],
  };
}