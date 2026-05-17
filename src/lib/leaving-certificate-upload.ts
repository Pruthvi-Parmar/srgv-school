import { mkdir, writeFile } from "fs/promises";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "public", "leaving-certificates");

function sanitizePdfFilename(name: string): string {
  const base = name.replace(/\.pdf$/i, "").replace(/[^\w.\-() ]+/g, "-").replace(/\s+/g, "-").slice(0, 80);
  return `${base || "certificate"}.pdf`;
}

export async function saveLeavingCertificatePdf(file: File): Promise<string> {
  if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
    throw new Error("Only PDF files are allowed");
  }
  const maxBytes = 15 * 1024 * 1024;
  if (file.size > maxBytes) {
    throw new Error("File must be 15 MB or smaller");
  }

  await mkdir(UPLOAD_DIR, { recursive: true });
  const unique = `${Date.now()}-${sanitizePdfFilename(file.name)}`;
  const diskPath = path.join(UPLOAD_DIR, unique);
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(diskPath, buffer);
  return `/leaving-certificates/${unique}`;
}
