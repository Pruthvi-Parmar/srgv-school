import { NextResponse } from "next/server";
import { isAdminRequestAuthed } from "@/lib/auth";
import { createTeacher, listTeachers } from "@/lib/data";

export async function GET() {
  if (!(await isAdminRequestAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const items = await listTeachers();
  return NextResponse.json(
    items.map((t) => ({
      id: String(t._id),
      name: t.name,
      designation: t.designation,
      qualification: t.qualification,
      photo: t.photo,
      order: t.order,
    })),
  );
}

export async function POST(req: Request) {
  if (!(await isAdminRequestAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { name, designation, qualification, photo, order } = (await req.json().catch(() => ({}))) as {
    name?: string;
    designation?: string;
    qualification?: string;
    photo?: string;
    order?: number;
  };
  if (!name) return NextResponse.json({ error: "Missing name" }, { status: 400 });
  const created = await createTeacher({ name, designation, qualification, photo, order });
  return NextResponse.json({ ok: true, id: created && String(created._id) });
}

