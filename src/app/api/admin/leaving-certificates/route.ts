import { NextResponse } from "next/server";
import { isAdminRequestAuthed } from "@/lib/auth";
import { createLeavingCertificate, listLeavingCertificates } from "@/lib/data";
import { saveLeavingCertificatePdf } from "@/lib/leaving-certificate-upload";
import { isLeavingCertificateStandard } from "@/lib/leaving-certificate-standards";

export const runtime = "nodejs";

export async function GET() {
  if (!(await isAdminRequestAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const items = await listLeavingCertificates();
  return NextResponse.json(
    items.map((c) => ({
      id: String(c._id),
      title: c.title,
      standard: c.standard ?? "",
      pdfPath: c.pdfPath,
      order: c.order,
      createdAt: c.createdAt.toISOString(),
    })),
  );
}

export async function POST(req: Request) {
  if (!(await isAdminRequestAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const contentType = req.headers.get("content-type") || "";
  if (!contentType.includes("multipart/form-data")) {
    return NextResponse.json({ error: "Expected multipart form with title and file" }, { status: 400 });
  }

  const formData = await req.formData();
  const title = String(formData.get("title") ?? "").trim();
  const standard = String(formData.get("standard") ?? "").trim();
  const file = formData.get("file");

  if (!title) {
    return NextResponse.json({ error: "Student name is required" }, { status: 400 });
  }
  if (!standard || !isLeavingCertificateStandard(standard)) {
    return NextResponse.json({ error: "Please select a valid standard" }, { status: 400 });
  }
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "PDF file is required" }, { status: 400 });
  }

  try {
    const pdfPath = await saveLeavingCertificatePdf(file);
    const created = await createLeavingCertificate({ title, standard, pdfPath });
    return NextResponse.json({ ok: true, id: created && String(created._id) });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
