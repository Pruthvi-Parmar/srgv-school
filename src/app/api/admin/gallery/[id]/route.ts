import { NextResponse } from "next/server";
import { isAdminRequestAuthed } from "@/lib/auth";
import { deleteGalleryItem, updateGalleryItem } from "@/lib/data";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminRequestAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const { title, src, order } = (await req.json().catch(() => ({}))) as {
    title?: string;
    src?: string;
    order?: number;
  };
  if (!title || !src) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  const updated = await updateGalleryItem(id, { title, src, order });
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminRequestAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const ok = await deleteGalleryItem(id);
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}

