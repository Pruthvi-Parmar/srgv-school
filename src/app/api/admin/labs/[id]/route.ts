import { NextResponse } from "next/server";
import { isAdminRequestAuthed } from "@/lib/auth";
import { deleteLab, updateLab } from "@/lib/data";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminRequestAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const { name, description, image, order } = (await req.json().catch(() => ({}))) as {
    name?: string;
    description?: string;
    image?: string;
    order?: number;
  };
  if (!name || !description || !image) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  const updated = await updateLab(id, { name, description, image, order });
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminRequestAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const ok = await deleteLab(id);
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}

