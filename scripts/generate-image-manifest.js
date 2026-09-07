// Generate the image manifest for the Axiom website.
//
// Usage (run from the project root):
//   node scripts/generate-image-manifest.js
//
// What it does:
//   1. Reads every subdirectory inside public/data/events/
//   2. For each subdirectory, collects all image files (.jpg, .jpeg, .JPG, .png, .webp, .avif)
//      and sorts them in natural / numeric order.
//   3. Writes data/images-manifest.json, preserving the top-level schema:
//        { "events": { "<folder>": ["file1.ext", ...], ... }, "portraits": [...] }
//      The "portraits" key is left untouched (read from the existing manifest first).

import { readdirSync, writeFileSync, readFileSync } from "fs";
import { join, resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const EVENTS_DIR = join(ROOT, "public", "data", "events");
const MANIFEST_OUT = join(ROOT, "data", "images-manifest.json");

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".JPG", ".png", ".webp", ".avif"]);

// Natural sort comparator so "2" < "10" (not lexicographic).
function naturalSort(a, b) {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
}

// 1. Read existing manifest to preserve the "portraits" key.
let existing = {};
try {
  existing = JSON.parse(readFileSync(MANIFEST_OUT, "utf8"));
} catch {
  // No existing manifest -- start fresh.
}

// 2. Scan event folders.
const folders = readdirSync(EVENTS_DIR, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort(naturalSort);

const events = {};
for (const folder of folders) {
  const files = readdirSync(join(EVENTS_DIR, folder), { withFileTypes: true })
    .filter((f) => f.isFile() && IMAGE_EXTENSIONS.has(f.name.slice(f.name.lastIndexOf("."))))
    .map((f) => f.name)
    .sort(naturalSort);

  events[folder] = files;
}

// 3. Build and write manifest.
const manifest = {
  events,
  // Keep existing portraits list (or empty array if none existed).
  portraits: existing.portraits ?? [],
};

writeFileSync(MANIFEST_OUT, JSON.stringify(manifest, null, 2) + "\n", "utf8");
console.log("Manifest written to " + MANIFEST_OUT);
console.log(folders.length + " event folder(s) processed:");
for (const [folder, files] of Object.entries(events)) {
  console.log("  " + folder + ": " + files.length + " image(s)");
}