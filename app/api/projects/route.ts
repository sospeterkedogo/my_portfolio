// app/api/projects/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getProjects } from "@/lib/admin/data";
import { saveProject, deleteProject } from "@/lib/admin/actions";

// GET: Publicly accessible
export async function GET() {
  const projects = await getProjects();
  return NextResponse.json(projects);
}

// POST: Protected Wrapper around Server Action
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const result = await saveProject(formData); // Reuse the Action!
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE: Protected Wrapper
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    
    await deleteProject(id); // Reuse the Action!
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}