import { NextResponse } from "next/server";
import { isAdminRequestAuthed } from "@/lib/auth";
import { getSettings, updateSettings } from "@/lib/data";

export async function GET() {
  if (!(await isAdminRequestAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const s = await getSettings();
  return NextResponse.json({
    admissionsText: s.admissionsText,
    contact: s.contact,
    updatedAt: s.updatedAt,
  });
}

export async function PUT(req: Request) {
  if (!(await isAdminRequestAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { admissionsText, contact } = (await req.json().catch(() => ({}))) as {
    admissionsText?: string;
    contact?: { phone?: string; email?: string; address?: string };
  };

  const patch: { admissionsText?: string; contact?: { phone: string; email: string; address: string } } = {};
  if (typeof admissionsText === "string") patch.admissionsText = admissionsText;
  if (contact && typeof contact === "object") {
    patch.contact = {
      phone: String(contact.phone ?? ""),
      email: String(contact.email ?? ""),
      address: String(contact.address ?? ""),
    };
  }

  const updated = await updateSettings(patch);
  return NextResponse.json({ ok: true, updatedAt: updated.updatedAt });
}


