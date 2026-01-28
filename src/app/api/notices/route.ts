import { NextResponse } from "next/server";
import { listNotices } from "@/lib/data";

export async function GET() {
  const notices = await listNotices(50);
  return NextResponse.json(
    notices.map((n) => ({
      id: String(n._id),
      title: n.title,
      body: n.body,
      publishedAt: n.publishedAt,
    })),
  );
}


