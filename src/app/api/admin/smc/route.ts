import { NextResponse } from "next/server";
import { isAdminRequestAuthed } from "@/lib/auth";
import { createSmcMember, listSmcMembers } from "@/lib/data";

export async function GET() {
  if (!(await isAdminRequestAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const items = await listSmcMembers();
  return NextResponse.json(
    items.map((m) => ({
      id: String(m._id),
      name: m.name,
      fatherOrSpouseName: m.fatherOrSpouseName,
      designation: m.designation,
      occupationWithAddress: m.occupationWithAddress,
      residentialAddress: m.residentialAddress,
      photo: m.photo,
      order: m.order,
    })),
  );
}

export async function POST(req: Request) {
  if (!(await isAdminRequestAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const {
    name,
    fatherOrSpouseName,
    designation,
    occupationWithAddress,
    residentialAddress,
    photo,
    order,
  } = (await req.json().catch(() => ({}))) as {
    name?: string;
    fatherOrSpouseName?: string;
    designation?: string;
    occupationWithAddress?: string;
    residentialAddress?: string;
    photo?: string;
    order?: number;
  };
  if (!name || !fatherOrSpouseName || !designation || !occupationWithAddress || !residentialAddress) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  const created = await createSmcMember({
    name,
    fatherOrSpouseName,
    designation,
    occupationWithAddress,
    residentialAddress,
    photo,
    order,
  });
  return NextResponse.json({ ok: true, id: created && String(created._id) });
}

