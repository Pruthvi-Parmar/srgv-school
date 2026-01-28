import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";
import type { Notice, NoticeInput, SiteSettings } from "@/lib/models";
import { defaultAdmissionsText, defaultContact } from "@/lib/content";

const NOTICES = "notices";
const SETTINGS = "site_settings";

export async function getSettings(): Promise<SiteSettings> {
  const db = await getDb();
  const col = db.collection<SiteSettings>(SETTINGS);
  const existing = await col.findOne({ _id: "singleton" });
  if (existing) return existing;
  const created: SiteSettings = {
    _id: "singleton",
    admissionsText: defaultAdmissionsText,
    contact: defaultContact,
    updatedAt: new Date(),
  };
  await col.insertOne(created);
  return created;
}

export async function updateSettings(patch: Partial<Omit<SiteSettings, "_id" | "updatedAt">>) {
  const db = await getDb();
  const col = db.collection<SiteSettings>(SETTINGS);
  await col.updateOne(
    { _id: "singleton" },
    {
      $set: { ...patch, updatedAt: new Date() },
      $setOnInsert: {
        _id: "singleton",
        admissionsText: defaultAdmissionsText,
        contact: defaultContact,
      },
    },
    { upsert: true },
  );
  return await getSettings();
}

export async function listNotices(limit = 20) {
  const db = await getDb();
  const col = db.collection<Notice>(NOTICES);
  return await col
    .find({})
    .sort({ publishedAt: -1, createdAt: -1 })
    .limit(limit)
    .toArray();
}

export async function getNoticeById(id: string) {
  const db = await getDb();
  const col = db.collection<Notice>(NOTICES);
  if (!ObjectId.isValid(id)) return null;
  return await col.findOne({ _id: new ObjectId(id) });
}

export async function createNotice(input: NoticeInput) {
  const db = await getDb();
  const col = db.collection<Notice>(NOTICES);
  const now = new Date();
  const publishedAt = input.publishedAt ? new Date(input.publishedAt) : now;
  const doc = {
    title: input.title.trim(),
    body: input.body.trim(),
    publishedAt,
    createdAt: now,
    updatedAt: now,
  };
  const res = await col.insertOne(doc as unknown as Notice);
  return await col.findOne({ _id: res.insertedId });
}

export async function updateNotice(id: string, input: NoticeInput) {
  const db = await getDb();
  const col = db.collection<Notice>(NOTICES);
  if (!ObjectId.isValid(id)) return null;
  const _id = new ObjectId(id);
  const patch: Partial<Notice> = {
    title: input.title.trim(),
    body: input.body.trim(),
    updatedAt: new Date(),
  };
  if (input.publishedAt) patch.publishedAt = new Date(input.publishedAt);
  await col.updateOne({ _id }, { $set: patch });
  return await col.findOne({ _id });
}

export async function deleteNotice(id: string) {
  const db = await getDb();
  const col = db.collection<Notice>(NOTICES);
  if (!ObjectId.isValid(id)) return false;
  const res = await col.deleteOne({ _id: new ObjectId(id) });
  return res.deletedCount === 1;
}


