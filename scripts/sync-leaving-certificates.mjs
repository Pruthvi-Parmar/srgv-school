#!/usr/bin/env node
/**
 * Imports every PDF in `public/leaving-certificates/` into the
 * `leaving_certificates` MongoDB collection.
 *
 * Filename rules:
 *   - 10th: starts with "10" or "10th" (any case)         → Grade 10
 *   - 12th: contains "12th" / "12thcomm" / "12 th"        → Grade 12
 *   - Otherwise the file is skipped with a warning.
 *
 * Re-running is safe: existing records (matched by `pdfPath`) are left alone.
 *
 * Usage:
 *   node scripts/sync-leaving-certificates.mjs
 */

import { readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { config as loadEnv } from "dotenv";
import { MongoClient } from "mongodb";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const FOLDER = path.join(ROOT, "public", "leaving-certificates");

loadEnv({ path: path.join(ROOT, ".env.local") });
loadEnv({ path: path.join(ROOT, ".env") });

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB || undefined;
if (!MONGODB_URI) {
  console.error("Missing MONGODB_URI (set it in .env.local).");
  process.exit(1);
}

function titleCase(str) {
  return str
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

/** Returns { standard, name } or null if the filename can't be classified. */
function parseFilename(filename) {
  const noExt = filename.replace(/\.pdf$/i, "");
  // Strip a leading "<timestamp>-" prefix that the upload route adds
  const stripped = noExt.replace(/^\d{10,}-/, "").replace(/-/g, " ").trim();

  // Check for 10th: starts with 10 (e.g. "10th Avi M Panchal")
  const tenStart = stripped.match(/^10\s*(?:th)?[.\s:]*(.+?)[.\s]*$/i);
  if (tenStart) {
    const rest = tenStart[1].replace(/\s+/g, " ").trim();
    if (rest.length > 0) {
      return { standard: "Grade 10", name: titleCase(rest) };
    }
  }

  // Check for 12th: contains 12th (e.g. "Yashi R Mistry 12th comm.")
  const twelveAnywhere = stripped.match(
    /^(.+?)\s*(?:[-:]\s*)?12\s*(?:th)?[.\s]*(?:comm|commerce|sci|science|arts)?[.\s]*$/i,
  );
  if (twelveAnywhere) {
    const namePart = twelveAnywhere[1].replace(/\s+/g, " ").trim();
    if (namePart.length > 0) {
      return { standard: "Grade 12", name: titleCase(namePart) };
    }
  }

  return null;
}

function pdfPathFor(filename) {
  return `/leaving-certificates/${encodeURIComponent(filename)}`;
}

async function main() {
  let entries;
  try {
    entries = await readdir(FOLDER);
  } catch (err) {
    console.error(`Cannot read ${FOLDER}:`, err.message);
    process.exit(1);
  }

  const pdfs = entries.filter((f) => f.toLowerCase().endsWith(".pdf"));
  console.log(`Found ${pdfs.length} PDFs in public/leaving-certificates/`);

  const client = new MongoClient(MONGODB_URI, { maxPoolSize: 5 });
  await client.connect();

  try {
    const db = client.db(MONGODB_DB);
    const col = db.collection("leaving_certificates");

    const existing = await col.find({}, { projection: { pdfPath: 1, title: 1, standard: 1 } }).toArray();
    const existingPaths = new Set(existing.map((r) => r.pdfPath));

    let inserted = 0;
    let skippedExisting = 0;
    let skippedUnparsed = 0;
    const startOrder = (await col.countDocuments()) + 1;
    let nextOrder = startOrder;
    const now = new Date();

    for (const filename of pdfs.sort()) {
      const pdfPath = pdfPathFor(filename);

      if (existingPaths.has(pdfPath)) {
        skippedExisting += 1;
        continue;
      }

      const parsed = parseFilename(filename);
      if (!parsed) {
        skippedUnparsed += 1;
        console.warn(`  ⚠  skip (cannot determine class): ${filename}`);
        continue;
      }

      const doc = {
        title: parsed.name,
        standard: parsed.standard,
        pdfPath,
        order: nextOrder++,
        createdAt: now,
        updatedAt: now,
      };
      await col.insertOne(doc);
      inserted += 1;
      console.log(`  +  ${parsed.standard.padEnd(8)}  ${parsed.name}`);
    }

    console.log("\nSummary:");
    console.log(`  inserted        : ${inserted}`);
    console.log(`  already in DB   : ${skippedExisting}`);
    console.log(`  could not parse : ${skippedUnparsed}`);
    console.log(`  total in folder : ${pdfs.length}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
