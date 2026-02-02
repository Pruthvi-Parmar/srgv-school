import { NextResponse } from "next/server";
import { isAdminRequestAuthed } from "@/lib/auth";
import { deleteSmcMember, updateSmcMember } from "@/lib/data";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminRequestAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const {
    name,
    fatherOrSpouseName,
    designation,
    occupationWithAddress,
    residentialAddress,
    photo,
    order,
  } = (await req.json().catch(() => ({}))) as {
    name?: string;
    fatherOrSpouseName?: string;
    designation?: string;
    occupationWithAddress?: string;
    residentialAddress?: string;
    photo?: string;
    order?: number;
  };
  if (!name || !fatherOrSpouseName || !designation || !occupationWithAddress || !residentialAddress) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  const updated = await updateSmcMember(id, {
    name,
    fatherOrSpouseName,
    designation,
    occupationWithAddress,
    residentialAddress,
    photo,
    order,
  });
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminRequestAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const ok = await deleteSmcMember(id);
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}

