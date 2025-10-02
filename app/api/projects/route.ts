import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import fs from "fs";
import path from "path";

// Helper function to update projects.ts
async function updateProjectsFile() {
 const { data, error } = await supabase
 .from("projects")
 .select("id, title, description, project_images(url)");

 if (error) throw error;

 const projectsFormatted = data.map((p: any) => ({
     id: p.id,
     title: p.title,
     description: p.description,
     images: p.project_images?.map((img: any) => img.url) || [],
  }));

 const fileContent = `export const projects = ${JSON.stringify(projectsFormatted, null, 2)};\n`;
 const filePath = path.join(process.cwd(), "data/projects.ts");
 fs.writeFileSync(filePath, fileContent);
}

export async function POST(req: NextRequest) {
 try {
  const formData = await req.formData();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const files = formData.getAll("images") as File[];
  if (!title || !description) {
   return NextResponse.json({ error: "Title and description are required" }, { status: 400 });
  }
  // Insert project
  const { data: project, error: projectError } = await supabase
   .from("projects")
   .insert({ title, description })
   .select()
   .single();
  if (projectError) {
   return NextResponse.json({ error: projectError.message }, { status: 500 });
  }
  const imageUrls: string[] = [];
  for (const file of files) {
   const filePath = `${project.id}/${file.name}`;
   const { data: uploadData, error: uploadError } = await supabase.storage
    .from("projects")
    .upload(filePath, file, { cacheControl: "3600", upsert: true });
   if (uploadError) continue;
   const { data: urlData } = supabase.storage
    .from("projects")
    .getPublicUrl(uploadData.path);
   imageUrls.push(urlData.publicUrl);
  }
  if (imageUrls.length > 0) {
   await supabase.from("project_images").insert(
   imageUrls.map((url) => ({ project_id: project.id, url }))
   );
  }
  await supabase.from("activity_log").insert([{ message: `Added project "${title}"` }]);
  await updateProjectsFile();
  return NextResponse.json({ ...project, images: imageUrls });
 } catch (error: any) {
  console.error(error);
  return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
 }
}

// ----------- PUT handler for editing projects -----------
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
 try {
  const projectId = params.id;
  const formData = await req.formData();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const files = formData.getAll("images") as File[];
  if (!title || !description) {
   return NextResponse.json({ error: "Title and description are required" }, { status: 400 });
  }
  let imageUrls: string[] = [];
  // Upload new images if any
  for (const file of files) {
   const filePath = `${projectId}/${file.name}`;
   const { data: uploadData, error: uploadError } = await supabase.storage
    .from("projects")
    .upload(filePath, file, { cacheControl: "3600", upsert: true });
   if (uploadError) continue;
   const { data: urlData } = supabase.storage
    .from("projects")
    .getPublicUrl(uploadData.path);
   imageUrls.push(urlData.publicUrl);
  }
  // Update project
  const { data: updatedProject, error: updateError } = await supabase
   .from("projects")
   .update({ title, description })
   .eq("id", projectId)
   .select()
   .single();
  if (updateError) {
   return NextResponse.json({ error: updateError.message }, { status: 500 });
  }
  // Save new images if uploaded
  if (imageUrls.length > 0) {
   await supabase.from("project_images").insert(
    imageUrls.map((url) => ({
     project_id: projectId,
     url,
    }))
   );
  }
 
 // **FIXES:** Update the local projects file and log activity
 await updateProjectsFile();
 await supabase.from("activity_log").insert([{ message: `Updated project "${title}"` }]);
  return NextResponse.json({ ...updatedProject, images: imageUrls });
 } catch (err: any) {
  console.error(err);
  return NextResponse.json({ error: err.message || "Something went wrong" }, { status: 500 });
 }
}