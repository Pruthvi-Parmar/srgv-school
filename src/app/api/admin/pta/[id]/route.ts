import { NextResponse } from "next/server";
import { isAdminRequestAuthed } from "@/lib/auth";
import { deletePtaMember, updatePtaMember } from "@/lib/data";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminRequestAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const { name, role, address, photo, order } = (await req.json().catch(() => ({}))) as {
    name?: string;
    role?: string;
    address?: string;
    photo?: string;
    order?: number;
  };
  if (!name || !role || !address) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  const updated = await updatePtaMember(id, { name, role, address, photo, order });
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminRequestAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const ok = await deletePtaMember(id);
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}

