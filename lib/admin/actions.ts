"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// ------------------------------------------------------------------
// Project Actions
// ------------------------------------------------------------------

const ProjectSchema = z.object({
  title: z.string().min(1),
  summary: z.string().optional(),
  description: z.string().min(1),
  code_url: z.string().url().optional().or(z.literal("")),
  demo_url: z.string().url().optional().or(z.literal("")),
});

export async function saveProject(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const id = formData.get("id") as string | null;
  const rawData = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    description: formData.get("description"),
    code_url: formData.get("code_url"),
    demo_url: formData.get("demo_url"),
  };

  const validated = ProjectSchema.parse(rawData);
  let projectId = id;

  if (id) {
    const { error } = await supabase.from("projects").update(validated).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { data, error } = await supabase.from("projects").insert(validated).select().single();
    if (error) throw new Error(error.message);
    projectId = data.id;
  }

  if (!projectId) throw new Error("Failed to determine Project ID");

  // Handle Multiple Image Uploads
  const files = formData.getAll("images") as File[];
  if (files.length > 0) {
    const newImageUrls: string[] = [];

    for (const file of files) {
      if (file.size > 0) {
        const filename = `${projectId}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, "")}`;
        const { error: uploadError } = await supabase.storage.from("projects").upload(filename, file);
        if (uploadError) continue;

        const { data: { publicUrl } } = supabase.storage.from("projects").getPublicUrl(filename);
        newImageUrls.push(publicUrl);
      }
    }

    if (newImageUrls.length > 0) {
      const { error: imageError } = await supabase
        .from("project_images")
        .insert(newImageUrls.map((url) => ({ project_id: projectId, url })));
      
      if (imageError) throw new Error("Failed to save image links: " + imageError.message);
    }
  }

  revalidatePath("/admin/projects");
  return { success: true };
}

export async function deleteProjectImage(imageUrl: string) {
  const supabase = await createClient();
  
  // 1. Delete from DB
  const { error } = await supabase.from("project_images").delete().eq("url", imageUrl);
  if (error) throw new Error(error.message);

  // 2. Delete from Storage
  try {
    const path = imageUrl.split("/projects/")[1];
    if (path) await supabase.storage.from("projects").remove([path]);
  } catch (e) {
    console.error("Storage cleanup failed", e);
  }

  revalidatePath("/admin/projects");
}

export async function deleteProject(id: string) {
  const supabase = await createClient();
  
  const { data: images } = await supabase.from("project_images").select("url").eq("project_id", id);
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw new Error(error.message);

  if (images && images.length > 0) {
    const paths = images.map(img => img.url.split("/projects/")[1]).filter(Boolean);
    if (paths.length > 0) await supabase.storage.from("projects").remove(paths);
  }

  revalidatePath("/admin/projects");
}

// ------------------------------------------------------------------
// Blog Actions
// ------------------------------------------------------------------

const BlogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(10, "Content must be at least 10 characters"),
});

export async function saveBlog(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const id = formData.get("id") as string | null;
  const rawData = {
    title: formData.get("title"),
    content: formData.get("content"),
  };
  const validated = BlogSchema.parse(rawData);
  const file = formData.get("cover_image") as File;
  let coverUrl: string | undefined;

  if (file && file.size > 0) {
    const filename = `${user.id}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, "")}`;
    const { error: uploadError } = await supabase.storage.from("blogs").upload(filename, file);
    if (uploadError) throw new Error("Image upload failed");

    const { data: { publicUrl } } = supabase.storage.from("blogs").getPublicUrl(filename);
    coverUrl = publicUrl;
  }

  const payload = {
    ...validated,
    ...(coverUrl ? { cover_url: coverUrl } : {}),
  };

  if (id) {
    const res = await supabase.from("blogs").update(payload).eq("id", id);
    if (res.error) throw new Error(res.error.message);
  } else {
    const res = await supabase.from("blogs").insert(payload);
    if (res.error) throw new Error(res.error.message);
  }

  revalidatePath("/admin/blog");
  return { success: true };
}

// NEW: Delete Blog Image Action
export async function deleteBlogImage(blogId: string, imageUrl: string) {
  const supabase = await createClient();

  // 1. Remove reference from DB (set null)
  const { error } = await supabase
    .from("blogs")
    .update({ cover_url: null })
    .eq("id", blogId);

  if (error) throw new Error(error.message);

  // 2. Remove file from Storage
  try {
    const path = imageUrl.split("/blogs/")[1];
    if (path) await supabase.storage.from("blogs").remove([path]);
  } catch (e) {
    console.error("Storage cleanup failed", e);
  }

  revalidatePath("/admin/blog");
}

export async function deleteBlog(id: string) {
  const supabase = await createClient();
  
  // Optional: Fetch cover_url first to delete from storage, then delete row
  const { data: blog } = await supabase.from("blogs").select("cover_url").eq("id", id).single();
  
  const { error } = await supabase.from("blogs").delete().eq("id", id);
  if (error) throw new Error(error.message);

  // Cleanup Storage
  if (blog?.cover_url) {
      try {
        const path = blog.cover_url.split("/blogs/")[1];
        if (path) await supabase.storage.from("blogs").remove([path]);
      } catch(e) {}
  }

  revalidatePath("/admin/blog");
}