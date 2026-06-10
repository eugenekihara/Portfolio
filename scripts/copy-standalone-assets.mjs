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
// Prisma CLI creates the DB at prisma/db/custom.db (relative to schema directory)
const standaloneDbDir = join(projectRoot, ".next/standalone/prisma/db");
mkdirSync(standaloneDbDir, { recursive: true });

const dbSource = join(projectRoot, "prisma/db/custom.db");
if (existsSync(dbSource)) {
  cpSync(dbSource, join(standaloneDbDir, "custom.db"), { force: true });
  console.log("Copied prisma/db/custom.db -> .next/standalone/prisma/db/custom.db");
} else {
  console.warn("WARNING: prisma/db/custom.db not found - database will be created on first run");
  console.warn("Run 'npx prisma db push' to create the database before starting the server.");
}

// Create/update .env in standalone build with relative path
const standaloneEnv = join(projectRoot, ".next/standalone/.env");
writeFileSync(standaloneEnv, "DATABASE_URL=file:./db/custom.db\nNEXTAUTH_SECRET=e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6\n");
console.log("Created .next/standalone/.env");

console.log("Standalone assets copied.");
