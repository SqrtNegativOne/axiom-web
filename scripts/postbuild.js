// Cross-platform postbuild: copies newsletter/dist → dist/newsletter
// (dist/ is at the repo root, output by Vite via build.outDir: '../dist')
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const src = path.join(root, "newsletter", "dist");
const dst = path.join(root, "dist", "newsletter");

function copyDir(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const srcPath = path.join(from, entry.name);
    const dstPath = path.join(to, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, dstPath);
    } else {
      fs.copyFileSync(srcPath, dstPath);
    }
  }
}

copyDir(src, dst);
console.log(`✓ Copied newsletter/dist → dist/newsletter`);

// Symlink /data folder to dist/data for serving images (no copy needed)
const dataSrc = path.join(root, "data");
const dataDst = path.join(root, "dist", "data");

if (fs.existsSync(dataSrc)) {
  // Remove existing symlink or directory if it exists
  if (fs.existsSync(dataDst)) {
    fs.rmSync(dataDst, { recursive: true, force: true });
  }
  
  try {
    // Try to create symlink (requires admin on Windows, works on Unix)
    fs.symlinkSync(dataSrc, dataDst, 'junction');
    console.log(`✓ Symlinked data → dist/data`);
  } catch (err) {
    // Fallback to copying if symlink fails
    console.log(`⚠ Symlink failed, copying instead...`);
    copyDir(dataSrc, dataDst);
    console.log(`✓ Copied data → dist/data`);
  }
} else {
  console.log(`⚠ Warning: /data folder not found, skipping`);
}
