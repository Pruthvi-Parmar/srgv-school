import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";
import type {
  AcademicsSettings,
  Achievement,
  AchievementInput,
  GalleryItem,
  GalleryItemInput,
  Lab,
  LabInput,
  Notice,
  NoticeInput,
  PtaMemberDoc,
  PtaMemberInput,
  SiteSettings,
  SmcMemberDoc,
  SmcMemberInput,
  TeacherDoc,
  TeacherInput,
} from "@/lib/models";
import { defaultAdmissionsText, defaultContact } from "@/lib/content";
import { ptaMembers as ptaSeed, smcMembers as smcSeed } from "@/lib/governance";
import { teachers as teacherSeed } from "@/lib/teachers";

const NOTICES = "notices";
const SETTINGS = "site_settings";
const ACADEMICS_SETTINGS = "academics_settings";
const ACHIEVEMENTS = "achievements";
const LABS = "labs";
const GALLERY_ITEMS = "gallery_items";
const TEACHERS = "teachers";
const PTA = "pta_members";
const SMC = "smc_members";

export async function getSettings(): Promise<SiteSettings> {
  const db = await getDb();
  const col = db.collection<SiteSettings>(SETTINGS);
  const existing = await col.findOne({ _id: "singleton" });
  if (existing) return existing;
  const created: SiteSettings = {
    _id: "singleton",
    admissionsText: defaultAdmissionsText,
    contact: {
      ...defaultContact,
      altPhone: "9714477650",
      officePhone: "02622-253848",
    },
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

// Academics settings

export async function getAcademicsSettings(): Promise<AcademicsSettings> {
  const db = await getDb();
  const col = db.collection<AcademicsSettings>(ACADEMICS_SETTINGS);
  const existing = await col.findOne({ _id: "singleton" });
  if (existing) return existing;
  const now = new Date();
  const created: AcademicsSettings = {
    _id: "singleton",
    introText:
      "We believe strong concepts create strong futures. Our approach blends classroom learning with practical exposure through laboratories, activities, and structured guidance.",
    guidelinesText:
      "Home and school work best when they work together. We invite parents to engage using the pupil&apos;s diary, attending parent-teacher meetings, school functions, and meeting teachers when needed.",
    featureCards: [
      { id: "concept-based", title: "Concept-based learning", desc: "Focus on understanding and reasoning, not rote memorization." },
      { id: "experiential", title: "Experiential learning", desc: "Exploration and experimentation supported by laboratories and activities." },
      { id: "holistic", title: "Holistic growth", desc: "Equal emphasis on academics, sports, creative arts and values." },
      { id: "supportive", title: "Supportive environment", desc: "A safe, disciplined campus that encourages confidence and stage readiness." },
    ],
    updatedAt: now,
  };
  await col.insertOne(created);
  return created;
}

export async function updateAcademicsSettings(
  patch: Partial<Omit<AcademicsSettings, "_id" | "updatedAt">>,
): Promise<AcademicsSettings> {
  const db = await getDb();
  const col = db.collection<AcademicsSettings>(ACADEMICS_SETTINGS);
  const now = new Date();
  await col.updateOne(
    { _id: "singleton" },
    { $set: { ...patch, updatedAt: now } },
    { upsert: true },
  );
  return await getAcademicsSettings();
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

// Achievements

export async function listAchievements(limit = 20) {
  const db = await getDb();
  const col = db.collection<Achievement>(ACHIEVEMENTS);
  return await col
    .find({})
    .sort({ year: -1, createdAt: -1 })
    .limit(limit)
    .toArray();
}

export async function createAchievement(input: AchievementInput) {
  const db = await getDb();
  const col = db.collection<Achievement>(ACHIEVEMENTS);
  const now = new Date();
  const doc = {
    title: input.title.trim(),
    description: input.description.trim(),
    year: input.year?.trim() || undefined,
    image: input.image?.trim() || undefined,
    createdAt: now,
    updatedAt: now,
  };
  const res = await col.insertOne(doc as unknown as Achievement);
  return await col.findOne({ _id: res.insertedId });
}

export async function updateAchievement(id: string, input: AchievementInput) {
  const db = await getDb();
  const col = db.collection<Achievement>(ACHIEVEMENTS);
  if (!ObjectId.isValid(id)) return null;
  const _id = new ObjectId(id);
  const patch: Partial<Achievement> = {
    title: input.title.trim(),
    description: input.description.trim(),
    year: input.year?.trim() || undefined,
    image: input.image?.trim() || undefined,
    updatedAt: new Date(),
  };
  await col.updateOne({ _id }, { $set: patch });
  return await col.findOne({ _id });
}

export async function deleteAchievement(id: string) {
  const db = await getDb();
  const col = db.collection<Achievement>(ACHIEVEMENTS);
  if (!ObjectId.isValid(id)) return false;
  const res = await col.deleteOne({ _id: new ObjectId(id) });
  return res.deletedCount === 1;
}

// Labs

const defaultLabs: Omit<Lab, "_id">[] = [
  {
    name: "Physics Lab",
    description: "Hands-on experiments and apparatus for concept-based understanding of physics.",
    image: "/gallery/physics-lab.jpeg",
    order: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Chemistry Lab",
    description: "Well-equipped stations for safe and structured chemistry practicals.",
    image: "/gallery/chemistry-lab.jpeg",
    order: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Biology Lab",
    description: "Models, specimens and microscopes to explore the living world.",
    image: "/gallery/bio-lab.jpeg",
    order: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Maths Lab",
    description: "Activity-based maths learning using models and manipulatives.",
    image: "/gallery/maths-lab.jpeg",
    order: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Computer Lab",
    description: "Computer systems and digital tools to build ICT skills.",
    image: "/gallery/computer-lab.jpeg",
    order: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Language Lab",
    description: "Headsets and audio-visual content for listening and speaking practice.",
    image: "/gallery/language-lab.jpeg",
    order: 6,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export async function listLabs() {
  const db = await getDb();
  const col = db.collection<Lab>(LABS);
  const count = await col.countDocuments();
  if (count === 0) {
    await col.insertMany(defaultLabs as unknown as Lab[]);
  }
  return await col
    .find({})
    .sort({ order: 1, createdAt: 1 })
    .toArray();
}

export async function createLab(input: LabInput) {
  const db = await getDb();
  const col = db.collection<Lab>(LABS);
  const now = new Date();
  const order = typeof input.order === "number" ? input.order : (await col.countDocuments()) + 1;
  const doc = {
    name: input.name.trim(),
    description: input.description.trim(),
    image: input.image.trim(),
    order,
    createdAt: now,
    updatedAt: now,
  };
  const res = await col.insertOne(doc as unknown as Lab);
  return await col.findOne({ _id: res.insertedId });
}

export async function updateLab(id: string, input: LabInput) {
  const db = await getDb();
  const col = db.collection<Lab>(LABS);
  if (!ObjectId.isValid(id)) return null;
  const _id = new ObjectId(id);
  const patch: Partial<Lab> = {
    name: input.name.trim(),
    description: input.description.trim(),
    image: input.image.trim(),
    updatedAt: new Date(),
  };
  if (typeof input.order === "number") patch.order = input.order;
  await col.updateOne({ _id }, { $set: patch });
  return await col.findOne({ _id });
}

export async function deleteLab(id: string) {
  const db = await getDb();
  const col = db.collection<Lab>(LABS);
  if (!ObjectId.isValid(id)) return false;
  const res = await col.deleteOne({ _id: new ObjectId(id) });
  return res.deletedCount === 1;
}

// Gallery

const defaultGalleryItems: Array<Omit<GalleryItem, "_id" | "createdAt" | "updatedAt">> = [
  { title: "School Campus", src: "/gallery/main-building.jpeg", order: 1 },
  { title: "School Banner", src: "/gallery/banner.jpeg", order: 2 },
  { title: "Playground", src: "/gallery/playground.jpeg", order: 3 },
  { title: "Basketball Court", src: "/gallery/basketball.jpeg", order: 4 },
  { title: "Language Lab", src: "/gallery/language-lab.jpeg", order: 5 },
  { title: "Computer Lab", src: "/gallery/computer-lab.jpeg", order: 6 },
  { title: "Maths Lab", src: "/gallery/maths-lab.jpeg", order: 7 },
  { title: "Physics Lab", src: "/gallery/physics-lab.jpeg", order: 8 },
  { title: "Chemistry Lab", src: "/gallery/chemistry-lab.jpeg", order: 9 },
  { title: "Biology Lab", src: "/gallery/bio-lab.jpeg", order: 10 },
  { title: "Sports Lab", src: "/gallery/sports-lab.jpeg", order: 11 },
  { title: "Library", src: "/gallery/library.jpeg", order: 12 },
  { title: "Admissions 2026–27", src: "/gallery/admission.jpeg", order: 13 },
];

export async function listGalleryItems() {
  const db = await getDb();
  const col = db.collection<GalleryItem>(GALLERY_ITEMS);
  const count = await col.countDocuments();
  if (count === 0) {
    const now = new Date();
    await col.insertMany(
      defaultGalleryItems.map((g) => ({
        ...g,
        createdAt: now,
        updatedAt: now,
      })) as unknown as GalleryItem[],
    );
  }
  return await col
    .find({})
    .sort({ order: 1, createdAt: 1 })
    .toArray();
}

export async function createGalleryItem(input: GalleryItemInput) {
  const db = await getDb();
  const col = db.collection<GalleryItem>(GALLERY_ITEMS);
  const now = new Date();
  const order = typeof input.order === "number" ? input.order : (await col.countDocuments()) + 1;
  const doc = {
    title: input.title.trim(),
    src: input.src.trim(),
    order,
    createdAt: now,
    updatedAt: now,
  };
  const res = await col.insertOne(doc as unknown as GalleryItem);
  return await col.findOne({ _id: res.insertedId });
}

export async function updateGalleryItem(id: string, input: GalleryItemInput) {
  const db = await getDb();
  const col = db.collection<GalleryItem>(GALLERY_ITEMS);
  if (!ObjectId.isValid(id)) return null;
  const _id = new ObjectId(id);
  const patch: Partial<GalleryItem> = {
    title: input.title.trim(),
    src: input.src.trim(),
    updatedAt: new Date(),
  };
  if (typeof input.order === "number") patch.order = input.order;
  await col.updateOne({ _id }, { $set: patch });
  return await col.findOne({ _id });
}

export async function deleteGalleryItem(id: string) {
  const db = await getDb();
  const col = db.collection<GalleryItem>(GALLERY_ITEMS);
  if (!ObjectId.isValid(id)) return false;
  const res = await col.deleteOne({ _id: new ObjectId(id) });
  return res.deletedCount === 1;
}

// Teachers

export async function listTeachers() {
  const db = await getDb();
  const col = db.collection<TeacherDoc>(TEACHERS);
  const count = await col.countDocuments();
  if (count === 0 && teacherSeed.length > 0) {
    const now = new Date();
    await col.insertMany(
      teacherSeed.map((t, index) => ({
        name: t.name,
        designation: t.designation,
        qualification: t.qualification,
        order: index + 1,
        createdAt: now,
        updatedAt: now,
      })) as unknown as TeacherDoc[],
    );
  }
  return await col
    .find({})
    .sort({ order: 1, createdAt: 1 })
    .toArray();
}

export async function createTeacher(input: TeacherInput) {
  const db = await getDb();
  const col = db.collection<TeacherDoc>(TEACHERS);
  const now = new Date();
  const order = typeof input.order === "number" ? input.order : (await col.countDocuments()) + 1;
  const doc = {
    name: input.name.trim(),
    designation: input.designation?.trim() || undefined,
    qualification: input.qualification?.trim() || undefined,
    photo: input.photo?.trim() || undefined,
    order,
    createdAt: now,
    updatedAt: now,
  };
  const res = await col.insertOne(doc as unknown as TeacherDoc);
  return await col.findOne({ _id: res.insertedId });
}

export async function updateTeacher(id: string, input: TeacherInput) {
  const db = await getDb();
  const col = db.collection<TeacherDoc>(TEACHERS);
  if (!ObjectId.isValid(id)) return null;
  const _id = new ObjectId(id);
  const patch: Partial<TeacherDoc> = {
    name: input.name.trim(),
    designation: input.designation?.trim() || undefined,
    qualification: input.qualification?.trim() || undefined,
    photo: input.photo?.trim() || undefined,
    updatedAt: new Date(),
  };
  if (typeof input.order === "number") patch.order = input.order;
  await col.updateOne({ _id }, { $set: patch });
  return await col.findOne({ _id });
}

export async function deleteTeacher(id: string) {
  const db = await getDb();
  const col = db.collection<TeacherDoc>(TEACHERS);
  if (!ObjectId.isValid(id)) return false;
  const res = await col.deleteOne({ _id: new ObjectId(id) });
  return res.deletedCount === 1;
}

// PTA

export async function listPtaMembers() {
  const db = await getDb();
  const col = db.collection<PtaMemberDoc>(PTA);
  const count = await col.countDocuments();
  if (count === 0 && ptaSeed.length > 0) {
    const now = new Date();
    await col.insertMany(
      ptaSeed.map((m, index) => ({
        name: m.name,
        role: m.role,
        address: m.address,
        order: index + 1,
        createdAt: now,
        updatedAt: now,
      })) as unknown as PtaMemberDoc[],
    );
  }
  return await col
    .find({})
    .sort({ order: 1, createdAt: 1 })
    .toArray();
}

export async function createPtaMember(input: PtaMemberInput) {
  const db = await getDb();
  const col = db.collection<PtaMemberDoc>(PTA);
  const now = new Date();
  const order = typeof input.order === "number" ? input.order : (await col.countDocuments()) + 1;
  const doc = {
    name: input.name.trim(),
    role: input.role.trim(),
    address: input.address.trim(),
    photo: input.photo?.trim() || undefined,
    order,
    createdAt: now,
    updatedAt: now,
  };
  const res = await col.insertOne(doc as unknown as PtaMemberDoc);
  return await col.findOne({ _id: res.insertedId });
}

export async function updatePtaMember(id: string, input: PtaMemberInput) {
  const db = await getDb();
  const col = db.collection<PtaMemberDoc>(PTA);
  if (!ObjectId.isValid(id)) return null;
  const _id = new ObjectId(id);
  const patch: Partial<PtaMemberDoc> = {
    name: input.name.trim(),
    role: input.role.trim(),
    address: input.address.trim(),
    photo: input.photo?.trim() || undefined,
    updatedAt: new Date(),
  };
  if (typeof input.order === "number") patch.order = input.order;
  await col.updateOne({ _id }, { $set: patch });
  return await col.findOne({ _id });
}

export async function deletePtaMember(id: string) {
  const db = await getDb();
  const col = db.collection<PtaMemberDoc>(PTA);
  if (!ObjectId.isValid(id)) return false;
  const res = await col.deleteOne({ _id: new ObjectId(id) });
  return res.deletedCount === 1;
}

// SMC

export async function listSmcMembers() {
  const db = await getDb();
  const col = db.collection<SmcMemberDoc>(SMC);
  const count = await col.countDocuments();
  if (count === 0 && smcSeed.length > 0) {
    const now = new Date();
    await col.insertMany(
      smcSeed.map((m, index) => ({
        name: m.name,
        fatherOrSpouseName: m.fatherOrSpouseName,
        designation: m.designation,
        occupationWithAddress: m.occupationWithAddress,
        residentialAddress: m.residentialAddress,
        order: index + 1,
        createdAt: now,
        updatedAt: now,
      })) as unknown as SmcMemberDoc[],
    );
  }
  return await col
    .find({})
    .sort({ order: 1, createdAt: 1 })
    .toArray();
}

export async function createSmcMember(input: SmcMemberInput) {
  const db = await getDb();
  const col = db.collection<SmcMemberDoc>(SMC);
  const now = new Date();
  const order = typeof input.order === "number" ? input.order : (await col.countDocuments()) + 1;
  const doc = {
    name: input.name.trim(),
    fatherOrSpouseName: input.fatherOrSpouseName.trim(),
    designation: input.designation.trim(),
    occupationWithAddress: input.occupationWithAddress.trim(),
    residentialAddress: input.residentialAddress.trim(),
    photo: input.photo?.trim() || undefined,
    order,
    createdAt: now,
    updatedAt: now,
  };
  const res = await col.insertOne(doc as unknown as SmcMemberDoc);
  return await col.findOne({ _id: res.insertedId });
}

export async function updateSmcMember(id: string, input: SmcMemberInput) {
  const db = await getDb();
  const col = db.collection<SmcMemberDoc>(SMC);
  if (!ObjectId.isValid(id)) return null;
  const _id = new ObjectId(id);
  const patch: Partial<SmcMemberDoc> = {
    name: input.name.trim(),
    fatherOrSpouseName: input.fatherOrSpouseName.trim(),
    designation: input.designation.trim(),
    occupationWithAddress: input.occupationWithAddress.trim(),
    residentialAddress: input.residentialAddress.trim(),
    photo: input.photo?.trim() || undefined,
    updatedAt: new Date(),
  };
  if (typeof input.order === "number") patch.order = input.order;
  await col.updateOne({ _id }, { $set: patch });
  return await col.findOne({ _id });
}

export async function deleteSmcMember(id: string) {
  const db = await getDb();
  const col = db.collection<SmcMemberDoc>(SMC);
  if (!ObjectId.isValid(id)) return false;
  const res = await col.deleteOne({ _id: new ObjectId(id) });
  return res.deletedCount === 1;
}



