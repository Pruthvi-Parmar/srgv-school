import { NextResponse } from "next/server";
import { isAdminRequestAuthed } from "@/lib/auth";
import {
  deleteLeavingCertificate,
  getLeavingCertificateById,
  updateLeavingCertificate,
} from "@/lib/data";
import { deleteLeavingCertificatePdf } from "@/lib/leaving-certificate-upload";
import { isLeavingCertificateStandard } from "@/lib/leaving-certificate-standards";

export const runtime = "nodejs";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminRequestAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;

  const body = (await req.json().catch(() => ({}))) as {
    title?: string;
    standard?: string;
  };

  const patch: { title?: string; standard?: string } = {};

  if (typeof body.title === "string") {
    const title = body.title.trim();
    if (!title) return NextResponse.json({ error: "Display name cannot be empty" }, { status: 400 });
    patch.title = title;
  }

  if (typeof body.standard === "string") {
    const standard = body.standard.trim();
    if (!isLeavingCertificateStandard(standard)) {
      return NextResponse.json({ error: "Invalid standard" }, { status: 400 });
    }
    patch.standard = standard;
  }

  if (!patch.title && !patch.standard) {
    return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
  }

  const updated = await updateLeavingCertificate(id, patch);
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({
    id: String(updated._id),
    title: updated.title,
    standard: updated.standard ?? "",
    pdfPath: updated.pdfPath,
    order: updated.order,
    createdAt: updated.createdAt.toISOString(),
  });
}

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
