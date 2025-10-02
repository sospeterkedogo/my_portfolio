import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

// Helper to log activity
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
    const content = formData.get("content") as string;
    const image = formData.get("image") as File | null;

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
    }

    // Insert blog first to get ID
    const { data: blog, error: blogError } = await supabase
      .from("blogs")
      .insert({ title, content })
      .select()
      .single();

    if (blogError || !blog) {
      return NextResponse.json(
        { error: blogError?.message || "Failed to create blog" },
        { status: 500 }
      );
    }

    let coverUrl: string | null = null;

    // Upload image if exists
    if (image) {
      const filePath = `blogs/${blog.id}/${Date.now()}_${image.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("blogs")
        .upload(filePath, image, { cacheControl: "3600", upsert: false });

      if (uploadError) console.error("Upload error:", uploadError);
      else if (uploadData?.path) {
        const { data: urlData } = supabase.storage.from("blogs").getPublicUrl(uploadData.path);
        coverUrl = urlData.publicUrl;

        await supabase.from("blogs").update({ cover_url: coverUrl }).eq("id", blog.id);
      }
    }

    await logActivity(`Added blog: ${title}`);

    return NextResponse.json({ ...blog, coverUrl });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}


// ---------------------- PUT ----------------------
export async function PUT(req: NextRequest) {
  try {
    const formData = await req.formData();
    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const image = formData.get("image") as File | null;

    if (!id || !title || !content) {
      return NextResponse.json({ error: "ID, title and content are required" }, { status: 400 });
    }

    let coverUrl: string | null = null;

    if (image) {
      const filePath = `blogs/${id}/${image.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("blogs")
        .upload(filePath, image, { cacheControl: "3600", upsert: true });

      if (uploadError) {
        console.error("Upload error:", uploadError);
      } else if (uploadData) {
        const { data: urlData } = supabase.storage.from("blogs").getPublicUrl(uploadData.path);
        coverUrl = urlData?.publicUrl ?? null;
      }
    }

    const { data: updatedBlog, error: updateError } = await supabase
      .from("blogs")
      .update({ title, content, ...(coverUrl ? { cover_url: coverUrl } : {}) })
      .eq("id", Number(id)) // ensure numeric match
      .select()
      .single();

    if (updateError) return NextResponse.json({ error: updateError.message }, { status: 500 });
    if (!updatedBlog) return NextResponse.json({ error: "Blog not found" }, { status: 404 });

    await logActivity(`Edited blog: ${title}`);

    return NextResponse.json(updatedBlog);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message || "Something went wrong" }, { status: 500 });
  }
}


// ---------------------- DELETE ----------------------
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

    // Delete the blog row
    const { data: deletedBlog, error: deleteError } = await supabase
      .from("blogs")
      .delete()
      .eq("id", id)
      .select()
      .single();

    if (deleteError) return NextResponse.json({ error: deleteError.message }, { status: 500 });
    if (!deletedBlog) return NextResponse.json({ error: "Blog not found" }, { status: 404 });

    // Delete the cover image from storage if exists
    if (deletedBlog.cover_url) {
      const parts = deletedBlog.cover_url.split("/blogs/");
      const path = parts.length > 1 ? parts[1] : null;
      if (path) {
        const { error: removeError } = await supabase.storage.from("blogs").remove([path]);
        if (removeError) console.error("Error removing cover image:", removeError);
      }
    }

    // Log activity
    await supabase.from("activity_log").insert([{ message: `Deleted blog: ${deletedBlog.title}`, timestamp: new Date().toISOString() }]);

    return NextResponse.json({ message: "Blog deleted", deletedBlog });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

