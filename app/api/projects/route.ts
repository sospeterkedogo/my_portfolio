import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

// ---------------------- Helper ----------------------
async function logActivity(message: string) {
  await supabase
    .from("activity_log")
    .insert([{ message, timestamp: new Date().toISOString() }]);
}

// ---------------------- POST ----------------------
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const files = formData.getAll("images") as File[];

    if (!title || !description) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      );
    }

    // Insert project first
    const { data: project, error: projectError } = await supabase
      .from("projects")
      .insert({ title, description })
      .select()
      .single();

    if (projectError || !project) {
      return NextResponse.json(
        { error: projectError?.message || "Failed to create project" },
        { status: 500 }
      );
    }

    const imageUrls: string[] = [];

    // Upload images
    for (const file of files) {
      const filePath = `projects/${project.id}/${Date.now()}_${file.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("projects")
        .upload(filePath, file, { cacheControl: "3600", upsert: false });

      if (uploadError) continue;

      const { data: urlData } = supabase.storage
        .from("projects")
        .getPublicUrl(uploadData.path);

      imageUrls.push(urlData.publicUrl);
    }

    // Insert image URLs into project_images table
    if (imageUrls.length > 0) {
      await supabase.from("project_images").insert(
        imageUrls.map((url) => ({ project_id: project.id, url }))
      );
    }

    await logActivity(`Added project: ${title}`);

    return NextResponse.json({ ...project, images: imageUrls });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message || "Something went wrong" },
      { status: 500 }
    );
  }
}

// ---------------------- GET ----------------------
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select(`
        id,
        title,
        description,
        project_images(url)
      `)
      .order("id", { ascending: false });

    if (error) throw error;

    const projects = data.map((p: any) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      images: p.project_images?.map((img: any) => img.url) || [],
    }));

    return NextResponse.json(projects);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

// ---------------------- PUT ----------------------
export async function PUT(req: NextRequest) {
  try {
    const formData = await req.formData();
    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const files = formData.getAll("images") as File[];

    if (!id || !title || !description) {
      return NextResponse.json(
        { error: "ID, title, and description are required" },
        { status: 400 }
      );
    }

    let imageUrls: string[] = [];

    // Upload new images if any
    for (const file of files) {
      const filePath = `projects/${id}/${Date.now()}_${file.name}`;
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
      .eq("id", Number(id))
      .select()
      .single();

    if (updateError || !updatedProject) {
      return NextResponse.json(
        { error: updateError?.message || "Project not found" },
        { status: 500 }
      );
    }

    // Insert new images if uploaded
    if (imageUrls.length > 0) {
      await supabase.from("project_images").insert(
        imageUrls.map((url) => ({ project_id: id, url }))
      );
    }

    await logActivity(`Edited project: ${title}`);

    return NextResponse.json({ ...updatedProject, images: imageUrls });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message || "Something went wrong" },
      { status: 500 }
    );
  }
}

// ---------------------- DELETE ----------------------
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

    // Delete associated images first
    const { data: images } = await supabase
      .from("project_images")
      .select("url")
      .eq("project_id", id);

    if (images) {
      for (const img of images) {
        const filePath = img.url.split("/projects/")[1];
        if (filePath) await supabase.storage.from("projects").remove([filePath]);
      }
    }

    await supabase.from("project_images").delete().eq("project_id", id);

    const { data: deletedProject, error: deleteError } = await supabase
      .from("projects")
      .delete()
      .eq("id", id)
      .select()
      .single();

    if (deleteError || !deletedProject) {
      return NextResponse.json(
        { error: deleteError?.message || "Project not found" },
        { status: 500 }
      );
    }

    await logActivity(`Deleted project: ${deletedProject.title}`);

    return NextResponse.json({ message: "Project deleted", deletedProject });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
