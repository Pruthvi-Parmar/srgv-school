import { NextResponse } from "next/server";
import { isAdminRequestAuthed } from "@/lib/auth";
import { getAcademicsSettings, updateAcademicsSettings } from "@/lib/data";

export async function GET() {
  if (!(await isAdminRequestAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const s = await getAcademicsSettings();
  return NextResponse.json({
    introText: s.introText,
    guidelinesText: s.guidelinesText,
    featureCards: s.featureCards,
  });
}

export async function PUT(req: Request) {
  if (!(await isAdminRequestAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { introText, guidelinesText, featureCards } = (await req.json().catch(() => ({}))) as {
    introText?: string;
    guidelinesText?: string;
    featureCards?: { id: string; title: string; desc: string }[];
  };
  const updated = await updateAcademicsSettings({
    introText: introText ?? "",
    guidelinesText: guidelinesText ?? "",
    featureCards: featureCards ?? [],
  });
  return NextResponse.json({
    introText: updated.introText,
    guidelinesText: updated.guidelinesText,
    featureCards: updated.featureCards,
  });
}

