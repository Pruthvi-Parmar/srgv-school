import { NextResponse } from "next/server";
import { isAdminRequestAuthed } from "@/lib/auth";
import { deleteAchievement, updateAchievement } from "@/lib/data";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminRequestAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const { title, description, year } = (await req.json().catch(() => ({}))) as {
    title?: string;
    description?: string;
    year?: string;
  };
  if (!title || !description) {
    return NextResponse.json({ error: "Missing title/description" }, { status: 400 });
  }
  const updated = await updateAchievement(id, { title, description, year });
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminRequestAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const ok = await deleteAchievement(id);
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}

