import { NextResponse } from "next/server";
import { isAdminRequestAuthed } from "@/lib/auth";
import { createLab, listLabs } from "@/lib/data";

export async function GET() {
  if (!(await isAdminRequestAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const labs = await listLabs();
  return NextResponse.json(
    labs.map((l) => ({
      id: String(l._id),
      name: l.name,
      description: l.description,
      image: l.image,
      order: l.order,
    })),
  );
}

export async function POST(req: Request) {
  if (!(await isAdminRequestAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { name, description, image, order } = (await req.json().catch(() => ({}))) as {
    name?: string;
    description?: string;
    image?: string;
    order?: number;
  };
  if (!name || !description || !image) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  const created = await createLab({ name, description, image, order });
  return NextResponse.json({ ok: true, id: created && String(created._id) });
}

