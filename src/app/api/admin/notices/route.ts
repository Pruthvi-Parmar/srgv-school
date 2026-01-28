import { NextResponse } from "next/server";
import { isAdminRequestAuthed } from "@/lib/auth";
import { createNotice, listNotices } from "@/lib/data";

export async function GET() {
  if (!(await isAdminRequestAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const notices = await listNotices(200);
  return NextResponse.json(
    notices.map((n) => ({
      id: String(n._id),
      title: n.title,
      body: n.body,
      publishedAt: n.publishedAt,
      createdAt: n.createdAt,
      updatedAt: n.updatedAt,
    })),
  );
}

export async function POST(req: Request) {
  if (!(await isAdminRequestAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { title, body, publishedAt } = (await req.json().catch(() => ({}))) as {
    title?: string;
    body?: string;
    publishedAt?: string;
  };
  if (!title || !body) return NextResponse.json({ error: "Missing title/body" }, { status: 400 });
  const created = await createNotice({ title, body, publishedAt });
  return NextResponse.json({ ok: true, notice: created && { id: String(created._id) } });
}


