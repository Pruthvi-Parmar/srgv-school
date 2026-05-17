import { NextResponse } from "next/server";
import { isAdminRequestAuthed } from "@/lib/auth";
import { deleteLeavingCertificate, getLeavingCertificateById } from "@/lib/data";
import { deleteLeavingCertificatePdf } from "@/lib/leaving-certificate-upload";

export const runtime = "nodejs";

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminRequestAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const existing = await getLeavingCertificateById(id);
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await deleteLeavingCertificatePdf(existing.pdfPath);
  const ok = await deleteLeavingCertificate(id);
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
