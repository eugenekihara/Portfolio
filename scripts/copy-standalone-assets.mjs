import { cpSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const copies = [
  [".next/static", ".next/standalone/.next/static"],
  ["public", ".next/standalone/public"],
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

// Ensure db/ directory exists in standalone build with the SQLite database
const standaloneDbDir = ".next/standalone/db";
mkdirSync(standaloneDbDir, { recursive: true });

if (existsSync("db/custom.db")) {
  cpSync("db/custom.db", `${standaloneDbDir}/custom.db`, { force: true });
  console.log("Copied db/custom.db -> .next/standalone/db/custom.db");
} else {
  console.log("WARNING: db/custom.db not found - database will be created on first run");
  console.log("Run 'npx prisma db push' to create the database before starting the server.");
}

// Ensure .env exists in standalone build
const standaloneEnv = ".next/standalone/.env";
if (!existsSync(standaloneEnv)) {
  writeFileSync(standaloneEnv, "DATABASE_URL=file:./db/custom.db\nNEXTAUTH_SECRET=e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6\n");
  console.log("Created .next/standalone/.env with default values");
} else {
  // Update DATABASE_URL to use relative path if it has an absolute path
  const { readFileSync } = await import("node:fs");
  let envContent = readFileSync(standaloneEnv, "utf-8");
  if (envContent.includes("file:/home/") || envContent.includes("file:C:") || envContent.includes("file:file:")) {
    envContent = envContent.replace(/DATABASE_URL=.*/g, "DATABASE_URL=file:./db/custom.db");
    writeFileSync(standaloneEnv, envContent);
    console.log("Updated DATABASE_URL in .next/standalone/.env to use relative path");
  }
}

console.log("Standalone assets copied.");
