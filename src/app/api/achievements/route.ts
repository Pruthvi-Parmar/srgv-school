import { NextResponse } from "next/server";
import { listAchievements } from "@/lib/data";

export async function GET() {
  const items = await listAchievements(12);
  return NextResponse.json(
    items.map((a) => ({
      title: a.title,
      description: a.description,
      year: a.year,
    })),
  );
}

