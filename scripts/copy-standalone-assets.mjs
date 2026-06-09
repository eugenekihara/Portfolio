import { cpSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";

const copies = [
  [".next/static", ".next/standalone/.next/static"],
  ["public", ".next/standalone/public"],
  ["db", ".next/standalone/db"],
  ["prisma", ".next/standalone/prisma"],
];

for (const [source, destination] of copies) {
  if (!existsSync(source)) {
    console.log(`Skipping ${source} (not found)`);
    continue;
  }

  mkdirSync(dirname(destination), { recursive: true });
  cpSync(source, destination, { recursive: true, force: true });
  console.log(`Copied ${source} -> ${destination}`);
}

console.log("Standalone assets copied.");
