import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { supabase } from "@/lib/supabaseClient";

// Utility to update local projects file
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

  const fileContent = `export const projects = ${JSON.stringify(
    projectsFormatted,
    null,
    2
  )};\n`;

  const filePath = path.join(process.cwd(), "data/projects.ts");
  fs.writeFileSync(filePath, fileContent);
}

// ---------------------- PUT handler ----------------------
export async function PUT(req: NextRequest, context: any) {
  try {
    // await params if it's a promise
    const params = await context.params; 
    const projectId = params.id as string;

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
        imageUrls.map((url) => ({ project_id: projectId, url }))
      );
    }

    // Update local projects file + log activity
    await updateProjectsFile();
    await supabase.from("activity_log").insert([{ message: `Updated project "${title}"` }]);

    return NextResponse.json({ ...updatedProject, images: imageUrls });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message || "Something went wrong" }, { status: 500 });
  }
}
