import { NextResponse } from "next/server";
import { isAdminRequestAuthed } from "@/lib/auth";
import { createPtaMember, listPtaMembers } from "@/lib/data";

export async function GET() {
  if (!(await isAdminRequestAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const items = await listPtaMembers();
  return NextResponse.json(
    items.map((m) => ({
      id: String(m._id),
      name: m.name,
      role: m.role,
      address: m.address,
      photo: m.photo,
      order: m.order,
    })),
  );
}

export async function POST(req: Request) {
  if (!(await isAdminRequestAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { name, role, address, photo, order } = (await req.json().catch(() => ({}))) as {
    name?: string;
    role?: string;
    address?: string;
    photo?: string;
    order?: number;
  };
  if (!name || !role || !address) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  const created = await createPtaMember({ name, role, address, photo, order });
  return NextResponse.json({ ok: true, id: created && String(created._id) });
}

