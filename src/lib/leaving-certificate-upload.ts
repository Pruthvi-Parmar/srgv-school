import { del, put } from "@vercel/blob";
import { mkdir, unlink, writeFile } from "fs/promises";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "public", "leaving-certificates");
const MAX_BYTES = 15 * 1024 * 1024;

function sanitizePdfFilename(name: string): string {
  const base = name.replace(/\.pdf$/i, "").replace(/[^\w.\-() ]+/g, "-").replace(/\s+/g, "-").slice(0, 80);
  return `${base || "certificate"}.pdf`;
}

function validatePdfFile(file: File) {
  if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
    throw new Error("Only PDF files are allowed");
  }
  if (file.size > MAX_BYTES) {
    throw new Error("File must be 15 MB or smaller");
  }
}

function useBlobStorage() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

async function saveLeavingCertificatePdfToBlob(file: File): Promise<string> {
  const unique = `leaving-certificates/${Date.now()}-${sanitizePdfFilename(file.name)}`;
  const blob = await put(unique, file, {
    access: "public",
    addRandomSuffix: false,
    contentType: "application/pdf",
  });
  return blob.url;
}

async function saveLeavingCertificatePdfToDisk(file: File): Promise<string> {
  await mkdir(UPLOAD_DIR, { recursive: true });
  const unique = `${Date.now()}-${sanitizePdfFilename(file.name)}`;
  const diskPath = path.join(UPLOAD_DIR, unique);
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(diskPath, buffer);
  return `/leaving-certificates/${unique}`;
}

/** Saves PDF and returns a public URL or site path for `pdfPath` in the database. */
export async function saveLeavingCertificatePdf(file: File): Promise<string> {
  validatePdfFile(file);

  if (useBlobStorage()) {
    return saveLeavingCertificatePdfToBlob(file);
  }

  if (process.env.VERCEL) {
    throw new Error(
      "Leaving certificate uploads are not configured for production. In Vercel, open Storage → create a Blob store → connect it to this project (sets BLOB_READ_WRITE_TOKEN), then redeploy.",
    );
  }

  return saveLeavingCertificatePdfToDisk(file);
}

async function deleteLeavingCertificatePdfFromBlob(pdfPath: string) {
  try {
    await del(pdfPath);
  } catch {
    // Blob may already be deleted
  }
}

async function deleteLeavingCertificatePdfFromDisk(pdfPath: string) {
  if (!pdfPath.startsWith("/leaving-certificates/")) return;
  const filename = decodeURIComponent(pdfPath.replace("/leaving-certificates/", ""));
  const diskPath = path.join(process.cwd(), "public", "leaving-certificates", filename);
  try {
    await unlink(diskPath);
  } catch {
    // File may already be missing
  }
}

export async function deleteLeavingCertificatePdf(pdfPath: string) {
  if (pdfPath.startsWith("http://") || pdfPath.startsWith("https://")) {
    await deleteLeavingCertificatePdfFromBlob(pdfPath);
    return;
  }
  await deleteLeavingCertificatePdfFromDisk(pdfPath);
}
