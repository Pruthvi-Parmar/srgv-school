import { NextResponse } from "next/server";
import { isAdminRequestAuthed } from "@/lib/auth";
import { createGalleryItem, listGalleryItems } from "@/lib/data";

export async function GET() {
  if (!(await isAdminRequestAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const items = await listGalleryItems();
  return NextResponse.json(
    items.map((g) => ({
      id: String(g._id),
      title: g.title,
      src: g.src,
      order: g.order,
    })),
  );
}

export async function POST(req: Request) {
  if (!(await isAdminRequestAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { title, src, order } = (await req.json().catch(() => ({}))) as {
    title?: string;
    src?: string;
    order?: number;
  };
  if (!title || !src) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  const created = await createGalleryItem({ title, src, order });
  return NextResponse.json({ ok: true, id: created && String(created._id) });
}

