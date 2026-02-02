import { NextResponse } from "next/server";
import { isAdminRequestAuthed } from "@/lib/auth";
import { createAchievement, listAchievements } from "@/lib/data";

export async function GET() {
  if (!(await isAdminRequestAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const items = await listAchievements(100);
  return NextResponse.json(
    items.map((a) => ({
      id: String(a._id),
      title: a.title,
      description: a.description,
      year: a.year,
    })),
  );
}

export async function POST(req: Request) {
  if (!(await isAdminRequestAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { title, description, year } = (await req.json().catch(() => ({}))) as {
    title?: string;
    description?: string;
    year?: string;
  };
  if (!title || !description) {
    return NextResponse.json({ error: "Missing title/description" }, { status: 400 });
  }
  const created = await createAchievement({ title, description, year });
  return NextResponse.json({ ok: true, id: created && String(created._id) });
}

