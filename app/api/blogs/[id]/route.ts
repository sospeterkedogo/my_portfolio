import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import fs from "fs";
import path from "path";

// Optional: Update local blogs file for SSR/static usage
async function updateBlogsFile() {
  const { data, error } = await supabase
    .from("blogs")
    .select("id, title, content, cover_url, created_at");

  if (error) throw error;

  const fileContent = `export const blogs = ${JSON.stringify(data, null, 2)};\n`;
  const filePath = path.join(process.cwd(), "data/blogs.ts");
  fs.writeFileSync(filePath, fileContent);
}

// ---------------------- GET handler ----------------------
export async function GET(
  req: NextRequest,
  context: { params: { id: string } } // ✅ correct typing
) {
  try {
    const blogId = context.params.id;
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("id", blogId)
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message || "Failed to fetch blog" },
      { status: 500 }
    );
  }
}

// ---------------------- PUT handler ----------------------
export async function PUT(
  req: NextRequest,
  context: { params: { id: string } } // ✅ correct typing
) {
  try {
    const blogId = context.params.id;
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const file = formData.get("image") as File | null;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    let coverUrl: string | null = null;

    if (file) {
      const filePath = `${blogId}/${file.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("blogs")
        .upload(filePath, file, { cacheControl: "3600", upsert: true });

      if (!uploadError && uploadData?.path) {
        const { data: urlData } = supabase.storage
          .from("blogs")
          .getPublicUrl(uploadData.path);
        coverUrl = urlData.publicUrl;
      }
    }

    const { data: updatedBlog, error: updateError } = await supabase
      .from("blogs")
      .update({ title, content, ...(coverUrl ? { cover_url: coverUrl } : {}) })
      .eq("id", blogId)
      .select()
      .single();

    if (updateError) {
      return NextResponse.json(
        { error: updateError.message },
        { status: 500 }
      );
    }

    await updateBlogsFile();
    await supabase
      .from("activity_log")
      .insert([{ message: `Updated blog "${title}"` }]);

    return NextResponse.json(updatedBlog);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message || "Failed to update blog" },
      { status: 500 }
    );
  }
}

// ---------------------- DELETE handler ----------------------
export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const blogId = context.params.id;
    const { error } = await supabase.from("blogs").delete().eq("id", blogId);

    if (error) throw error;

    await updateBlogsFile();
    await supabase
      .from("activity_log")
      .insert([{ message: `Deleted blog ID "${blogId}"` }]);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message || "Failed to delete blog" },
      { status: 500 }
    );
  }
}
