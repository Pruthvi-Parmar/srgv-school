import { NextResponse } from "next/server";
import { listLeavingCertificates } from "@/lib/data";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const standard = searchParams.get("standard")?.trim() || undefined;
  const items = await listLeavingCertificates(standard);
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
