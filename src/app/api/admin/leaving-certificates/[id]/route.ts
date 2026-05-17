import { NextResponse } from "next/server";
import { unlink } from "fs/promises";
import path from "path";
import { isAdminRequestAuthed } from "@/lib/auth";
import { deleteLeavingCertificate, getLeavingCertificateById } from "@/lib/data";

export const runtime = "nodejs";

async function removePdfFromDisk(pdfPath: string) {
  if (!pdfPath.startsWith("/leaving-certificates/")) return;
  const filename = decodeURIComponent(pdfPath.replace("/leaving-certificates/", ""));
  const diskPath = path.join(process.cwd(), "public", "leaving-certificates", filename);
  try {
    await unlink(diskPath);
  } catch {
    // File may already be missing
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminRequestAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const existing = await getLeavingCertificateById(id);
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await removePdfFromDisk(existing.pdfPath);
  const ok = await deleteLeavingCertificate(id);
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
