import { cpSync, existsSync, mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { dirname, resolve, join } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");

const copies = [
  [".next/static", ".next/standalone/.next/static"],
  ["public", ".next/standalone/public"],
  ["prisma", ".next/standalone/prisma"],
];

for (const [source, destination] of copies) {
  const src = join(projectRoot, source);
  const dst = join(projectRoot, destination);
  if (!existsSync(src)) {
    console.log(`Skipping ${source} (not found)`);
    continue;
  }

  mkdirSync(dirname(dst), { recursive: true });
  cpSync(src, dst, { recursive: true, force: true });
  console.log(`Copied ${source} -> ${destination}`);
}

// Copy the database file to standalone build
const standaloneDbDir = join(projectRoot, ".next/standalone/db");
mkdirSync(standaloneDbDir, { recursive: true });

const dbSource = join(projectRoot, "db/custom.db");
if (existsSync(dbSource)) {
  cpSync(dbSource, join(standaloneDbDir, "custom.db"), { force: true });
  console.log("Copied db/custom.db -> .next/standalone/db/custom.db");
} else {
  console.warn("WARNING: db/custom.db not found");
  console.warn("Run 'npm run build' again to create it.");
}

// Create/update .env in standalone build with relative path
const standaloneEnv = join(projectRoot, ".next/standalone/.env");
writeFileSync(standaloneEnv, "DATABASE_URL=file:./db/custom.db\nNEXTAUTH_SECRET=e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6\n");
console.log("Created .next/standalone/.env");

console.log("Standalone assets copied.");
